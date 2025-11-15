
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  X,
  Search,
  ArrowLeft,
  Filter,
  Calendar,
  User
} from "lucide-react";
import { blogPostSchema, type BlogPostFormData } from "@/lib/blog-schema";
import { supabase } from "@/lib/supabase";
import { isAdminAuthenticated } from "@/lib/auth";
import BlogPostEditor from "@/components/BlogPostEditor";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  tags: string[];
  categories: string[];
  published: boolean;
  publishedAt?: string;
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

type ViewMode = 'list' | 'create' | 'edit';

export default function AdminBlogManagement() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      published: false,
    },
  });

  const watchedContent = watch("content");

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.replace("/admin/login");
      return;
    }

    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'published' && blog.published) ||
                         (filterStatus === 'draft' && !blog.published);

    return matchesSearch && matchesFilter;
  });

  const handleCreateNew = () => {
    setViewMode('create');
    reset({
      published: false,
      tags: []
    });
    setEditingBlog(null);
  };

  const handleEdit = (blog: BlogPost) => {
    setViewMode('edit');
    setEditingBlog(blog);
  };

  const handleCancel = () => {
    setViewMode('list');
    setEditingBlog(null);
    reset();
  };

  const onSubmit = async (data: BlogPostFormData) => {
    console.log('onSubmit called with data:', data);
    setIsSubmitting(true);
    try {
      // Create slug from title
      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      if (viewMode === 'create') {
        const { error } = await supabase
          .from('blog_posts')
          .insert({
            title: data.title,
            content: data.content,
            excerpt: data.excerpt,
            author: data.author,
            tags: data.tags || [],
            categories: data.categories || [],
            published: data.published,
            publishedAt: data.publishedAt,
            featuredImage: data.featuredImage,
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription,
            keywords: data.keywords,
            slug: slug,
          });

        if (error) throw error;
        alert("Blog post created successfully!");
      } else if (viewMode === 'edit' && editingBlog) {
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title: data.title,
            content: data.content,
            excerpt: data.excerpt,
            author: data.author,
            tags: data.tags || [],
            categories: data.categories || [],
            published: data.published,
            publishedAt: data.publishedAt,
            featuredImage: data.featuredImage,
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription,
            keywords: data.keywords,
            slug: slug, // Update slug in case title changed
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingBlog.id);

        if (error) throw error;
        alert("Blog post updated successfully!");
      }

      setViewMode('list');
      setEditingBlog(null);
      reset();
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert("Error saving blog post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', blogId);

      if (error) throw error;

      alert('Blog post deleted successfully!');
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('Error deleting blog post. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog management...</p>
        </div>
      </div>
    );
  }

  if (viewMode === 'create' || viewMode === 'edit') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BlogPostEditor
            initialData={editingBlog ? {
              title: editingBlog.title,
              content: editingBlog.content,
              excerpt: editingBlog.excerpt,
              author: editingBlog.author,
              tags: (editingBlog.tags && editingBlog.tags.length > 0) ? editingBlog.tags : ['blog'],
              categories: (editingBlog.categories && editingBlog.categories.length > 0) ? editingBlog.categories : ['General'],
              published: editingBlog.published,
              publishedAt: editingBlog.publishedAt,
              featuredImage: editingBlog.featuredImage,
              metaTitle: editingBlog.metaTitle,
              metaDescription: editingBlog.metaDescription,
              keywords: editingBlog.keywords,
            } : undefined}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            mode={viewMode}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Management</h1>
            <p className="text-gray-600">Create, edit, and manage your blog posts</p>
          </div>
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Post
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title, author, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published' | 'draft')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Posts</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Blog Posts Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Blog Posts ({filteredBlogs.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Post
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBlogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No blog posts found. Create your first post to get started.
                    </td>
                  </tr>
                ) : (
                  filteredBlogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900 truncate max-w-xs">
                            {blog.title}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {blog.excerpt.substring(0, 100)}...
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {blog.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                            {blog.tags.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{blog.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          blog.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {blog.author}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(blog.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                        <Link
                          href={`/blog/${blog.slug}`}
                          className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Link>
                        <button
                          onClick={() => handleEdit(blog)}
                          className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

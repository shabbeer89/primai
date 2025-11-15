"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, type BlogPost } from "@/lib/supabase";
import { ArrowLeft, Calendar, User, Tag, Edit, Share2 } from "lucide-react";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.slug) {
      fetchPost(params.slug as string);
    }
  }, [params.slug]);

  const fetchPost = async (slug: string) => {

    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        setError('Supabase is not configured. Please set up your environment variables first.');
        return;
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Blog post not found');
        } else {
          throw error;
        }
      } else {
        setPost(data);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sharePost = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error || 'Blog post not found'}
            </h1>
            <p className="text-gray-600 mb-6">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If post is not published, show draft notice
  if (!post.published) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <h1 className="text-xl font-semibold text-yellow-800 mb-2">Draft Post</h1>
            <p className="text-yellow-700 mb-4">
              This blog post is currently in draft mode and not publicly available.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Published
            </span>
            <div className="flex items-center space-x-4">
              <Link
                href={`/admin/blog`}
                className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Link>
              <button
                onClick={sharePost}
                className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </button>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-200 pb-6">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>By {post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <time dateTime={post.created_at}>
                {formatDate(post.created_at)}
              </time>
            </div>
            {post.updated_at !== post.created_at && (
              <div className="text-xs">
                Updated {formatDate(post.updated_at)}
              </div>
            )}
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="prose prose-gray max-w-none">
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-lg">
              {post.content}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-gray-500">
              Published on {formatDate(post.created_at)}
            </div>
            <div className="flex gap-4">
              <Link
                href="/blog"
                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
              >
                ← All Posts
              </Link>
              <button
                onClick={sharePost}
                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
              >
                Share Post →
              </button>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, formatDistanceToNow } from 'date-fns';
import {
  Save,
  Eye,
  EyeOff,
  Clock,
  Calendar,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

import { blogPostSchema, type BlogPostFormData } from '@/lib/blog-schema';
import RichTextEditor from './RichTextEditor';
import ImageUploader from './ImageUploader';
import CategorySelector from './CategorySelector';
import TagSelector from './TagSelector';
import SEOMetaFields from './SEOMetaFields';

interface BlogPostEditorProps {
  initialData?: Partial<BlogPostFormData>;
  onSubmit: (data: BlogPostFormData) => void | Promise<void>;
  isSubmitting?: boolean;
  mode: 'create' | 'edit';
}

interface StatisticsData {
  wordCount: number;
  readingTime: number;
  charCount: number;
}

export default function BlogPostEditor({
  initialData,
  onSubmit,
  isSubmitting = false,
  mode
}: BlogPostEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [seoExpanded, setSeoExpanded] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [statistics, setStatistics] = useState<StatisticsData>({ wordCount: 0, readingTime: 0, charCount: 0 });
  const [publishedDate, setPublishedDate] = useState<string>(
    initialData?.publishedAt || format(new Date(), "yyyy-MM-dd'T'HH:mm")
  );
  const [isScheduling, setIsScheduling] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isDirty },
  } = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: initialData?.title || '',
      content: initialData?.content || '',
      excerpt: initialData?.excerpt || '',
      author: initialData?.author || '',
      tags: initialData?.tags || [],
      categories: initialData?.categories || [],
      published: initialData?.published !== undefined ? initialData?.published : false,
      publishedAt: initialData?.publishedAt || undefined,
      featuredImage: initialData?.featuredImage || '',
      metaTitle: initialData?.metaTitle || '',
      metaDescription: initialData?.metaDescription || '',
      keywords: initialData?.keywords || '',
    },
  });

  // Watch content for statistics and auto-save
  useEffect(() => {
    const watchedContent = watch('content');
    if (watchedContent) {
      updateStatistics(watchedContent);
    }
  }, [watch('content')]);

  const updateStatistics = useCallback((content: string) => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    const chars = content.length;
    const readingTimeMinutes = Math.ceil(words.length / 200); // Average reading speed

    setStatistics({
      wordCount: words.length,
      readingTime: readingTimeMinutes,
      charCount: chars,
    });
  }, []);

  const watchedTitle = watch('title') || '';
  const watchedContent = watch('content') || '';
  const watchedExcerpt = watch('excerpt') || '';
  const watchedAuthor = watch('author') || '';
  const watchedCategories = watch('categories') || [];
  const watchedTags = watch('tags') || [];
  const watchedPublished = watch('published') || false;
  const watchedFeaturedImage = watch('featuredImage') || '';

  // Auto-save functionality
  useEffect(() => {
    if (isDirty && !isSubmitting) {
      const autoSaveTimer = setTimeout(() => {
        // In a real implementation, you'd save to draft storage
        setLastSaved(new Date());
      }, 3000); // Auto-save after 3 seconds of inactivity

      return () => clearTimeout(autoSaveTimer);
    }
  }, [isDirty, watchedTitle, watchedContent, watchedExcerpt, watchedAuthor, isSubmitting]);

  const renderContent = (content: string) => {
    // Basic markdown-like rendering for preview
    return content
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  };



  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Create Blog Post' : 'Edit Blog Post'}
          </h1>
          <p className="text-gray-600 mt-1">
            {mode === 'create' ? 'Write and publish your blog post' : 'Make changes to your blog post'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {lastSaved && (
            <span className="text-sm text-green-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Auto-saved {formatDistanceToNow(lastSaved)} ago
            </span>
          )}
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPreview ? 'Hide' : 'Preview'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit((data) => { console.log('Form submitted with data:', data); console.log('Form is valid and submitting'); onSubmit(data); }, (errors) => { console.log('Form validation failed with errors:', errors); })} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Title *
              </label>
              <input
                {...register('title')}
                type="text"
                className="w-full text-2xl font-semibold px-0 py-2 border-none focus:ring-0 focus:outline-none bg-transparent placeholder:text-gray-400"
                placeholder="Enter your compelling title here..."
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Featured Image */}
            <ImageUploader
              value={watchedFeaturedImage}
              onChange={(url) => setValue('featuredImage', url)}
              label="Featured Image"
              placeholder="Upload an eye-catching featured image"
            />

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Excerpt *
              </label>
              <textarea
                {...register('excerpt')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                placeholder="Write a compelling summary that will appear in listings and social shares..."
              />
              {errors.excerpt && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.excerpt.message}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {(watch('excerpt') || '').length}/300 characters
              </p>
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Content *
                </label>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {statistics.wordCount} words
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {statistics.readingTime} min read
                  </span>
                  <span>{statistics.charCount} chars</span>
                </div>
              </div>
              <RichTextEditor
                value={watchedContent}
                onChange={(value) => setValue('content', value)}
              />
              {errors.content && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.content.message}
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <CategorySelector
                value={watchedCategories}
                onChange={(categories) => setValue('categories', categories)}
                maxCategories={5}
              />
              {errors.categories && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.categories.message}
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <TagSelector
                value={watchedTags}
                onChange={(tags) => setValue('tags', tags)}
                maxTags={10}
                placeholder="Add relevant tags for this post"
              />
              {errors.tags && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.tags.message}
                </p>
              )}
            </div>

            {/* Author */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Author *
              </label>
              <input
                {...register('author')}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your name or pseudonym"
              />
              {errors.author && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.author.message}
                </p>
              )}
            </div>

            {/* Publishing Options */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
              <h3 className="text-sm font-semibold text-gray-700">Publishing Options</h3>

              {/* Published Status */}
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700">Publish immediately</label>
                <input
                  {...register('published')}
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>

              {/* Schedule Publishing */}
              {watchedPublished && (
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700 flex items-center gap-2 cursor-pointer">
                      <Calendar className="w-4 h-4" />
                      Schedule for later
                    </label>
                    <input
                      type="checkbox"
                      checked={isScheduling}
                      onChange={(e) => setIsScheduling(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </div>

                  {isScheduling && (
                    <div>
                      <input
                        type="datetime-local"
                        value={publishedDate}
                        onChange={(e) => {
                          setPublishedDate(e.target.value);
                          setValue('publishedAt', e.target.value || undefined);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* SEO Settings */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <button
                type="button"
                onClick={() => setSeoExpanded(!seoExpanded)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-semibold text-gray-700">SEO Settings</span>
                </div>
                {seoExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              {seoExpanded && (
                <div className="px-4 pb-4">
                  <SEOMetaFields
                    title={watchedTitle}
                    value={{
                      metaTitle: watch('metaTitle'),
                      metaDescription: watch('metaDescription'),
                      keywords: watch('keywords'),
                    }}
                    onChange={(seo) => {
                      setValue('metaTitle', seo.metaTitle || '');
                      setValue('metaDescription', seo.metaDescription || '');
                      setValue('keywords', seo.keywords || '');
                    }}
                    blogTitle={watchedTitle}
                    excerpt={watchedExcerpt}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-4">
              Preview
            </h2>

            {/* Article Preview */}
            <article className="prose prose-lg max-w-none">
              <header className="mb-8">
                {watchedFeaturedImage && (
                  <img
                    src={watchedFeaturedImage}
                    alt={watchedTitle}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                )}
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {watchedTitle || "Your Blog Post Title"}
                </h1>
                <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                  <span>By {watchedAuthor || "Author Name"}</span>
                  <span>•</span>
                  <span>{statistics.readingTime} min read</span>
                  <span>•</span>
                  <span>{statistics.wordCount} words</span>
                </div>
                {watchedExcerpt && (
                  <p className="text-xl text-gray-700 leading-relaxed italic">
                    {watchedExcerpt}
                  </p>
                )}
                {watchedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {watchedCategories.map((category) => (
                      <span
                        key={category}
                        className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              <div
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{
                  __html: renderContent(watchedContent) || "<p>Your content will appear here...</p>"
                }}
              />
            </article>
          </div>
        )}

        {/* Submit Actions */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-200">
          <div className="flex items-center gap-4">
            {lastSaved && (
              <span className="text-sm text-green-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Auto-saved {formatDistanceToNow(lastSaved)} ago
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
              onClick={() => window.history.back()}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => console.log('Update/Create button clicked')}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
            >
              <Save className="w-4 h-4" />
              {isSubmitting
                ? 'Saving...'
                : mode === 'create'
                ? 'Create Post'
                : 'Update Post'
              }
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

"use client";

import React from 'react';
import { BarChart3, FileText, Tag } from 'lucide-react';

interface SEOMetaFieldsProps {
  title: string;
  value: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
  };
  onChange: (seo: { metaTitle?: string; metaDescription?: string; keywords?: string }) => void;
  blogTitle: string;
  excerpt: string;
}

export default function SEOMetaFields({
  title,
  value,
  onChange,
  blogTitle,
  excerpt
}: SEOMetaFieldsProps) {
  const suggestedMetaTitle = blogTitle.length <= 60
    ? blogTitle
    : `${blogTitle.substring(0, 57)}...`;

  const suggestedMetaDescription = excerpt.length <= 160
    ? excerpt
    : `${excerpt.substring(0, 157)}...`;

  const updateSEO = (field: keyof typeof value, fieldValue: string) => {
    onChange({
      ...value,
      [field]: fieldValue,
    });
  };

  const metaTitleLength = value.metaTitle?.length || 0;
  const metaDescriptionLength = value.metaDescription?.length || 0;

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-medium text-gray-900">SEO Settings</h3>
      </div>

      {/* Meta Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Meta Title
        </label>
        <input
          type="text"
          value={value.metaTitle || ''}
          onChange={(e) => updateSEO('metaTitle', e.target.value)}
          placeholder={suggestedMetaTitle}
          maxLength={60}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <div className="flex justify-between items-center mt-1">
          <button
            type="button"
            onClick={() => updateSEO('metaTitle', suggestedMetaTitle)}
            className="text-xs text-indigo-600 hover:text-indigo-800"
          >
            Use suggested
          </button>
          <span className={`text-xs ${metaTitleLength > 60 ? 'text-red-600' : 'text-gray-500'}`}>
            {metaTitleLength}/60
          </span>
        </div>
      </div>

      {/* Meta Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Meta Description
        </label>
        <textarea
          value={value.metaDescription || ''}
          onChange={(e) => updateSEO('metaDescription', e.target.value)}
          placeholder={suggestedMetaDescription}
          maxLength={160}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
        />
        <div className="flex justify-between items-center mt-1">
          <button
            type="button"
            onClick={() => updateSEO('metaDescription', suggestedMetaDescription)}
            className="text-xs text-indigo-600 hover:text-indigo-800"
          >
            Use suggested
          </button>
          <span className={`text-xs ${metaDescriptionLength > 160 ? 'text-red-600' : 'text-gray-500'}`}>
            {metaDescriptionLength}/160
          </span>
        </div>
      </div>

      {/* Keywords */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Tag className="w-4 h-4" />
          Keywords (comma separated)
        </label>
        <input
          type="text"
          value={value.keywords || ''}
          onChange={(e) => updateSEO('keywords', e.target.value)}
          placeholder="keyword1, keyword2, keyword3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Separate keywords with commas. Max 10 keywords recommended.
        </p>
      </div>

      {/* Preview */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Search Preview</h4>
        <div className="bg-white border rounded-lg p-3 shadow-sm max-w-xl">
          <div className="text-blue-600 text-lg mb-1 hover:underline cursor-pointer">
            {(value.metaTitle || suggestedMetaTitle).replace(/https?:\/\//, '')}
          </div>
          <div className="text-green-700 text-sm mb-1">
            {process.env.NEXT_PUBLIC_SITE_URL || 'https://yourwebsite.com'} › blog › {title.toLowerCase().replace(/\s+/g, '-').substring(0, 30)}
          </div>
          <div className="text-gray-600 text-sm leading-relaxed">
            {(value.metaDescription || suggestedMetaDescription)}
          </div>
        </div>
      </div>
    </div>
  );
}

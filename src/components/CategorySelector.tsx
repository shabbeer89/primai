"use client";

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const DEFAULT_CATEGORIES = [
  'Technology',
  'Artificial Intelligence',
  'Web Development',
  'Digital Marketing',
  'Business',
  'Finance',
  'Health & Wellness',
  'Education',
  'Travel',
  'Lifestyle'
];

interface CategorySelectorProps {
  value: string[];
  onChange: (categories: string[]) => void;
  maxCategories?: number;
}

export default function CategorySelector({
  value,
  onChange,
  maxCategories = 5
}: CategorySelectorProps) {
  const [customCategory, setCustomCategory] = useState('');

  const handleCategoryToggle = (category: string) => {
    if (value.includes(category)) {
      // Remove category
      onChange(value.filter(cat => cat !== category));
    } else {
      // Add category (check limit)
      if (value.length >= maxCategories) {
        alert(`Maximum ${maxCategories} categories allowed`);
        return;
      }
      onChange([...value, category]);
    }
  };

  const handleAddCustomCategory = () => {
    const trimmed = customCategory.trim();
    if (!trimmed) return;

    if (value.includes(trimmed)) {
      alert('Category already selected');
      return;
    }

    if (value.length >= maxCategories) {
      alert(`Maximum ${maxCategories} categories allowed`);
      return;
    }

    onChange([...value, trimmed]);
    setCustomCategory('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomCategory();
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    onChange(value.filter(cat => cat !== categoryToRemove));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Categories *
      </label>

      {/* Selected categories */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {value.map((category) => (
            <span
              key={category}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
            >
              {category}
              <button
                type="button"
                onClick={() => removeCategory(category)}
                className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label={`Remove ${category} category`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Custom category input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add custom category"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="button"
          onClick={handleAddCustomCategory}
          disabled={!customCategory.trim()}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add
        </button>
      </div>

      {/* Default categories */}
      <div>
        <p className="text-sm text-gray-600 mb-2">Quick select:</p>
        <div className="flex flex-wrap gap-2">
          {DEFAULT_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryToggle(category)}
              disabled={value.length >= maxCategories && !value.includes(category)}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                value.includes(category)
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {value.length >= maxCategories && (
        <p className="text-sm text-amber-600 mt-2">
          Maximum {maxCategories} categories reached
        </p>
      )}
    </div>
  );
}

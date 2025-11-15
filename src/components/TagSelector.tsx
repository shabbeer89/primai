"use client";

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface TagSelectorProps {
  value: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  placeholder?: string;
}

export default function TagSelector({
  value,
  onChange,
  maxTags = 10,
  placeholder = "Add a tag"
}: TagSelectorProps) {
  const [currentTag, setCurrentTag] = useState('');

  const addTag = () => {
    const trimmed = currentTag.trim();
    if (!trimmed) return;

    if (value.includes(trimmed)) {
      alert('Tag already exists');
      return;
    }

    if (value.length >= maxTags) {
      alert(`Maximum ${maxTags} tags allowed`);
      return;
    }

    onChange([...value, trimmed]);
    setCurrentTag('');
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    const newTags = paste.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

    const validNewTags = newTags.filter(newTag => {
      if (value.includes(newTag)) return false;
      if (value.length + (value.filter(v => newTags.slice(0, newTags.indexOf(newTag)).includes(v)).length + 1) > maxTags) return false;
      return true;
    });

    if (validNewTags.length > 0) {
      onChange([...value, ...validNewTags.slice(0, maxTags - value.length)]);
    }
  };

  return (
    <div>
      {/* Selected tags */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {value.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
            >
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label={`Remove ${tag} tag`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Add new tag */}
      <div className="flex gap-2">
        <input
          type="text"
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyPress={handleKeyPress}
          onPaste={handlePaste}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="button"
          onClick={addTag}
          disabled={!currentTag.trim()}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Press Enter or comma to add tags. You can also paste comma-separated tags.
      </p>

      {value.length >= maxTags && (
        <p className="text-sm text-amber-600 mt-2">
          Maximum {maxTags} tags reached
        </p>
      )}
    </div>
  );
}

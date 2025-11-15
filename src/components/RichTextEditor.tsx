"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-8">
      <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
      <span className="ml-2 text-gray-600">Loading editor...</span>
    </div>
  ),
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing your blog post...",
  height = 400
}: RichTextEditorProps) {
  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || '')}
        preview="edit"
        hideToolbar={false}
        visibleDragbar={true}
        height={height}
        textareaProps={{
          placeholder,
        }}
        className="border border-gray-300 rounded-md"
      />
    </div>
  );
}

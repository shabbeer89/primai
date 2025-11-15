"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label = "Featured Image",
  placeholder = "Upload a featured image for your blog post"
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      // For now, we'll use a placeholder. In a real implementation,
      // you'd upload to a service like Cloudinary, AWS S3, etc.
      // For demonstration, we'll create a local URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
        setUploading(false);
      };
      reader.readAsDataURL(file);

      // In production, replace with actual upload logic:
      // const formData = new FormData();
      // formData.append('file', file);
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();
      // onChange(data.url);

    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const removeImage = () => {
    onChange('');
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Featured"
            className="w-full h-48 object-cover rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            dragActive
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-indigo-400'
          } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center">
            {uploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            ) : (
              <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
            )}
            <div className="text-gray-600 mb-2">
              {uploading ? 'Uploading...' : placeholder}
            </div>
            <div className="text-sm text-gray-500">
              Drop an image here or click to browse
            </div>
            <div className="text-xs text-gray-400 mt-1">
              PNG, JPG up to 5MB
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}

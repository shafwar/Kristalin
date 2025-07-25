import React, { useState, useCallback } from 'react';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string | null) => void;
  page?: string;
  label?: string;
  maxSize?: number; // in MB
  accept?: string;
}

interface UploadResponse {
  success: boolean;
  url?: string;
  thumb_url?: string;
  filename?: string;
  thumbname?: string;
  folder?: string;
  size?: number;
  width?: number;
  height?: number;
  message?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  page = 'general',
  label,
  maxSize = 5, // 5MB default
  accept = 'image/jpeg,image/jpg,image/png,image/webp'
}) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // File validation
  const validateFile = (file: File): string | null => {
    const maxSizeBytes = maxSize * 1024 * 1024;

    if (file.size > maxSizeBytes) {
      return `File size must be less than ${maxSize}MB`;
    }

    const allowedTypes = accept.split(',').map(type => type.trim());
    if (!allowedTypes.some(type => file.type === type || file.name.toLowerCase().endsWith(type.replace('image/', '.')))) {
      return 'Invalid file type. Please upload JPG, PNG, or WebP images only.';
    }

    return null;
  };

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file) return;

    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('page', page);

    try {
      // Using fetch instead of axios for better upload progress tracking
      const response = await fetch(window.route('admin.image.upload'), {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
      });

      const data: UploadResponse = await response.json();

      if (data.success && data.url) {
        setPreview(data.url);
        onChange(data.url);
        setUploadProgress(100);

        // Show success message briefly
        setTimeout(() => setUploadProgress(0), 2000);
      } else {
        setError(data.message || 'Upload failed');
      }
    } catch (e) {
      console.error('Upload error:', e);
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  }, [page, onChange, maxSize, accept]);

  const handleDelete = useCallback(async () => {
    if (!preview) return;

    try {
      const filename = preview.split('/').pop();
      if (!filename) throw new Error('Invalid filename');

      const response = await fetch(window.route('admin.image.destroy', { filename }), {
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page }),
      });

      const data = await response.json();

      if (data.success) {
        setPreview(null);
        onChange(null);
        setError(null);
      } else {
        setError(data.message || 'Failed to delete image');
      }
    } catch (e) {
      console.error('Delete error:', e);
      setError('Failed to delete image');
    }
  }, [preview, page, onChange]);

  // Drag & Drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  return (
    <div className="space-y-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {preview ? (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="max-w-xs max-h-48 rounded-lg shadow-md object-cover"
          />
          <button
            onClick={handleDelete}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
            title="Delete image"
          >
            ×
          </button>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
            dragOver
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400 bg-gray-50'
          } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !uploading && document.getElementById(`file-input-${page}`)?.click()}
        >
          {uploading ? (
            <div className="space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600">Uploading...</p>
              {uploadProgress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-gray-600">
                <p className="text-lg">Drag & drop an image here</p>
                <p className="text-sm">or click to select</p>
                <p className="text-xs text-gray-500 mt-1">
                  Max {maxSize}MB • JPG, PNG, WebP
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <input
        id={`file-input-${page}`}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        className="hidden"
        disabled={uploading}
      />

      {error && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-red-700">{error}</p>
          <button
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-600 ml-auto"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

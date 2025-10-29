import React from 'react';
import { type Blog } from '../../types';
import { Card } from '../common/Card';

interface BlogViewProps {
  blog: Blog;
}

export const BlogView: React.FC<BlogViewProps> = ({ blog }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {blog.title}
        </h1>
        <div className="text-sm text-gray-500">
          <p>Created: {formatDate(blog.created_at)}</p>
          {blog.updated_at !== blog.created_at && (
            <p>Updated: {formatDate(blog.updated_at)}</p>
          )}
        </div>
      </div>
      
      <div className="prose max-w-none">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {blog.content}
        </div>
      </div>
    </Card>
  );
};

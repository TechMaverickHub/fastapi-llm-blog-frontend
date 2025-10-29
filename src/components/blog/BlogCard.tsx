import React from 'react';
import { Link } from 'react-router-dom';
import { type Blog } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface BlogCardProps {
  blog: Blog;
  showActions?: boolean;
  onDelete?: (id: number) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  blog,
  showActions = false,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {blog.title}
        </h3>
        {showActions && (
          <div className="flex space-x-2 ml-4">
            <Link to={`/blogs/${blog.id}/edit`}>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </Link>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete?.(blog.id)}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {truncateContent(blog.content)}
      </p>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Created: {formatDate(blog.created_at)}</span>
        <Link
          to={`/blogs/${blog.id}`}
          className="text-primary-600 hover:text-primary-500 font-medium"
        >
          Read more →
        </Link>
      </div>
    </Card>
  );
};

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { blogService } from '../../services/blogs';
import { BlogView } from '../../components/blog/BlogView';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

export const BlogViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const blogId = parseInt(id || '0');

  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => blogService.getBlogById(blogId),
    enabled: !!blogId,
  });

  if (isLoading) {
    return (
      <Card className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  if (error || !blog) {
    return (
      <Card className="max-w-md mx-auto text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Blog Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The blog you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate('/blogs')}>
          Back to Blogs
        </Button>
      </Card>
    );
  }

  return <BlogView blog={blog} />;
};

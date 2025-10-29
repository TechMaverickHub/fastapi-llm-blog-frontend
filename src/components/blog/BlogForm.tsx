import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { blogService } from '../../services/blogs';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { Card } from '../common/Card';

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

type BlogFormData = z.infer<typeof blogSchema>;

interface BlogFormProps {
  initialData?: Partial<BlogFormData>;
  blogId?: number;
  mode: 'create' | 'edit';
}

export const BlogForm: React.FC<BlogFormProps> = ({
  initialData,
  blogId,
  mode,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: BlogFormData) => {
    try {
      setIsLoading(true);
      setError('');

      if (mode === 'create') {
        await blogService.createBlog(data);
        navigate('/blogs');
      } else if (mode === 'edit' && blogId) {
        await blogService.updateBlog(blogId, data);
        navigate(`/blogs/${blogId}`);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {mode === 'create' ? 'Create New Blog' : 'Edit Blog'}
        </h1>
        <p className="text-gray-600">
          {mode === 'create' 
            ? 'Share your thoughts with the world' 
            : 'Update your blog post'
          }
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Title"
          {...register('title')}
          error={errors.title?.message}
          placeholder="Enter blog title"
        />

        <Textarea
          label="Content"
          rows={12}
          {...register('content')}
          error={errors.content?.message}
          placeholder="Write your blog content here..."
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
          >
            {mode === 'create' ? 'Create Blog' : 'Update Blog'}
          </Button>
        </div>
      </form>
    </Card>
  );
};


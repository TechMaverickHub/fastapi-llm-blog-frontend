import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { blogService } from '../../services/blogs';
import { BlogCard } from '../../components/blog/BlogCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

interface BlogListPageProps {
  showUserBlogs?: boolean;
}

export const BlogListPage: React.FC<BlogListPageProps> = ({ 
  showUserBlogs = false 
}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState<'created_at' | 'title'>('created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const perPage = 6; // used by user-blogs endpoint if needed

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      'blogs',
      showUserBlogs ? 'user' : 'all',
      page,
      showUserBlogs ? perPage : limit,
      showUserBlogs ? undefined : sortBy,
      showUserBlogs ? undefined : order,
      showUserBlogs ? undefined : search,
    ],
    queryFn: () =>
      showUserBlogs
        ? blogService.getUserBlogs({ page, per_page: perPage })
        : blogService.getAllBlogs({ page, limit, sort_by: sortBy, order, search: search || null }),
  });

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.deleteBlog(id);
        refetch();
      } catch (error) {
        console.error('Failed to delete blog:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-3"></div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Error Loading Blogs
        </h2>
        <p className="text-gray-600 mb-4">
          {(error as any)?.message || 'Something went wrong'}
        </p>
        <Button onClick={() => refetch()}>
          Try Again
        </Button>
      </Card>
    );
  }

  const blogs = data?.blogs || [];
  const totalPages = data?.total_pages || 1;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {showUserBlogs ? 'My Blogs' : 'All Blogs'}
        </h1>
        <p className="text-gray-600">
          {showUserBlogs 
            ? 'Manage your blog posts' 
            : 'Discover amazing blog posts from our community'
          }
        </p>
      </div>

      {!showUserBlogs && (
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => { setSearchInput(e.target.value); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSearch(searchInput);
                    setPage(1);
                  }
                }}
                placeholder="Search by title"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value as any); setPage(1); }}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="title">Title</option>
                <option value="created_at">Created At</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <select
                value={order}
                onChange={(e) => { setOrder(e.target.value as any); setPage(1); }}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="desc">Desc</option>
                <option value="asc">Asc</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Per Page</label>
              <select
                value={limit}
                onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <div className="mt-2 flex justify-end">
                <Button onClick={() => { setSearch(searchInput); setPage(1); }}>
                  Search
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {blogs.length === 0 ? (
        <Card className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            No Blogs Found
          </h2>
          <p className="text-gray-600 mb-6">
            {showUserBlogs 
              ? "You haven't written any blogs yet. Create your first blog post!"
              : "No blogs have been published yet."
            }
          </p>
          {showUserBlogs && (
            <Button onClick={() => window.location.href = '/blogs/create'}>
              Create Your First Blog
            </Button>
          )}
        </Card>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                showActions={showUserBlogs}
                onDelete={showUserBlogs ? handleDelete : undefined}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </Button>
              
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              
              <Button
                variant="outline"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

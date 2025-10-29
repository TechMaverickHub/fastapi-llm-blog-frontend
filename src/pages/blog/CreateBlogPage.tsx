import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { BlogForm } from '../../components/blog/BlogForm';
import { Card } from '../../components/common/Card';

export const CreateBlogPage: React.FC = () => {
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const title = searchParams.get('title') || '';
  const rawPoints = searchParams.get('points');

  let points: string[] = [];
  if (rawPoints) {
    try {
      points = JSON.parse(decodeURIComponent(rawPoints));
      if (!Array.isArray(points)) points = [];
    } catch {
      points = [];
    }
  }

  if (points.length > 0) {
    return (
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <BlogForm mode="create" initialData={{ title }} />
        </div>
        <div className="md:col-span-1">
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Reference Points</h2>
            <div className="space-y-2">
              {points.map((p, idx) => (
                <div key={idx} className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></span>
                  <p className="text-sm text-gray-700">{p}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return <BlogForm mode="create" initialData={{ title }} />;
};


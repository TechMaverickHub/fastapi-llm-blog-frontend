import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { BlogListPage } from './pages/blog/BlogListPage';
import { CreateBlogPage } from './pages/blog/CreateBlogPage';
import { EditBlogPage } from './pages/blog/EditBlogPage';
import { BlogViewPage } from './pages/blog/BlogViewPage';
import { TopicSuggestionsPage } from './pages/suggest/TopicSuggestionsPage';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/blogs" replace />} />
              
              <Route path="blogs" element={
                <ProtectedRoute>
                  <BlogListPage />
                </ProtectedRoute>
              } />
              
              <Route path="blogs/my" element={
                <ProtectedRoute>
                  <BlogListPage showUserBlogs={true} />
                </ProtectedRoute>
              } />
              
              <Route path="blogs/create" element={
                <ProtectedRoute>
                  <CreateBlogPage />
                </ProtectedRoute>
              } />
              
              <Route path="blogs/:id/edit" element={
                <ProtectedRoute>
                  <EditBlogPage />
                </ProtectedRoute>
              } />
              
              <Route path="blogs/:id" element={
                <ProtectedRoute>
                  <BlogViewPage />
                </ProtectedRoute>
              } />
              
              <Route path="blogs/suggest" element={
                <ProtectedRoute>
                  <TopicSuggestionsPage />
                </ProtectedRoute>
              } />
            </Route>
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/blogs" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
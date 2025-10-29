import api from './api';
import { type Blog, type CreateBlogRequest, type CreateBlogResponse, type BlogListResponse, type PaginationParams } from '../types';
import { API_CONFIG } from '../constants/api';

export const blogService = {
  // Get all blogs with pagination
  getAllBlogs: async (params: PaginationParams = {}): Promise<BlogListResponse> => {
    const response = await api.get(API_CONFIG.ENDPOINTS.BLOGS.ALL, { params });
    return response.data;
  },

  // Get blogs by current user
  getUserBlogs: async (params: PaginationParams = {}): Promise<BlogListResponse> => {
    const response = await api.get(API_CONFIG.ENDPOINTS.BLOGS.MY, { params });
    return response.data;
  },

  // Get single blog by ID
  getBlogById: async (id: number): Promise<Blog> => {
    const response = await api.get(API_CONFIG.ENDPOINTS.BLOGS.BY_ID(id));
    return response.data;
  },

  // Create new blog
  createBlog: async (blogData: CreateBlogRequest): Promise<CreateBlogResponse> => {
    const response = await api.post(API_CONFIG.ENDPOINTS.BLOGS.CREATE, blogData);
    return response.data;
  },

  // Update blog
  updateBlog: async (id: number, blogData: Partial<CreateBlogRequest>): Promise<Blog> => {
    const response = await api.put(API_CONFIG.ENDPOINTS.BLOGS.BY_ID(id), blogData);
    return response.data;
  },

  // Delete blog
  deleteBlog: async (id: number): Promise<void> => {
    await api.delete(API_CONFIG.ENDPOINTS.BLOGS.BY_ID(id));
  },
};

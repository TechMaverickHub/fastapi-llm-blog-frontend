import api from './api';
import { type Blog, type CreateBlogRequest, type CreateBlogResponse, type BlogListResponse, type PaginationParams } from '../types';
import { API_CONFIG } from '../constants/api';

export const blogService = {
  // Get all blogs with pagination
  getAllBlogs: async (params: PaginationParams = {}): Promise<BlogListResponse> => {
    const { page, per_page, limit, sort_by, order, search } = params;
    const backendParams = {
      page: page ?? 1,
      limit: per_page ?? limit ?? 10,
      sort_by: sort_by ?? 'updated_at',
      order: order ?? 'desc',
      ...(search != null && search !== '' ? { search } : {}),
    } as const;

    const response = await api.get(API_CONFIG.ENDPOINTS.BLOGS.LIST_FILTER, { params: backendParams });

    const results = response.data?.results;
    return {
      blogs: results?.items ?? [],
      total: results?.total ?? 0,
      page: results?.page ?? backendParams.page,
      per_page: results?.limit ?? backendParams.limit,
      total_pages: results?.pages ?? 1,
    };
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

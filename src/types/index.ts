// User types
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

// Authentication types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse {
  message: string;
  status: number;
  results: {
    access_token: string;
    refresh_token: string;
    user: User;
  };
}

export interface RegisterResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

// Blog types
export interface Blog {
  id: number;
  title: string;
  content: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface CreateBlogRequest {
  title: string;
  content: string;
}

export interface CreateBlogResponse {
  message: string;
  status: number;
  results: Blog;
}

export interface BlogListResponse {
  blogs: Blog[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// Topic suggestion types
export interface TopicSuggestion {
  topic: string;
  points: string[];
}

export interface TopicSuggestionRequest {
  keywords: string[];
}

export interface TopicSuggestionResponse {
  suggestions: TopicSuggestion[];
}

// API Error types
export interface ApiError {
  message: string;
  status: number;
  details?: any;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  per_page?: number;
  limit?: number;
  sort_by?: string;
  order?: 'asc' | 'desc';
  search?: string | null;
}

// Context types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}


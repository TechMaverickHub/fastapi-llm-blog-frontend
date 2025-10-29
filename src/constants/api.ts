// API Configuration Constants
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/signup',
    },
    BLOGS: {
      ALL: '/blogs',
      MY: '/blogs/my',
      CREATE: '/blogs/blog',
      BY_ID: (id: number) => `/blogs/${id}`,
    },
    SUGGESTIONS: {
      TOPICS: '/suggest_topics',
    },
  },
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Pre-built API URLs for common endpoints
export const API_URLS = {
  LOGIN: buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN),
  REGISTER: buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.REGISTER),
  BLOGS_ALL: buildApiUrl(API_CONFIG.ENDPOINTS.BLOGS.ALL),
  BLOGS_MY: buildApiUrl(API_CONFIG.ENDPOINTS.BLOGS.MY),
  BLOGS_CREATE: buildApiUrl(API_CONFIG.ENDPOINTS.BLOGS.CREATE),
  TOPIC_SUGGESTIONS: buildApiUrl(API_CONFIG.ENDPOINTS.SUGGESTIONS.TOPICS),
};


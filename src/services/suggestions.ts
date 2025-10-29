import api from './api';
import { type TopicSuggestionResponse } from '../types';
import { API_CONFIG } from '../constants/api';

export const suggestionService = {
  // Get topic suggestions based on keywords
  getTopicSuggestions: async (keywords: string[]): Promise<TopicSuggestionResponse> => {
    const response = await api.post(API_CONFIG.ENDPOINTS.SUGGESTIONS.TOPICS, { keywords });
    return response.data;
  },
};

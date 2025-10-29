import api from './api';
import { type TopicSuggestion, type TopicSuggestionResponse } from '../types';
import { API_CONFIG } from '../constants/api';

export const suggestionService = {
  // Get topic suggestions based on keywords
  getTopicSuggestions: async (topics: string[]): Promise<TopicSuggestionResponse> => {
    const response = await api.post(API_CONFIG.ENDPOINTS.SUGGESTIONS.TOPICS, { topics });
    const data = response.data as any;

    // Backend returns results as a JSON string; parse it safely
    let parsed: TopicSuggestion[] = [];
    try {
      const raw = data?.results;
      parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch {
      parsed = [];
    }

    return { suggestions: parsed ?? [] };
  },
};

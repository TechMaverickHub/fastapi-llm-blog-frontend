import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TopicSuggestions } from '../../components/blog/TopicSuggestions';
import { type TopicSuggestion } from '../../types';

export const TopicSuggestionsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleUseSuggestion = (suggestion: TopicSuggestion) => {
    // Navigate to create blog page with pre-filled data
    const params = new URLSearchParams({
      title: suggestion.topic,
      content: suggestion.points.join('\n\n'),
    });
    navigate(`/blogs/create?${params.toString()}`);
  };

  return <TopicSuggestions onUseSuggestion={handleUseSuggestion} />;
};

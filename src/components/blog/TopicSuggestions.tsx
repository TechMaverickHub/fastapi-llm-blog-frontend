import React, { useState } from 'react';
import { suggestionService } from '../../services/suggestions';
import { type TopicSuggestion } from '../../types';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

interface TopicSuggestionsProps {
  onUseSuggestion?: (suggestion: TopicSuggestion) => void;
}

export const TopicSuggestions: React.FC<TopicSuggestionsProps> = ({
  onUseSuggestion,
}) => {
  const [suggestions, setSuggestions] = useState<TopicSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [topics, setTopics] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addTopicFromInput = () => {
    const value = input.trim();
    if (value && !topics.includes(value)) {
      setTopics([...topics, value]);
    }
    setInput('');
  };

  const removeTopic = (topic: string) => {
    setTopics(topics.filter(t => t !== topic));
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      setError('');

      if (topics.length === 0) {
        setError('Please add at least one topic');
        return;
      }

      const response = await suggestionService.getTopicSuggestions(topics);
      setSuggestions(response.suggestions);
    } catch (err: any) {
      setError(err.message || 'Failed to get suggestions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseSuggestion = (suggestion: TopicSuggestion) => {
    if (onUseSuggestion) {
      onUseSuggestion(suggestion);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Topic Suggestions</h1>
          <p className="text-gray-600">
            Add topics as tags to get AI-powered blog topic suggestions
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Topics</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {topics.map((t) => (
                <span key={t} className="inline-flex items-center px-2.5 py-1.5 rounded-full text-sm bg-gray-100 text-gray-800">
                  {t}
                  <button
                    type="button"
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => removeTopic(t)}
                    aria-label={`Remove ${t}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ',') {
                  e.preventDefault();
                  addTopicFromInput();
                }
              }}
              placeholder="Type a topic and press Enter"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
            <div className="mt-2">
              <Button type="button" onClick={addTopicFromInput} variant="outline" size="sm">Add Topic</Button>
            </div>
          </div>

          <Button
            type="button"
            onClick={onSubmit}
            isLoading={isLoading}
            className="w-full sm:w-auto"
          >
            Get Suggestions
          </Button>
        </div>
      </Card>

      {suggestions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Suggested Topics</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((suggestion, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {suggestion.topic}
                </h3>
                
                <div className="space-y-2 mb-4">
                  {suggestion.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></span>
                      <p className="text-sm text-gray-600">{point}</p>
                    </div>
                  ))}
                </div>

                {onUseSuggestion && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUseSuggestion(suggestion)}
                    className="w-full"
                  >
                    Use This Topic
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

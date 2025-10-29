import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { suggestionService } from '../../services/suggestions';
import { type TopicSuggestion } from '../../types';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';

const keywordSchema = z.object({
  keywords: z.string().min(1, 'Please enter at least one keyword'),
});

type KeywordFormData = z.infer<typeof keywordSchema>;

interface TopicSuggestionsProps {
  onUseSuggestion?: (suggestion: TopicSuggestion) => void;
}

export const TopicSuggestions: React.FC<TopicSuggestionsProps> = ({
  onUseSuggestion,
}) => {
  const [suggestions, setSuggestions] = useState<TopicSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<KeywordFormData>({
    resolver: zodResolver(keywordSchema),
  });

  const onSubmit = async (data: KeywordFormData) => {
    try {
      setIsLoading(true);
      setError('');
      
      const keywords = data.keywords
        .split(',')
        .map(k => k.trim())
        .filter(k => k.length > 0);
      
      const response = await suggestionService.getTopicSuggestions(keywords);
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
            Enter keywords separated by commas to get AI-powered blog topic suggestions
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Keywords"
            {...register('keywords')}
            error={errors.keywords?.message}
            placeholder="technology, AI, programming, web development"
            helperText="Separate multiple keywords with commas"
          />

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full sm:w-auto"
          >
            Get Suggestions
          </Button>
        </form>
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

import React, { useState } from 'react';

import { Button } from 'frontend/components';
import { ButtonType } from 'frontend/types/button';

interface CommentFormProps {
  initialContent?: string;
  onSubmit: (content: string) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  initialContent = '',
  onSubmit,
  onCancel,
  submitLabel = 'Add Comment',
}) => {
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Comment content is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    onSubmit(content.trim())
      .catch(() => {
        setError('Failed to save comment. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your comment..."
          className="w-full rounded border border-stroke bg-transparent px-4 py-3 outline-none transition focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
          rows={3}
        />
        {error && <p className="mt-1 text-sm text-danger">{error}</p>}
      </div>
      <div className="flex gap-2">
        <Button
          type={ButtonType.SUBMIT}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {submitLabel}
        </Button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded border border-stroke px-4 py-2 text-black transition hover:bg-stroke dark:border-strokedark dark:text-white dark:hover:bg-meta-4"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CommentForm;

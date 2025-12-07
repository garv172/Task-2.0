import React from 'react';

import { Comment } from 'frontend/types/task';

interface CommentItemProps {
  comment: Comment;
  onEdit: () => void;
  onDelete: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onEdit, onDelete }) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString();

  return (
    <div className="rounded-lg border border-stroke p-4 dark:border-strokedark">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="whitespace-pre-wrap text-black dark:text-white">
            {comment.content}
          </p>
          <div className="mt-2 text-sm text-bodydark2">
            <span>Created: {formatDate(comment.created_at)}</span>
            {comment.updated_at !== comment.created_at && (
              <span className="ml-4">Updated: {formatDate(comment.updated_at)}</span>
            )}
          </div>
        </div>
        <div className="ml-4 flex gap-2">
          <button
            onClick={onEdit}
            type="button"
            className="rounded border border-primary px-3 py-1 text-sm text-primary transition hover:bg-primary hover:text-white"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            type="button"
            className="rounded border border-danger px-3 py-1 text-sm text-danger transition hover:bg-danger hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;

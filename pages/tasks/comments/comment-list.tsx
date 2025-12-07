import React from 'react';

import CommentForm from './comment-form';
import CommentItem from './comment-item';

import { Comment } from 'frontend/types/task';

interface CommentListProps {
  comments: Comment[];
  editingComment: Comment | null;
  onEdit: (comment: Comment) => void;
  onUpdate: (commentId: string, content: string) => Promise<void>;
  onDelete: (commentId: string) => void;
  onCancelEdit: () => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  editingComment,
  onEdit,
  onUpdate,
  onDelete,
  onCancelEdit,
}) => {
  if (comments.length === 0) {
    return (
      <div className="py-8 text-center text-bodydark2">
        No comments yet. Be the first to add one!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id}>
          {editingComment?.id === comment.id ? (
            <div className="rounded bg-bodydark1 p-4 dark:bg-meta-4">
              <CommentForm
                initialContent={comment.content}
                onSubmit={(content: string) => onUpdate(comment.id, content)}
                onCancel={onCancelEdit}
                submitLabel="Update"
              />
            </div>
          ) : (
            <CommentItem
              comment={comment}
              onEdit={() => onEdit(comment)}
              onDelete={() => onDelete(comment.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;

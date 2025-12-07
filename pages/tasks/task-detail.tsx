import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import CommentForm from './comments/comment-form';
import CommentList from './comments/comment-list';

import { Button } from 'frontend/components';
import CommentService from 'frontend/services/comment.service';
import TaskService from 'frontend/services/task.service';
import { Comment, Task } from 'frontend/types/task';
import { getAccessTokenFromStorage } from 'frontend/utils/storage-util';

const taskService = new TaskService();
const commentService = new CommentService();

const TaskDetail: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  
  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);

  const accessToken = getAccessTokenFromStorage();

  const fetchTask = useCallback(async () => {
    if (!taskId || !accessToken) return;
    try {
      const response = await taskService.getTask(
        accessToken.accountId,
        taskId,
        accessToken.token,
      );
      if (response.data) {
        setTask(response.data);
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to load task');
    }
  }, [taskId, accessToken]);

  const fetchComments = useCallback(async () => {
    if (!taskId || !accessToken) return;
    try {
      const response = await commentService.getComments(
        accessToken.accountId,
        taskId,
        accessToken.token,
      );
      if (response.data) {
        setComments(response.data.items);
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to load comments');
    }
  }, [taskId, accessToken]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchTask(), fetchComments()]);
      setLoading(false);
    };
    loadData().catch(() => {
      setLoading(false);
    });
  }, [fetchTask, fetchComments]);

  const handleCreateComment = async (content: string) => {
    if (!taskId || !accessToken) return;
    
    await commentService.createComment(
      accessToken.accountId,
      taskId,
      accessToken.token,
      { content },
    );
    toast.success('Comment added successfully');
    await fetchComments();
    setShowCommentForm(false);
  };

  const handleUpdateComment = async (commentId: string, content: string) => {
    if (!taskId || !accessToken) return;
    
    await commentService.updateComment(
      accessToken.accountId,
      taskId,
      commentId,
      accessToken.token,
      { content },
    );
    toast.success('Comment updated successfully');
    await fetchComments();
    setEditingComment(null);
  };

  const handleDeleteComment = (commentId: string) => {
    if (!taskId || !accessToken) return;
    
    commentService.deleteComment(
      accessToken.accountId,
      taskId,
      commentId,
      accessToken.token,
    )
      .then(() => {
        toast.success('Comment deleted successfully');
        return fetchComments();
      })
      .catch((error: unknown) => {
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(err.response?.data?.message || 'Failed to delete comment');
      });
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="size-12 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="py-8 text-center">
        <p className="text-danger">Task not found</p>
        <Button onClick={() => navigate('/tasks')}>
          ← Back to Tasks
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <button
        type="button"
        onClick={() => navigate('/tasks')}
        className="mb-4 text-primary hover:underline"
      >
        ← Back to Tasks
      </button>

      <div className="mb-6 rounded-lg border border-stroke bg-white p-6 shadow dark:border-strokedark dark:bg-boxdark">
        <h1 className="mb-2 text-2xl font-bold text-black dark:text-white">
          {task.title}
        </h1>
        <p className="text-bodydark2">
          {task.description}
        </p>
      </div>

      <div className="rounded-lg border border-stroke bg-white p-6 shadow dark:border-strokedark dark:bg-boxdark">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Comments ({comments.length})
          </h2>
          <Button onClick={() => setShowCommentForm(true)}>
            Add Comment
          </Button>
        </div>

        {showCommentForm && (
          <div className="mb-4 rounded bg-bodydark1 p-4 dark:bg-meta-4">
            <CommentForm
              onSubmit={handleCreateComment}
              onCancel={() => setShowCommentForm(false)}
            />
          </div>
        )}

        <CommentList
          comments={comments}
          editingComment={editingComment}
          onEdit={setEditingComment}
          onUpdate={handleUpdateComment}
          onDelete={handleDeleteComment}
          onCancelEdit={() => setEditingComment(null)}
        />
      </div>
    </div>
  );
};

export default TaskDetail;

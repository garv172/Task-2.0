import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import TaskForm from './task-form';
import TaskItem from './task-item';

import { Button, H2, VerticalStackLayout } from 'frontend/components';
import TaskService from 'frontend/services/task.service';
import { Task } from 'frontend/types/task';
import { getAccessTokenFromStorage } from 'frontend/utils/storage-util';

const taskService = new TaskService();

type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const accessToken = getAccessTokenFromStorage();

  const fetchTasks = useCallback(async () => {
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await taskService.getTasks(
        accessToken.accountId,
        accessToken.token,
      );
      setTasks(response.data?.items || []);
    } catch (error: unknown) {
      console.error('Failed to fetch tasks:', error);
      const err = error as ApiError;
      toast.error(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  }, [accessToken?.accountId, accessToken?.token]);

  useEffect(() => {
    fetchTasks().catch(() => {
      // Error already handled in fetchTasks
    });
  }, [fetchTasks]);

  const handleCreateTask = (title: string, description: string) => {
    if (!accessToken) return;

    taskService
      .createTask(accessToken.accountId, accessToken.token, {
        title,
        description,
      })
      .then(() => {
        toast.success('Task created successfully');
        setShowCreateForm(false);
        return fetchTasks();
      })
      .catch((error: unknown) => {
        const err = error as ApiError;
        toast.error(err.response?.data?.message || 'Failed to create task');
      });
  };

  const handleUpdateTask = (title: string, description: string) => {
    if (!accessToken || !editingTask) return;

    taskService
      .updateTask(accessToken.accountId, editingTask.id, accessToken.token, {
        title,
        description,
      })
      .then(() => {
        toast.success('Task updated successfully');
        setEditingTask(null);
        return fetchTasks();
      })
      .catch((error: unknown) => {
        const err = error as ApiError;
        toast.error(err.response?.data?.message || 'Failed to update task');
      });
  };

  const handleDeleteTask = (taskId: string) => {
    if (!accessToken) return;

    taskService
      .deleteTask(accessToken.accountId, taskId, accessToken.token)
      .then(() => {
        toast.success('Task deleted successfully');
        return fetchTasks();
      })
      .catch((error: unknown) => {
        const err = error as ApiError;
        toast.error(err.response?.data?.message || 'Failed to delete task');
      });
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <VerticalStackLayout>
        <div className="mb-6 flex items-center justify-between">
          <H2>Tasks</H2>
          <Button onClick={() => setShowCreateForm(true)}>+ Add Task</Button>
        </div>

        {/* Create Task Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-boxdark">
              <h3 className="mb-4 text-lg font-semibold">Create New Task</h3>
              <TaskForm
                onSubmit={handleCreateTask}
                onCancel={() => setShowCreateForm(false)}
                submitLabel="Create Task"
              />
            </div>
          </div>
        )}

        {/* Edit Task Modal */}
        {editingTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-boxdark">
              <h3 className="mb-4 text-lg font-semibold">Edit Task</h3>
              <TaskForm
                initialTitle={editingTask.title}
                initialDescription={editingTask.description}
                onSubmit={handleUpdateTask}
                onCancel={() => setEditingTask(null)}
                submitLabel="Update Task"
              />
            </div>
          </div>
        )}

        {/* Task List */}
        {isLoading && <div className="py-8 text-center">Loading tasks...</div>}
        {!isLoading && tasks.length === 0 && (
          <div className="py-8 text-center text-bodydark2">
            No tasks yet. Create your first task!
          </div>
        )}
        {!isLoading && tasks.length > 0 && (
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={() => setEditingTask(task)}
                onDelete={() => handleDeleteTask(task.id)}
              />
            ))}
          </div>
        )}
      </VerticalStackLayout>
    </div>
  );
};

export default TasksPage;

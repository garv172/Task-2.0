import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Task } from 'frontend/types/task';

interface TaskItemProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/tasks/${task.id}`);
  };

  return (
    <div className="rounded-lg border border-stroke bg-white p-4 shadow dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-start justify-between">
        <button
          type="button"
          className="flex-1 cursor-pointer text-left"
          onClick={handleViewDetails}
        >
          <h3 className="text-lg font-semibold text-black hover:text-primary dark:text-white">
            {task.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-bodydark2">
            {task.description}
          </p>
        </button>
        <div className="ml-4 flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="rounded border border-primary px-3 py-1 text-sm text-primary transition hover:bg-primary hover:text-white"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="rounded border border-danger px-3 py-1 text-sm text-danger transition hover:bg-danger hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="mt-3">
        <button
          type="button"
          onClick={handleViewDetails}
          className="text-sm text-primary hover:underline"
        >
          View Comments →
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

import React, { useState } from 'react';

import { Button, FormControl, Input } from 'frontend/components';
import { ButtonKind, ButtonType } from 'frontend/types/button';

interface TaskFormProps {
  initialTitle?: string;
  initialDescription?: string;
  onSubmit: (title: string, description: string) => void;
  onCancel: () => void;
  submitLabel: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialTitle = '',
  initialDescription = '',
  onSubmit,
  onCancel,
  submitLabel,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      return;
    }

    setIsSubmitting(true);
    onSubmit(title.trim(), description.trim());
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormControl label="Title">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
      </FormControl>

      <FormControl label="Description">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          required
          className="w-full rounded border border-stroke bg-transparent px-4 py-3 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          rows={4}
        />
      </FormControl>

      <div className="flex justify-end gap-3">
        <Button kind={ButtonKind.TERTIARY} onClick={onCancel} type={ButtonType.BUTTON}>
          Cancel
        </Button>
        <Button 
          type={ButtonType.SUBMIT}
          disabled={isSubmitting || !title.trim() || !description.trim()}
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;

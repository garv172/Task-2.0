// Task types
export interface Task {
  id: string;
  account_id: string;
  title: string;
  description: string;
}

export interface CreateTaskParams {
  title: string;
  description: string;
}

export interface UpdateTaskParams {
  title: string;
  description: string;
}

export interface PaginationParams {
  page: number;
  size: number;
  offset: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination_params: PaginationParams;
  total_count: number;
  total_pages: number;
}

// Comment types
export interface Comment {
  id: string;
  task_id: string;
  account_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCommentParams {
  content: string;
}

export interface UpdateCommentParams {
  content: string;
}

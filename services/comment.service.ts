import APIService from 'frontend/services/api.service';
import { ApiResponse } from 'frontend/types';
import {
  Comment,
  CreateCommentParams,
  PaginatedResponse,
  UpdateCommentParams,
} from 'frontend/types/task';

export default class CommentService extends APIService {
  // Get all comments for a task (paginated)
  getComments = async (
    accountId: string,
    taskId: string,
    token: string,
    page: number = 1,
    size: number = 20,
  ): Promise<ApiResponse<PaginatedResponse<Comment>>> =>
    this.apiClient.get(
      `/accounts/${accountId}/tasks/${taskId}/comments?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

  // Get a single comment
  getComment = async (
    accountId: string,
    taskId: string,
    commentId: string,
    token: string,
  ): Promise<ApiResponse<Comment>> =>
    this.apiClient.get(
      `/accounts/${accountId}/tasks/${taskId}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

  // Create a new comment
  createComment = async (
    accountId: string,
    taskId: string,
    token: string,
    params: CreateCommentParams,
  ): Promise<ApiResponse<Comment>> =>
    this.apiClient.post(
      `/accounts/${accountId}/tasks/${taskId}/comments`,
      params,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

  // Update a comment
  updateComment = async (
    accountId: string,
    taskId: string,
    commentId: string,
    token: string,
    params: UpdateCommentParams,
  ): Promise<ApiResponse<Comment>> =>
    this.apiClient.patch(
      `/accounts/${accountId}/tasks/${taskId}/comments/${commentId}`,
      params,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

  // Delete a comment
  deleteComment = async (
    accountId: string,
    taskId: string,
    commentId: string,
    token: string,
  ): Promise<ApiResponse<void>> =>
    this.apiClient.delete(
      `/accounts/${accountId}/tasks/${taskId}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
}

import APIService from 'frontend/services/api.service';
import { ApiResponse } from 'frontend/types';
import {
  CreateTaskParams,
  PaginatedResponse,
  Task,
  UpdateTaskParams,
} from 'frontend/types/task';

export default class TaskService extends APIService {
  // Get all tasks for an account (paginated)
  getTasks = async (
    accountId: string,
    token: string,
    page: number = 1,
    size: number = 10,
  ): Promise<ApiResponse<PaginatedResponse<Task>>> =>
    this.apiClient.get(`/accounts/${accountId}/tasks?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  // Get a single task
  getTask = async (
    accountId: string,
    taskId: string,
    token: string,
  ): Promise<ApiResponse<Task>> =>
    this.apiClient.get(`/accounts/${accountId}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  // Create a new task
  createTask = async (
    accountId: string,
    token: string,
    params: CreateTaskParams,
  ): Promise<ApiResponse<Task>> =>
    this.apiClient.post(`/accounts/${accountId}/tasks`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  // Update a task
  updateTask = async (
    accountId: string,
    taskId: string,
    token: string,
    params: UpdateTaskParams,
  ): Promise<ApiResponse<Task>> =>
    this.apiClient.patch(`/accounts/${accountId}/tasks/${taskId}`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  // Delete a task
  deleteTask = async (
    accountId: string,
    taskId: string,
    token: string,
  ): Promise<ApiResponse<void>> =>
    this.apiClient.delete(`/accounts/${accountId}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
}

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { H2, VerticalStackLayout } from 'frontend/components';
import routes from 'frontend/constants/routes';
import TaskService from 'frontend/services/task.service';
import { Task } from 'frontend/types/task';
import { getAccessTokenFromStorage } from 'frontend/utils/storage-util';

const taskService = new TaskService();

const Dashboard: React.FC = () => {
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [taskCount, setTaskCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = getAccessTokenFromStorage();

  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await taskService.getTasks(
          accessToken.accountId,
          accessToken.token,
          1,
          5,
        );
        setRecentTasks(response.data?.items || []);
        setTaskCount(response.data?.total_count || 0);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [accessToken?.accountId, accessToken?.token]);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <VerticalStackLayout>
        <H2>Dashboard</H2>

        {/* Stats Cards */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Total Tasks Card */}
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-boxdark">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-bodydark2">Total Tasks</p>
                <p className="text-3xl font-bold text-primary">
                  {isLoading ? '...' : taskCount}
                </p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <svg
                  className="h-8 w-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-boxdark">
            <p className="mb-4 text-sm text-bodydark2">Quick Actions</p>
            <Link
              to={routes.TASKS}
              className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Manage Tasks
            </Link>
          </div>

          {/* Welcome Card */}
          <div className="rounded-lg bg-gradient-to-r from-primary to-blue-600 p-6 text-white shadow-md">
            <p className="text-lg font-semibold">Welcome Back!</p>
            <p className="mt-2 text-sm opacity-90">
              Manage your tasks and stay organized.
            </p>
          </div>
        </div>

        {/* Recent Tasks Section */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-black dark:text-white">
              Recent Tasks
            </h3>
            <Link
              to={routes.TASKS}
              className="text-sm text-primary hover:underline"
            >
              View All →
            </Link>
          </div>

          {isLoading && (
            <div className="py-8 text-center text-bodydark2">Loading...</div>
          )}

          {!isLoading && recentTasks.length === 0 && (
            <div className="rounded-lg bg-white p-8 text-center shadow-md dark:bg-boxdark">
              <svg
                className="mx-auto h-12 w-12 text-bodydark2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="mt-4 text-bodydark2">No tasks yet</p>
              <Link
                to={routes.TASKS}
                className="mt-4 inline-block text-primary hover:underline"
              >
                Create your first task →
              </Link>
            </div>
          )}

          {!isLoading && recentTasks.length > 0 && (
            <div className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-boxdark">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-meta-4">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-bodydark2">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-bodydark2">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-strokedark">
                  {recentTasks.map((task) => (
                    <tr
                      key={task.id}
                      className="hover:bg-gray-50 dark:hover:bg-meta-4"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black dark:text-white">
                        {task.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-bodydark2">
                        {task.description.length > 50
                          ? `${task.description.substring(0, 50)}...`
                          : task.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </VerticalStackLayout>
    </div>
  );
};

export default Dashboard;

import { createBrowserRouter, Navigate } from 'react-router-dom'
import {
  DashboardPage,
  LoginPage,
  SignupPage,
  ForgetPasswordPage,
  ResetPasswordPage,
  AssetsPage,
  CreateAssetPage,
  AssetDetailPage,
  AssignmentsPage,
  UpdateAssetPage,
  AssignmentDetailPage,
  AllRequestTransferPage,
  RequestTransferDetailPage,
  CreateNewRequestTransferPage,
  ViewAllMaintenanceSchedulePage,
  CreateAssetMaintenanceSchedulePage,
} from '@/pages/dashboard'
import { ProtectedRoute, AuthRoute } from './auth-guard'
import Layout from '@/layout/layout'
import { AssignDepartmentForUserPage, AssignRoleForUserPage } from '@/pages/user'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: '',
            element: <Navigate to='/dashboard' />,
          },
          {
            path: 'assets',
            children: [
              {
                path: '',
                element: <AssetsPage />,
              },
              {
                path: 'create-asset',
                element: <CreateAssetPage />,
              },
              {
                path: ':id',
                element: <AssetDetailPage />,
              },
              {
                path: 'update/:id',
                element: <UpdateAssetPage />,
              },
              {
                path: 'maintenance-schedule',
                children: [
                  {
                    path: '',
                    element: <ViewAllMaintenanceSchedulePage />,
                  },
                  {
                    path: 'create',
                    element: <CreateAssetMaintenanceSchedulePage />,
                  },
                ],
              },
            ],
          },
          {
            path: 'assignments',
            children: [
              {
                path: '',
                element: <AssignmentsPage />,
              },
              {
                path: ':id',
                element: <AssignmentDetailPage />,
              },
            ],
          },
          {
            path: 'transfers',
            children: [
              {
                path: '',
                element: <AllRequestTransferPage />,
              },
              {
                path: ':id',
                element: <RequestTransferDetailPage />,
              },
              {
                path: 'create-request-transfer',
                element: <CreateNewRequestTransferPage />,
              },
            ],
          },
          {
            path: 'user',
            children: [
              {
                path: 'assign-role',
                element: <AssignRoleForUserPage />,
              },
              {
                path: 'assign-department',
                element: <AssignDepartmentForUserPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '',
    element: <AuthRoute />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'forget-password',
        element: <ForgetPasswordPage />,
      },
      {
        path: 'reset-password',
        element: <ResetPasswordPage />,
      },
    ],
  },
])

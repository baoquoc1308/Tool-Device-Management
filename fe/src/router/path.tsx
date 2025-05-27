import { createBrowserRouter } from 'react-router-dom'
import {
  DashboardPage,
  LoginPage,
  SignupPage,
  ForgetPasswordPage,
  ResetPasswordPage,
  AssetsPage,
  CreateAssetPage,
  AssetDetailPage,
} from '@/pages'
import { ProtectedRoute, AuthRoute } from './auth-guard'
import Layout from '@/layout/layout'
import UpdateAssetPage from '@/pages/update-asset-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute />,
        children: [
          {
            path: '',
            element: <DashboardPage />,
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

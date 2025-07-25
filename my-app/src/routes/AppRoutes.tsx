import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { HomePage } from '../pages/HomePage/HomePage';
import { LoanPage } from '../pages/LoanPage/LoanPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { LoanIdPage } from '../pages/LoanIdPage/LoanIdPage';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'loan', element: <LoanPage /> },
      {
        path: 'loan/:applicationId',
        element: (
          <ProtectedRoute requiredStatus="APPROVED">
            <LoanIdPage />
          </ProtectedRoute>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

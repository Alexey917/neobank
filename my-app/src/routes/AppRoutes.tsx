import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { HomePage } from '../pages/HomePage/HomePage';
import { LoanPage } from '../pages/LoanPage/LoanPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { LoanIdPage } from '../pages/LoanIdPage/LoanIdPage';
import { ProtectedRoute } from '../hoc/ProtectedRoute/ProtectedRoute';
import { LoanDocPage } from '../pages/LoanDocPage/LoanDocPage';
import { SignPage } from '../pages/SignPage/SignPage';
import { LoanCodePage } from '../pages/LoanCodePage/LoanCodePage';

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
      {
        path: 'loan/:applicationId/document',
        element: (
          <ProtectedRoute requiredStatus="CC_DENIED">
            <LoanDocPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'loan/:applicationId/document/sign',
        element: (
          <ProtectedRoute requiredStatus="PREPARE_DOCUMENTS">
            <SignPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'loan/:applicationId/code',
        element: (
          <ProtectedRoute requiredStatus="DOCUMENT_CREATED">
            <LoanCodePage />
          </ProtectedRoute>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

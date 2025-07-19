import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { HomePage } from '../pages/HomePage/HomePage';
import { LoanPage } from '../pages/LoanPage/LoanPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'loan', element: <LoanPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

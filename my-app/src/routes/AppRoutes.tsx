import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { HomePage } from '../pages/HomePage/HomePage';
import { Loan } from '../pages/Loan/Loan';
import { PageNotFound } from '../pages/PageNotFound/PageNotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'loan', element: <Loan /> },
      { path: '*', element: <PageNotFound /> },
    ],
  },
]);

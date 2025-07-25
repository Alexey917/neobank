import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../../redux/features/tabs/store';
import { Loader } from '../../components/UI/Loader/Loader';
import { ReactNode } from 'react';
import { useParams } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredStatus?: string;
}

export const ProtectedRoute = ({
  children,
  requiredStatus,
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { applicationId } = useParams();
  const { activeStep, loading } = useSelector(
    (state: RootState) => state.steps,
  );

  const offers = localStorage.getItem('offers');
  let id;

  if (offers) id = JSON.parse(offers)[0].applicationId;

  if (loading) return <Loader />;

  if (applicationId && applicationId == id) return children;

  if (requiredStatus && activeStep !== requiredStatus)
    return <Navigate to="/" state={{ from: location }} replace />;
};

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../../redux/features/tabs/store';
import { Loader } from '../../components/UI/Loader/Loader';
import { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { STEP_ORDER, stepId } from '../../redux/features/tabs/type';

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

  if (
    requiredStatus &&
    STEP_ORDER[activeStep as stepId] < STEP_ORDER[requiredStatus as stepId]
  )
    return <Navigate to="/" state={{ from: location }} replace />;

  if (applicationId && applicationId == id) return children;
};

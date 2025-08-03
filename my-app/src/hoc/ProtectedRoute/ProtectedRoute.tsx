import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../../redux/features/tabs/store';
import { Loader } from '../../components/UI/Loader/Loader';
import { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { STEP_ORDER, stepId } from '../../redux/features/tabs/type';

import classes from './ProtectedRoute.module.scss';

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

  if (loading)
    return (
      <div className={classes.spinner}>
        <Loader />
      </div>
    );

  if (
    requiredStatus &&
    STEP_ORDER[activeStep as stepId] < STEP_ORDER[requiredStatus as stepId]
  ) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else if (applicationId && applicationId == id) {
    return children;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

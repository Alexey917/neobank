import React, { useEffect, useState } from 'react';
import { LoanDocument } from '../../components/LoanDocument/LoanDocument';
import { getSchedule } from '../../API/api';
import { ISchedule } from '../../types/types';
import { Loader } from '../../components/UI/Loader/Loader';
import { useSelector } from 'react-redux';
import { Message } from '../../components/Message/Message';
import { STEP_ORDER } from '../../redux/features/steps/type';
import { getStep } from '../../redux/features/store';

import classes from './LoanDocPage.module.scss';

export const LoanDocPage = () => {
  const [schedule, setSchedule] = useState<ISchedule[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { activeStep } = useSelector(getStep);

  const getData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = localStorage.getItem('offers');
      if (!data?.trim()) {
        setError('No offers data found');
        return;
      }

      const offers = JSON.parse(data);
      if (!offers?.length || !offers[0].applicationId) {
        setError('Invalid offers data structure');
        return;
      }

      const response = await getSchedule(offers[0].applicationId);

      if (!response?.data?.credit?.paymentSchedule) {
        setError('Invalid response structure');
        return;
      }

      setSchedule(response.data.credit.paymentSchedule);
    } catch (err) {
      console.error('Failed to load schedule:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className={classes.main} aria-labelledby="loan-document-title">
      {isLoading ? (
        <div role="status" aria-live="polite" className={classes.spinner}>
          <Loader />
        </div>
      ) : error ? (
        <div role="alert" aria-live="assertive" className={classes.error}>
          <p>Error: {error}</p>
        </div>
      ) : STEP_ORDER[activeStep] >= STEP_ORDER['PREPARE_DOCUMENTS'] ? (
        <Message
          title="Documents are formed"
          variant="primary"
          text="Documents for signing will be sent to your email"
        />
      ) : (
        <LoanDocument schedule={schedule} />
      )}
    </main>
  );
};

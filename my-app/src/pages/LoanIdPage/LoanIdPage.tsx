import React, { useEffect } from 'react';
import { ScoringForm } from '../../components/ScoringForm/ScoringForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/features/tabs/store';
import { store } from '../../redux/features/tabs/store';
import { IOffer } from '../../types/types';
import { checkStatus } from '../../redux/features/tabs/statusThunks';
import { Loader } from '../../components/UI/Loader/Loader';

import classes from './LoanIdPage.module.scss';
import { Message } from '../../components/Message/Message';

export const LoanIdPage = () => {
  const { activeStep } = useSelector((state: RootState) => state.steps);

  return (
    <main className={classes.main}>
      {activeStep === 'CC_APPROVED' ||
      activeStep === 'CC_DENIED' ||
      activeStep === 'DOCUMENT_CREATED' ? (
        <Message
          title="Wait for a decision on the application"
          text="The answer will come to your mail within 10 minutes"
          variant="primary"
        />
      ) : (
        <ScoringForm />
      )}
    </main>
  );
};

import React from 'react';
import { ScoringForm } from '../../components/ScoringForm/ScoringForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/features/tabs/store';

import classes from './LoanIdPage.module.scss';
import { Message } from '../../components/Message/Message';

export const LoanIdPage = () => {
  const { activeStep } = useSelector((state: RootState) => state.steps);
  return (
    <main className={classes.main}>
      {activeStep === 'CC_DENIED' ? (
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

import React from 'react';
import { ScoringForm } from '../../components/ScoringForm/ScoringForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/features/store';
import { STEP_ORDER } from '../../redux/features/steps/type';
import { getStep } from '../../redux/features/store';

import classes from './LoanIdPage.module.scss';
import { Message } from '../../components/Message/Message';

export const LoanIdPage = () => {
  const { activeStep } = useSelector(getStep);

  return (
    <main className={classes.main}>
      {STEP_ORDER[activeStep] >= STEP_ORDER['CC_APPROVED'] ? (
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

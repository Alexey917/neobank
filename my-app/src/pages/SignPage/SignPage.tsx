import React, { useState } from 'react';
import { SignDoc } from '../..//components/SignDoc/SignDoc';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/features/tabs/store';
import { Message } from '../../components/Message/Message';
import { STEP_ORDER } from '../../redux/features/tabs/type';

import classes from './SignPage.module.scss';

export const SignPage = () => {
  const { activeStep } = useSelector((state: RootState) => state.steps);

  return (
    <main className={classes.main} aria-labelledby="loan-document-title">
      {STEP_ORDER[activeStep] >= STEP_ORDER['DOCUMENT_CREATED'] ? (
        <Message
          title="Documents have been successfully signed and sent for approval"
          text="Within 10 minutes you will be sent a PIN code to your email for confirmation"
          variant="sign"
        />
      ) : (
        <SignDoc />
      )}
    </main>
  );
};

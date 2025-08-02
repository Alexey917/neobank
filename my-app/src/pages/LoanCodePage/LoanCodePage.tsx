import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/features/tabs/store';
import { LoanCode } from '../../components/LoanCode/LoanCode';

import classes from './LoanCodePage.module.scss';

export const LoanCodePage = () => {
  const { activeStep } = useSelector((state: RootState) => state.steps);

  return (
    <main className={classes.main} aria-labelledby="loan-document-title">
      {/* {activeStep === 'DOCUMENT_CREATED' ? (
        <Message
          title="Documents have been successfully signed and sent for approval"
          text="Within 10 minutes you will be sent a PIN code to your email for confirmation"
          variant="primary"
        />
      ) : (
        <SignDoc />
      )} */}
      <LoanCode count={4} />
    </main>
  );
};

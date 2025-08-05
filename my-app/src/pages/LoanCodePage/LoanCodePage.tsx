import React from 'react';
import { useSelector } from 'react-redux';
import { getStep } from '../../redux/features/store';
import { LoanCode } from '../../components/LoanCode/LoanCode';
import { Message } from '../../components/Message/Message';

import classes from './LoanCodePage.module.scss';
import congratulations from '../../assets/images/offerBox.webp';

export const LoanCodePage = () => {
  const { activeStep } = useSelector(getStep);

  return (
    <main className={classes.main} aria-labelledby="loan-code-title">
      {activeStep === 'CREDIT_ISSUED' ? (
        <Message
          title="Congratulations! You have completed your new credit card."
          text="Your credit card will arrive soon. Thank you for choosing us!"
          variant="primary"
          btn={true}
          img={congratulations}
        />
      ) : (
        <LoanCode count={4} />
      )}
    </main>
  );
};

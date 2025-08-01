import React from 'react';
import { SignDoc } from '../..//components/SignDoc/SignDoc';

import classes from './SignPage.module.scss';

export const SignPage = () => {
  return (
    <main className={classes.main} aria-labelledby="loan-document-title">
      <SignDoc />
    </main>
  );
};

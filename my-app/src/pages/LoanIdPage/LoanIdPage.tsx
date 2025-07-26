import React from 'react';
import { ScoringForm } from '../../components/ScoringForm/ScoringForm';

import classes from './LoanIdPage.module.scss';

export const LoanIdPage = () => {
  return (
    <main className={classes.main}>
      <ScoringForm />
    </main>
  );
};

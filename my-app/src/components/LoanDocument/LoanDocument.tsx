import React from 'react';

import classes from './LoanDocument.module.scss';

export const LoanDocument = () => {
  return (
    <form>
      <div className={classes.form__legendWrapper}>
        <legend className={classes.form__legend}>
          Continuation of the application
        </legend>
        <p className={classes.form__step}>Step 2 of 5</p>
      </div>
    </form>
  );
};

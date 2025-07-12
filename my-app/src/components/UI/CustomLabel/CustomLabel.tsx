import React, { FC } from 'react';

import classes from './CustomLabel.module.scss';

interface ICustomLabel {
  text: string;
  required: boolean;
  inputId: string;
}

export const CustomLabel: FC<ICustomLabel> = ({ text, required, inputId }) => {
  return (
    <label htmlFor={inputId} className={classes.label}>
      {text} {required ? <span className={classes.required}>*</span> : ''}
    </label>
  );
};

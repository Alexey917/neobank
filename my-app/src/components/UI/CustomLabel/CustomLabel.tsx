import React, { FC, ReactNode } from 'react';

import classes from './CustomLabel.module.scss';

interface ICustomLabel {
  text: string;
  required: boolean;
  inputId: string;
  children: ReactNode;
}

export const CustomLabel: FC<ICustomLabel> = ({
  text,
  required,
  inputId,
  children,
}) => {
  return (
    <label htmlFor={inputId} className={classes.label}>
      {text} {required ? <span className={classes.required}>*</span> : ''}
      {children}
    </label>
  );
};

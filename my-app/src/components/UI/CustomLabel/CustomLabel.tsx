import React, { FC } from 'react';

import classes from './CustomLabel.module.scss';

interface ICustomLabel {
  text: string;
  required: boolean;
  inputId: string;
  variant?: string;
}

export const CustomLabel: FC<ICustomLabel> = ({
  text,
  required,
  inputId,
  variant,
}) => {
  return (
    <label
      htmlFor={inputId}
      className={`${classes.label} ${variant && classes.label_checkbox}`}
      aria-required={required}
    >
      {text}{' '}
      {required && (
        <span className={classes.required} aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
};

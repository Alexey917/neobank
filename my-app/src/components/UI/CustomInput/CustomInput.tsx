import React, { FC } from 'react';

import classes from './CustomInput.module.scss';

interface ICustomInput {
  width: number;
  type: string;
  variant: 'primary' | 'amount';
  placeholder?: string;
}

export const CustomInput: FC<ICustomInput> = ({
  width,
  type,
  variant,
  placeholder,
}) => {
  return (
    <input
      type={type}
      style={{ width: `${width}` }}
      className={classes[variant]}
      placeholder={placeholder}
    />
  );
};

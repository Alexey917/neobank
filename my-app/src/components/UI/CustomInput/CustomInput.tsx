import React, { FC } from 'react';

import classes from './CustomInput.module.scss';

interface ICustomInput {
  width: number;
  type: string;
  variant: 'primary' | 'amount';
  placeholder?: string;
  value?: number;
  onChange?: (elem: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}

export const CustomInput: FC<ICustomInput> = ({
  width,
  type,
  variant,
  placeholder,
  value,
  onChange,
  id,
}) => {
  return (
    <input
      type={type}
      style={{ width: `${width}rem` }}
      className={`${classes[variant]} ${classes.input}`}
      placeholder={placeholder}
      value={value} //`${value} ₽`
      onChange={onChange}
      id={id}
    />
  );
};

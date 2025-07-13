import React, { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import classes from './CustomInput.module.scss';
import error from '../../../assets/sprite.svg';
import ok from '../../../assets/sprite.svg';

interface ICustomInput {
  width: number;
  type: string;
  variant: 'primary' | 'amount';
  placeholder?: string;
  value?: number;
  onChange?: (elem: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  register?: UseFormRegisterReturn;
  svgError?: boolean;
  svgSuccess?: boolean;
}

export const CustomInput: FC<ICustomInput> = ({
  width,
  type,
  variant,
  placeholder,
  value,
  onChange,
  id,
  register,
  svgError,
  svgSuccess,
}) => {
  console.log({ ...register });

  return (
    <div className={classes.wrapper}>
      <input
        type={type}
        style={{ width: `${width}rem` }}
        className={`${classes[variant]} ${classes.input} ${
          svgError ? classes.error : ''
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={id}
        {...register}
      />
      <svg
        className={`${classes.error__icon} ${!svgError ? classes.hidden : ''}`}
      >
        <use href={error + '#error'}></use>
      </svg>
      <svg
        className={`${classes.ok__icon} ${!svgSuccess ? classes.hidden : ''}`}
      >
        <use href={ok + '#ok'}></use>
      </svg>
    </div>
  );
};

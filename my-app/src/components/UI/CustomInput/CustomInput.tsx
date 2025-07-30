import React, { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import classes from './CustomInput.module.scss';
import error from '../../../assets/sprite.svg';
import ok from '../../../assets/sprite.svg';

interface ICustomInput {
  width: number;
  type: string;
  variant: 'primary' | 'amount' | 'checkbox';
  placeholder?: string;
  value?: number;
  onChange?: (elem: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  register?: UseFormRegisterReturn;
  svgError?: boolean;
  svgSuccess?: boolean;
  disabled?: boolean;
  required?: boolean;
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
  required = false,
}) => {
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
        aria-invalid={svgError ? 'true' : 'false'}
        aria-required={required}
        aria-describedby={id ? `${id}-description` : undefined}
        {...register}
      />

      {svgError && (
        <svg
          className={
            width === 38
              ? classes.error__iconL
              : width === 25.0625
              ? classes.error__iconM
              : classes.error__icon
          }
          aria-hidden="true"
          focusable="false"
        >
          <use href={error + '#error'}></use>
        </svg>
      )}

      <svg
        className={
          width === 38
            ? classes.ok__iconL
            : width === 25.0625
            ? classes.ok__iconM
            : classes.ok__icon
        }
        aria-hidden="true"
        focusable="false"
      >
        <use href={ok + '#ok'}></use>
      </svg>
    </div>
  );
};

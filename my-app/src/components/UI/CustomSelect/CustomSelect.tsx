import React, { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import classes from './CustomSelect.module.scss';

interface ICustomSelect {
  options: number[];
  value?: number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  width: number;
  register?: UseFormRegisterReturn;
}

export const CustomSelect: FC<ICustomSelect> = ({
  options,
  value,
  onChange,
  width,
  register,
}) => {
  return (
    <select
      className={classes.select}
      value={value}
      {...register}
      onChange={onChange}
      style={{ width: `${width}rem` }}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option + ' month'}
        </option>
      ))}
    </select>
  );
};

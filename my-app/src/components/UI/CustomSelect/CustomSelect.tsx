import React, { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { ICustomizeOptions } from '../../../types/types';

import classes from './CustomSelect.module.scss';

interface ICustomSelect {
  options: ICustomizeOptions[];
  value?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  width: number;
  register?: UseFormRegisterReturn;
  disabled?: boolean; // Добавлено для контроля состояния
  required?: boolean; // Добавлено для семантики
}

export const CustomSelect: FC<ICustomSelect> = ({
  options,
  value,
  onChange,
  width,
  register,
  required = false,
}) => {
  return (
    <select
      className={classes.select}
      value={value}
      {...register}
      onChange={onChange}
      style={{ width: `${width}rem` }}
      aria-required={required} // Для скринридеров
      aria-invalid={register?.name ? false : undefined} // Для валидации
    >
      {options.map((option) => (
        <option
          key={option.key}
          value={option.key}
          aria-selected={value === option.key}
        >
          {option.value}
        </option>
      ))}
    </select>
  );
};

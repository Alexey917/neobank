import React, { FC, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { ICustomizeOptions } from '../../../types/types';

import classes from './CustomSelect.module.scss';

interface ICustomSelect {
  options: ICustomizeOptions[];
  width: number;
  register?: UseFormRegisterReturn;
  disabled?: boolean; // Добавлено для контроля состояния
  required?: boolean; // Добавлено для семантики
  error: string;
}

export const CustomSelect: FC<ICustomSelect> = ({
  options,
  width,
  register,
  required = false,
  error,
}) => {
  const [option, setOption] = useState<string | number>(
    options[0].value === '6 month' ? options[0].value : '',
  );

  const handleOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value);
  };

  return (
    <>
      <select
        className={`${classes.select} ${required ? classes.error : ''}`}
        value={option}
        {...register}
        onChange={handleOption}
        style={{ width: `${width}rem` }}
        aria-required={required} // Для скринридеров
        aria-invalid={register?.name ? false : undefined} // Для валидации
      >
        {options.map((option) => (
          <option
            key={option.key}
            value={option.key}
            // aria-selected={option.value}
          >
            {option.value}
          </option>
        ))}
      </select>
      {error && (
        <span className={classes.errorMessage} role="alert">
          {error}
        </span>
      )}
    </>
  );
};

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
  defaultValue: string;
}

export const CustomSelect: FC<ICustomSelect> = ({
  options,
  width,
  register,
  required,
  defaultValue,
}) => {
  const [option, setOption] = useState<string | number>(defaultValue);

  const handleOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value);
  };

  return (
    <>
      <select
        className={`${classes.select} ${required ? classes.error : ''}`}
        value={option}
        defaultValue={defaultValue}
        {...register}
        onChange={handleOption}
        style={{ width: `${width}rem` }}
        aria-required={required} // Для скринридеров
        aria-invalid={register?.name ? false : undefined} // Для валидации
      >
        {!defaultValue && <option value="" hidden></option>}
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
    </>
  );
};

import React, { FC } from 'react';

import classes from './CustomSelect.module.scss';

interface ICustomSelect {
  options: string[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  width: number;
}

export const CustomSelect: FC<ICustomSelect> = ({
  options,
  value,
  onChange,
  width,
}) => {
  return (
    <select
      className={classes.select}
      value={value}
      onChange={onChange}
      style={{ width: `${width}rem` }}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

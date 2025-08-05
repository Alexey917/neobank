import React, { FC } from 'react';

import classes from './Checkbox.module.scss';

interface ICheckBox {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: FC<ICheckBox> = ({ id, checked, onChange }) => {
  return (
    <div className={classes.wrapper}>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
    </div>
  );
};

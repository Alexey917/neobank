import { FC } from 'react';

import classes from './CustomButton.module.scss';

interface ICustomButton {
  text: string;
  color?: string;
  paddings?: string;
}

export const CustomButton: FC<ICustomButton> = ({
  text,
  paddings = 'defaultPaddings',
  color = 'defaultColor',
}) => {
  return (
    <button
      className={`${classes.button} ${classes[color]} ${classes[paddings]}`}
    >
      {text}
    </button>
  );
};

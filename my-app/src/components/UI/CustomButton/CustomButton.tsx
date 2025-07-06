import { FC } from 'react';

import classes from './CustomButton.module.scss';

export interface ICustomButton {
  text: string;
  color?: string;
  paddings?: string;
  bgColor?: string;
  onClick?: () => void;
}

export const CustomButton: FC<ICustomButton> = ({
  text,
  paddings = 'defaultPaddings',
  bgColor = 'defaultBgColor',
  color = 'defaultColor',
  onClick,
}) => {
  return (
    <button
      className={`${classes.button} ${classes[bgColor]} ${classes[color]} ${classes[paddings]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

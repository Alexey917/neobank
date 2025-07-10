import { FC } from 'react';

import classes from './CustomButton.module.scss';

type buttonVariant = 'primary' | 'tab' | 'danger';
type buttonPaddings = 'pTab' | 'pPrimary' | 'pBack';

export interface ICustomButton {
  text: string;
  paddings: buttonPaddings;
  variant: buttonVariant;
  onClick?: () => void;
}

export const CustomButton: FC<ICustomButton> = ({
  text,
  paddings,
  variant,
  onClick,
}) => {
  return (
    <button
      className={`${classes.button} ${classes[paddings]} ${classes[variant]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

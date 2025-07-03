import { FC } from 'react';
import classes from './Tooltip.module.scss';

interface TooltipProps {
  text: string;
}

export const Tooltip: FC<TooltipProps> = ({ text }) => {
  return (
    <>
      <span className={classes.creditCard__tooltip}>{text}</span>
    </>
  );
};

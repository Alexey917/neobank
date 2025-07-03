import { FC } from 'react';
import classes from './Tooltip.module.scss';

interface TooltipProps {
  text: string;
  display: boolean;
}

export const Tooltip: FC<TooltipProps> = ({ text, display }) => {
  return (
    <>
      <span
        className={`${classes.creditCard__tooltip} ${
          display ? classes.creditCard__tooltipShow : ''
        }`}
      >
        {text}
      </span>
    </>
  );
};

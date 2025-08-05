import { FC } from 'react';
import classes from './Tooltip.module.scss';

interface TooltipProps {
  text: string;
  display: boolean;
  id: string;
  role: string;
}

export const Tooltip: FC<TooltipProps> = ({ text, display, id, role }) => {
  return (
    <>
      <span
        className={`${classes.creditCard__tooltip} ${
          display ? classes.creditCard__tooltipShow : ''
        }`}
        id={id}
        role={role}
      >
        {text}
      </span>
    </>
  );
};

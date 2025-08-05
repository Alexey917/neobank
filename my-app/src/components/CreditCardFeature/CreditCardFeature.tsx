import { FC, useRef } from 'react';
import classes from './CreditFeature.module.scss';
import { Tooltip } from '../UI/Tooltip/Tooltip';
import { useTooltip } from '../../hooks/useTooltip';

interface CreditCardFeatureProps {
  title: string;
  text: string;
  tooltipText: string;
}

export const CreditCardFeature: FC<CreditCardFeatureProps> = ({
  title,
  text,
  tooltipText,
}) => {
  const liRef = useRef<HTMLLIElement>(null);
  const openTooltip = useTooltip(liRef);

  return (
    <li
      className={classes.creditCard__listItem}
      ref={liRef}
      aria-describedby={`tooltip-${title}`}
    >
      <p className={classes.creditCard__listItemTitle}>{title}</p>
      <p className={classes.creditCard__listItemText}>{text}</p>
      <Tooltip
        text={tooltipText}
        display={window.innerWidth > 992 ? openTooltip : false}
        id={`tooltip-${title}`}
        role="tooltip"
      />
    </li>
  );
};

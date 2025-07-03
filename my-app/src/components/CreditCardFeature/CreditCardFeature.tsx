import { FC } from 'react';
import classes from './CreditFeature.module.scss';
import { Tooltip } from '../UI/Tooltip/Tooltip';

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
  return (
    <li className={classes.creditCard__listItem}>
      <p className={classes.creditCard__listItemTitle}>{title}</p>
      <p className={classes.creditCard__listItemText}>{text}</p>
      <Tooltip text={tooltipText} />
    </li>
  );
};

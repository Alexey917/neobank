import { FC } from 'react';

import classes from './FeatureItem.module.scss';
import success from '../../assets/sprite.svg';

interface IFeatureITemProps {
  text: string;
}

export const FeatureItem: FC<IFeatureITemProps> = ({ text }) => {
  return (
    <li className={classes.features__item}>
      <svg className={classes.features__icon}>
        <use href={success + '#success'}></use>
      </svg>
      <p className={classes.features__item_text}>{text}</p>
    </li>
  );
};

import { FC } from 'react';

import classes from './ChooseCardImage.module.scss';
import card1 from '../../assets/images/card1.png';
import card2 from '../../assets/images/card2.png';
import card3 from '../../assets/images/card3.webp';
import card4 from '../../assets/images/card4.webp';

export const ChooseCardImage: FC = () => {
  return (
    <figure
      className={classes.chooseCard__imgWrapper}
      aria-label="Credit card designs"
    >
      <img
        src={card1}
        alt="Classic credit card design"
        className={classes.chooseCard__img}
      />
      <img
        src={card2}
        alt="Gold credit card design"
        className={classes.chooseCard__img}
      />
      <img
        src={card3}
        alt="Platinum credit card design"
        className={classes.chooseCard__img}
      />
      <img
        src={card4}
        alt="Black edition credit card design"
        className={classes.chooseCard__img}
      />
    </figure>
  );
};

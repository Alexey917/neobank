import { FC } from 'react';
import { CustomLink } from '../UI/CustomLink/CustomLink';
import { ChooseCardImage } from '../ChooseCardImage/ChooseCardImage';

import classes from './Choose.module.scss';

export const ChooseCard: FC = () => {
  return (
    <section
      className={classes.chooseCard}
      aria-labelledby="chooseCard-heading"
    >
      <article className={classes.chooseCard__article}>
        <h1 className={classes.chooseCard__title} id="chooseCard-heading">
          Choose the design you like and apply for card right now
        </h1>
        <CustomLink
          aria-label="Choose a card in online bank"
          to="chooseCard"
          variant="primary"
          paddings="pPrimary"
        >
          <span className={classes.button_text}>Choose the card</span>
        </CustomLink>
      </article>

      <ChooseCardImage />
    </section>
  );
};

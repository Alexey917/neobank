import { FC } from 'react';
import { OnlineBank } from '../UI/OnlineBank/OnlineBank';
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
        <OnlineBank
          aria-label="Choose a card in online bank"
          to="chooseCard"
          className={classes.link}
        >
          <span className={classes.button_text}>Choose the card</span>
        </OnlineBank>
      </article>

      <ChooseCardImage />
    </section>
  );
};

import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../UI/Button/Button';
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
        <Button
          as={Link}
          to="onlineBank"
          className={classes.link}
          aria-label="Choose a card in online bank"
        >
          <span className={classes.button_text}>Choose the card</span>
        </Button>
      </article>

      <ChooseCardImage />
    </section>
  );
};

import { CustomButton } from '../UI/CustomButton/CustomButton';

import classes from './CreditCard.module.scss';
import creditCardImg from '../../assets/images/creditCard.webp';
import { CreditCardFeature } from '../CreditCardFeature/CreditCardFeature';

export const CreditCard = () => {
  return (
    <section className={classes.creditCard}>
      <article className={classes.creditCard__info}>
        <h1 className={classes.creditCard__title}>
          Platinum digital credit card
        </h1>

        <p className={classes.creditCard__text}>
          Our best credit card. Suitable for everyday spending and shopping.
          Cash withdrawals and transfers without commission and interest.
        </p>

        <ul className={classes.creditCard__list}>
          <CreditCardFeature
            title="Up to 160 days"
            text="No percent"
            tooltipText="When repaying the full
debt up to 160 days."
          />
          <CreditCardFeature
            title="Up to 600 000 ₽"
            text="Credit limit"
            tooltipText="Over the limit willaccrue percent"
          />
          <CreditCardFeature
            title="0 ₽"
            text="Card service is free"
            tooltipText="Promotion valid until December 31, 2022."
          />
        </ul>

        <CustomButton text="Apply for card" />
      </article>

      <figure className={classes.creditCard__imgWrapper}>
        <img
          className={classes.creditCard__img}
          src={creditCardImg}
          alt="Platinum digital credit card"
        />
      </figure>
    </section>
  );
};

import { CustomButton } from '../UI/CustomButton/CustomButton';

import classes from './CreditCard.module.scss';
import creditCardImg from '../../assets/images/creditCard.webp';

export const CreditCard = () => {
  return (
    <section className={classes.creditCard}>
      <article>
        <h1>Platinum digital credit card</h1>
        <p>
          Our best credit card. Suitable for everyday spending and shopping.
          Cash withdrawals and transfers without commission and interest.
        </p>
        <ul>
          <li>
            <p>Up to 160 days</p>
            <p>No percent</p>
            <span>When repaying the full debt up to 160 days.</span>
          </li>

          <li>
            <p>Up to 160 days</p>
            <p>No percent</p>
            <span>Over the limit willaccrue percent</span>
          </li>

          <li>
            <p>0 ₽</p>
            <p>Card service is free</p>
            <span>Promotion valid until December 31, 2022.</span>
          </li>
        </ul>
        <CustomButton text="Apply for card" />
      </article>
      <figure>
        <img src={creditCardImg} alt="Platinum digital credit card" />
      </figure>
    </section>
  );
};

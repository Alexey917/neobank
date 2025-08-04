import { FC } from 'react';
import { CreditCardFeature } from '../CreditCardFeature/CreditCardFeature';
import { CustomButton } from '../UI/CustomButton/CustomButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/features/store';

import classes from './CreditCard.module.scss';
import creditCardImg from '../../assets/images/creditCard.webp';

const CREDIT_CARD_FEATURE = [
  {
    title: 'Up to 160 days',
    text: 'No percent',
    tooltipText: 'When repaying the full debt up to 160 days.',
  },
  {
    title: 'Up to 600 000 ₽',
    text: 'Credit limit',
    tooltipText: 'Over the limit willaccrue percent',
  },
  {
    title: '0 ₽',
    text: 'Card service is free',
    tooltipText: 'Promotion valid until December 31, 2022.',
  },
];

interface ICreditCardProps {
  scrollToForm: () => void;
}

export const CreditCard: FC<ICreditCardProps> = ({ scrollToForm }) => {
  const activeTab = useSelector((state: RootState) => state.tabs.activeTab);
  const activeStep = useSelector((state: RootState) => state.steps.activeStep);

  return (
    <section className={classes.creditCard} aria-label="Credit card details">
      <article className={classes.creditCard__info}>
        <h1 className={classes.creditCard__title}>
          Platinum digital credit card
        </h1>

        <p className={classes.creditCard__text}>
          Our best credit card. Suitable for everyday spending and shopping.
          Cash withdrawals and transfers without commission and interest.
        </p>

        <ul className={classes.creditCard__list}>
          {CREDIT_CARD_FEATURE.map((item) => (
            <CreditCardFeature key={item.title} {...item} />
          ))}
        </ul>

        <CustomButton
          text={
            activeStep === 'BEGIN'
              ? 'Apply for card'
              : activeStep === 'PREAPPROVAL'
              ? 'Choose an offer'
              : 'Continue registration'
          }
          aria-label="Apply for platinum card"
          variant="primary"
          paddings={
            activeStep === 'APPROVED' ? 'pContinueRegistration' : 'pPrimary'
          }
          onClick={scrollToForm}
        />
      </article>

      <figure className={classes.creditCard__imgWrapper}>
        <img
          className={`${classes.creditCard__img} ${
            activeTab !== 'About card' && classes.rotate_img
          }`}
          src={creditCardImg}
          alt="Platinum digital credit card"
        />
      </figure>
    </section>
  );
};

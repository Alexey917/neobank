import { useRef } from 'react';

import { CreditCardDetails } from '../../components/creditCardDetails/creditCardDetails';
import { CreditCard } from '../../components/CreditCard/CreditCard';
import { HowToGetACard } from '../../components/HowToGetACard/HowToGetACard';
import classes from './Loan.module.scss';

export const Loan = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const scrollToForm = () => {
    if (formRef.current) {
      window.scrollTo({
        top: formRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <main className={classes.main}>
      <CreditCard scrollToForm={scrollToForm} />
      <CreditCardDetails />
      <HowToGetACard formRef={formRef} />
    </main>
  );
};

import { useRef } from 'react';

import { CreditCardDetails } from '../../components/creditCardDetails/creditCardDetails';
import { CreditCard } from '../../components/CreditCard/CreditCard';
import { HowToGet } from '../../components/HowToGet/HowToGet';
import classes from './LoanPage.module.scss';

export const LoanPage = () => {
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
      <HowToGet formRef={formRef} />
    </main>
  );
};

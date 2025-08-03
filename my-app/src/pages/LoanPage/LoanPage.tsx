import { useRef } from 'react';
import { CreditCardDetails } from '../../components/creditCardDetails/creditCardDetails';
import { CreditCard } from '../../components/CreditCard/CreditCard';
import { HowToGet } from '../../components/HowToGet/HowToGet';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/features/tabs/store';

import classes from './LoanPage.module.scss';

export const LoanPage = () => {
  const activeStep = useSelector((state: RootState) => state.steps.activeStep);
  const formRef = useRef<HTMLFormElement>(null);
  const offerRef = useRef<HTMLElement>(null);
  const checkEmailRef = useRef<HTMLElement>(null);

  const scrollToForm = () => {
    if (activeStep === 'BEGIN') {
      formRef.current &&
        window.scrollTo({
          top: formRef.current.offsetTop,
          behavior: 'smooth',
        });
    } else if (activeStep === 'PREAPPROVAL') {
      offerRef.current &&
        window.scrollTo({
          top: offerRef.current.offsetTop,
          behavior: 'smooth',
        });
    } else {
      checkEmailRef.current &&
        window.scrollTo({
          top: checkEmailRef.current.offsetTop,
          behavior: 'smooth',
        });
    }
  };

  return (
    <main className={classes.main}>
      <CreditCard scrollToForm={scrollToForm} />
      <CreditCardDetails />
      <HowToGet
        formRef={formRef}
        offerRef={offerRef}
        checkEmailRef={checkEmailRef}
      />
    </main>
  );
};

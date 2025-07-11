import { CreditCardDetails } from '../../components/creditCardDetails/creditCardDetails';
import { CreditCard } from '../../components/CreditCard/CreditCard';
import { HowToGetACard } from '../../components/HowToGetACard/HowToGetACard';
import classes from './Loan.module.scss';

export const Loan = () => {
  return (
    <main className={classes.main}>
      <CreditCard />
      <CreditCardDetails />
      <HowToGetACard />
    </main>
  );
};

import React, { FC, RefObject } from 'react';
import { CardOffer } from '../CardOffer/CardOffer';

import classes from './LoanOffers.module.scss';
import { IOffer } from 'src/types/types';

interface ILoanOffers {
  offerRef?: RefObject<HTMLElement | null>;
}

export const LoanOffers: FC<ILoanOffers> = ({ offerRef }) => {
  const data: IOffer[] = JSON.parse(localStorage.getItem('offers')!);

  return (
    <section
      className={classes.loanOffer}
      aria-label="Loan offers"
      ref={offerRef}
    >
      {data &&
        data.map((item) => <CardOffer key={item.monthlyPayment} item={item} />)}
    </section>
  );
};

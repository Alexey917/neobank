import { Tabs } from '../UI/Tabs/Tabs';
import { CreditTabContent } from '../CreditTabContent/CreditTabContent';
import { Divider } from '../UI/Divider/Divider';
import { TabId } from '../../redux/features/tabs/type';
import { FC } from 'react';

import classes from './creditCardDetails.module.scss';

const TABS: TabId[] = ['About card', 'Rates and conditions', 'Cashback', 'FAQ'];

export const CreditCardDetails: FC = () => {
  return (
    <section
      className={classes.details}
      aria-label="more information about the card"
    >
      <Tabs text={TABS} />
      <Divider
        type="tabs"
        width={81.25}
        orientation="horizontal"
        thickness={0.125}
        variant="solid"
        color="grey"
      />
      <CreditTabContent />
    </section>
  );
};

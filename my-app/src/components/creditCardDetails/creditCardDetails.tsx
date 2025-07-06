import { Tabs } from '../UI/Tabs/Tabs';
import { CreditTabContent } from '../CreditTabContent/CreditTabContent';
import { Divider } from '../UI/Divider/Divider';
import { TabId } from '../../redux/features/tabs/type';

import classes from './creditCardDetails.module.scss';

const TABS: TabId[] = ['About card', 'Rates and conditions', 'Cashback', 'FAQ'];

export const CreditCardDetails = () => {
  return (
    <section className={classes.details}>
      <Tabs text={TABS} />
      <Divider
        width={81.25}
        orientation="horizontal"
        thickness={0.125}
        variant="solid"
      />
      <CreditTabContent />
    </section>
  );
};

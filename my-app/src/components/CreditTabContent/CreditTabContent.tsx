import { useSelector } from 'react-redux';
import { getTab } from '../../redux/features/store';
import { FaqTab } from '../FaqTab/FaqTab';
import { RatesTab } from '../RatesTab/RatesTab';
import { AboutTab } from '../AboutTab/AboutTab';
import { CashbackTab } from '../CashbackTab/CashbackTab';

export const CreditTabContent = () => {
  const { activeTab } = useSelector(getTab);
  return (
    <article>
      {activeTab === 'About card' && <AboutTab />}
      {activeTab === 'Rates and conditions' && <RatesTab />}
      {activeTab === 'Cashback' && <CashbackTab />}
      {activeTab === 'FAQ' && <FaqTab />}
    </article>
  );
};

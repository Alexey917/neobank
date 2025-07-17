import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/features/tabs/store';
import { FaqTab } from '../FaqTab/FaqTab';
import { RatesTab } from '../RatesTab/RatesTab';
import { AboutTab } from '../AboutTab/AboutTab';
import { CashbackTab } from '../CashbackTab/CashbackTab';

export const CreditTabContent = () => {
  const activeTab = useSelector((state: RootState) => state.tabs.activeTab);
  return (
    <article>
      {activeTab === 'About card' && <AboutTab />}
      {activeTab === 'Rates and conditions' && <RatesTab />}
      {activeTab === 'Cashback' && <CashbackTab />}
      {activeTab === 'FAQ' && <FaqTab />}
    </article>
  );
};

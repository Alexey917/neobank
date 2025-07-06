import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/features/tabs/store';

export const CreditTabContent = () => {
  const activeTab = useSelector((state: RootState) => state.tabs.activeTab);
  return (
    <article>
      {activeTab === 'About card' && '<AboutTab />'}
      {activeTab === 'Rates and conditions' && '<RatesTab />'}
      {activeTab === 'Cashback' && '<CashbackTab />'}
      {activeTab === 'FAQ' && '<FaqTab />'}
    </article>
  );
};

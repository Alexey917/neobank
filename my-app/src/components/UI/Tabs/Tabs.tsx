import { FC } from 'react';
import { CustomButton } from '../CustomButton/CustomButton';
import { useDispatch } from 'react-redux';
import { switchTab } from '../../../redux/features/tabs/tabSlice';
import { TabId } from '../../../redux/features/tabs/type';

import classes from './Tabs.module.scss';

interface ITabsProps {
  text: TabId[];
}

export const Tabs: FC<ITabsProps> = ({ text }) => {
  const dispatch = useDispatch();

  return (
    <div className={classes.tabs}>
      {text.map((item) => (
        <CustomButton
          key={item}
          paddings="tabsPaddings"
          bgColor="tabsBgColor"
          color="tabsColor"
          text={item}
          onClick={() => dispatch(switchTab(item))}
        />
      ))}
    </div>
  );
};

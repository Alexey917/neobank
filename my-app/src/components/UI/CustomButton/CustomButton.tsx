import { FC } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/features/tabs/store';

import classes from './CustomButton.module.scss';

type buttonVariant = 'primary' | 'tab' | 'danger';
type buttonPaddings = 'pTab' | 'pPrimary' | 'pBack' | 'pContinue' | 'pSelect';

export interface ICustomButton {
  text: string;
  paddings: buttonPaddings;
  variant: buttonVariant;
  onClick?: () => void;
}

export const CustomButton: FC<ICustomButton> = ({
  text,
  paddings,
  variant,
  onClick,
}) => {
  const activeTab = useSelector((state: RootState) => state.tabs.activeTab);
  return (
    <button
      className={`${classes.button} ${classes[paddings]} ${classes[variant]} ${
        activeTab === text ? classes.active : ''
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

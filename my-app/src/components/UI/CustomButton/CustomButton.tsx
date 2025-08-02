import { FC } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/features/tabs/store';

import classes from './CustomButton.module.scss';

type buttonVariant = 'primary' | 'tab' | 'danger';
type buttonPaddings =
  | 'pTab'
  | 'pPrimary'
  | 'pBack'
  | 'pContinue'
  | 'pSelect'
  | 'pContinueRegistration'
  | 'pDoc'
  | 'pCancel'
  | 'pSend'
  | 'pCongratulation';

export interface ICustomButton {
  text: string;
  paddings: buttonPaddings;
  variant: buttonVariant;
  onClick?: () => void;
  disabled?: boolean;
}

export const CustomButton: FC<ICustomButton> = ({
  text,
  paddings,
  variant,
  onClick,
  disabled,
}) => {
  const activeTab = useSelector((state: RootState) => state.tabs.activeTab);
  return (
    <button
      className={`${classes.button} ${classes[paddings]} ${classes[variant]} ${
        activeTab === text ? classes.active : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

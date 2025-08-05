import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getTab } from '../../../redux/features/store';

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
  type?: 'button' | 'submit';
}

export const CustomButton: FC<ICustomButton> = ({
  text,
  paddings,
  variant,
  onClick,
  disabled,
  type,
}) => {
  const { activeTab } = useSelector(getTab);
  return (
    <button
      type={type}
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

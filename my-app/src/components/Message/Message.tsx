import React, { FC, RefObject } from 'react';

import classes from './Message.module.scss';

import { CustomButton } from '../UI/CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';

interface IMessage {
  title: string;
  text: string;
  variant: 'primary' | 'email' | 'sign';
  checkEmailRef?: RefObject<HTMLElement | null>;
  img?: string;
  btn?: boolean;
}

export const Message: FC<IMessage> = ({
  title,
  text,
  variant,
  checkEmailRef,
  img,
  btn,
}) => {
  const navigate = useNavigate();

  const finishRegistration = () => {
    localStorage.removeItem('offers');
    return () => navigate('/');
  };

  return (
    <section
      className={`${classes.loanMessage} ${
        variant === 'email'
          ? classes.loanMessageEmail
          : variant === 'sign'
          ? classes.loanMessageSign
          : classes.loanMessagePrimary
      } ${btn && classes.loanMessageCongratulations}`}
      ref={checkEmailRef}
    >
      {img && (
        <img
          src={img}
          alt="box-congratulations"
          className={classes.loanMessage__img}
        />
      )}
      <h2 className={classes.loanMessage__title} aria-live="polite">
        {title}
      </h2>
      <p
        className={`${classes.loanMessage__text} ${
          variant === 'sign' && classes.loanMessage__textSign
        }`}
      >
        {text}
      </p>
      {btn && (
        <CustomButton
          variant="primary"
          text="View other offers of our bank"
          paddings="pCongratulation"
          onClick={finishRegistration}
        />
      )}
    </section>
  );
};

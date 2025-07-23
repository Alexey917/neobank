import React, { FC, RefObject } from 'react';

import classes from './Message.module.scss';

interface IMessage {
  title: string;
  text: string;
  checkEmailRef?: RefObject<HTMLElement | null>;
}

export const Message: FC<IMessage> = ({ title, text, checkEmailRef }) => {
  return (
    <section className={classes.loanMessage} ref={checkEmailRef}>
      <h2 className={classes.loanMessage__title} aria-live="polite">
        {title}
      </h2>
      <p className={classes.loanMessage__text}>{text}</p>
    </section>
  );
};

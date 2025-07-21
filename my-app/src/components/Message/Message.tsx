import React, { FC } from 'react';

import classes from './Message.module.scss';

interface IMessage {
  title: string;
  text: string;
}

export const Message: FC<IMessage> = ({ title, text }) => {
  return (
    <section className={classes.loanMessage}>
      <h2 className={classes.loanMessage__title} aria-live="polite">
        {title}
      </h2>
      <p className={classes.loanMessage__text}>{text}</p>
    </section>
  );
};

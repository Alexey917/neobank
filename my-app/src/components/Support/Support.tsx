import { FC } from 'react';

import classes from './Support.module.scss';
import sprite from '../../assets/sprite.svg';
import { useEmailValidation } from '../../hooks/useEmailValidation';

export const Support: FC = () => {
  const { emailValidation, errorLabel, canSend } = useEmailValidation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('You are now subscribed to the newsletter.');
  };

  return (
    <section className={classes.support} aria-labelledby="support-heading">
      <h4 className={classes.support__title} id="support-heading">
        Support
      </h4>
      <p className={classes.support__text}>
        Subscribe Newsletter & get
        <br />
        <span className={classes.support__textSpan}>Bank News</span>
      </p>
      <form action="#" noValidate name="subscribe" onSubmit={handleSubmit}>
        <fieldset
          className={classes.support__fieldset}
          aria-describedby="email-hint"
        >
          <input
            type="email"
            id="email"
            name="email"
            required
            aria-required="true"
            placeholder=" "
            className={classes.support__input}
            onChange={emailValidation}
          />
          <label htmlFor="email" className={classes.support__label}>
            <svg className={classes.support__emailIcon} aria-hidden="true">
              <use href={`${sprite}#email`}></use>
            </svg>
            <span className={classes.support__emailPlaceholder}>
              Your email
            </span>
          </label>
          <span className={classes.support__errorLabel}>{errorLabel}</span>
          <button
            type="submit"
            className={classes.support__btn}
            aria-label="Subscribe to newsletter"
            disabled={canSend}
          >
            <svg className={classes.support__letterIcon} aria-hidden="true">
              <use href={`${sprite}#letter`}></use>
            </svg>
            <span className={classes.button_text}>Subscribe</span>
          </button>
        </fieldset>
      </form>
    </section>
  );
};

import { FC } from 'react';
import { useEmailValidation } from '../../hooks/useEmailValidation';
import { usePostRequest } from '../../hooks/usePostRequest';
import { getNews } from '../../API/api';
import { AxiosResponse } from 'axios';

import classes from './Support.module.scss';
import sprite from '../../assets/sprite.svg';
import { TApi, TBody } from 'src/types/types';

interface ISupportFrom {
  setIsSubscribed: (bool: boolean) => void;
  axiosPost: (api: TApi, body: TBody) => Promise<AxiosResponse | undefined>;
}

export const SupportForm: FC<ISupportFrom> = ({
  setIsSubscribed,
  axiosPost,
}) => {
  const { emailValidation, errorLabel, canSend, value } = useEmailValidation();
  // const { axiosPost } = usePostRequest();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axiosPost(getNews, { email: value });

    if (response?.status === 200) {
      setIsSubscribed(true);
      localStorage.setItem(
        'subscribed_email',
        'You are now subscribed to the newsletter.',
      );
    }
  };

  return (
    <form
      action="#"
      method="POST"
      noValidate
      name="subscribe"
      onSubmit={handleSubmit}
    >
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
          <span className={classes.support__emailPlaceholder}>Your email</span>
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
  );
};

import { FC, useState } from 'react';
import { usePostRequest } from '../../hooks/usePostRequest';

import { Loader } from '../UI/Loader/Loader';

import classes from './Support.module.scss';
import { SupportForm } from '../SupportForm/SupportForm';

export const Support: FC = () => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const { axiosPost, loading, error } = usePostRequest();

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
      {loading ? (
        <div
          aria-label="send email"
          aria-busy="true"
          className={classes.support__spinner_wrapper}
        >
          <Loader />
        </div>
      ) : error ? (
        <div>
          <SupportForm
            setIsSubscribed={setIsSubscribed}
            axiosPost={axiosPost}
          />
          <div className={classes.support__error} role="alert">
            {error}
          </div>
        </div>
      ) : localStorage.getItem('subscribed_email') ? (
        <p className={classes.support__subscribe}>
          {localStorage.getItem('subscribed_email')}
        </p>
      ) : (
        <SupportForm setIsSubscribed={setIsSubscribed} axiosPost={axiosPost} />
      )}
    </section>
  );
};

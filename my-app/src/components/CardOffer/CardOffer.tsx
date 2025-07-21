import React, { FC } from 'react';

import offerBox from '../../assets/images/offerBox.webp';
import ok from '../../assets/sprite.svg';
import error from '../../assets/sprite.svg';
import classes from './CardOffer.module.scss';
import { CustomButton } from '../UI/CustomButton/CustomButton';

interface ICardOffer {
  monthlyPayment: string;
  yourRate: string;
  insuranceIncluded: (string | boolean)[];
  salaryClient: (string | boolean)[];
}

export const CardOffer: FC<ICardOffer> = ({
  monthlyPayment,
  yourRate,
  salaryClient,
  insuranceIncluded,
}) => {
  return (
    <article className={classes.cardOffer}>
      <img
        src={offerBox}
        alt="offer-image"
        className={classes.cardOffer__img}
      />
      <ul className={classes.cardOffer__list}>
        <li>
          <p className={classes.cardOffer__text}>Requested amount: 200 000 ₽</p>
        </li>
        <li>
          <p className={classes.cardOffer__text}>Total amount: 200 000 ₽</p>
        </li>
        <li>
          <p className={classes.cardOffer__text}>For 24 months</p>
        </li>
        <li>
          <p className={classes.cardOffer__text}>{monthlyPayment}</p>
        </li>
        <li>
          <p className={classes.cardOffer__text}>{yourRate}</p>
        </li>
        <li className={classes.cardOffer__listItem}>
          <p className={classes.cardOffer__text}>{insuranceIncluded[0]}</p>
          <span>
            {insuranceIncluded[1] ? (
              <svg className={classes.error__icon} focusable="false">
                <use href={ok + '#ok'}></use>
              </svg>
            ) : (
              <svg className={classes.error__icon} focusable="false">
                <use href={error + '#error'}></use>
              </svg>
            )}
          </span>
        </li>
        <li className={classes.cardOffer__listItem}>
          <p className={classes.cardOffer__text}>{salaryClient[0]}</p>
          <span>
            {salaryClient[1] ? (
              <svg
                className={classes.error__icon}
                aria-hidden="true"
                focusable="false"
              >
                <use href={ok + '#ok'}></use>
              </svg>
            ) : (
              <svg
                className={classes.error__icon}
                aria-hidden="true"
                focusable="false"
              >
                <use href={error + '#error'}></use>
              </svg>
            )}
          </span>
        </li>
      </ul>
      <CustomButton text="select" variant="primary" paddings="pSelect" />
    </article>
  );
};

import React, { FC } from 'react';

import offerBox from '../../assets/images/offerBox.webp';
import ok from '../../assets/sprite.svg';
import error from '../../assets/sprite.svg';
import classes from './CardOffer.module.scss';
import { CustomButton } from '../UI/CustomButton/CustomButton';
import { IOffer } from '../../types/types';
import { selectedOffer } from '../../API/api';
import { store } from '../../redux/features/tabs/store';
import { checkStatus } from '../../redux/features/tabs/statusThunks';

interface ICardOffer {
  item: IOffer;
}

export const CardOffer: FC<ICardOffer> = ({ item }) => {
  const dispatch = store.dispatch;

  const selectOffer = async () => {
    try {
      const response = await selectedOffer(item);

      if (response?.status === 200 && item.applicationId) {
        dispatch(checkStatus(item.applicationId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <article className={classes.cardOffer}>
      <img
        src={offerBox}
        alt="offer-image"
        className={classes.cardOffer__img}
      />
      <ul className={classes.cardOffer__list}>
        <li>
          <p className={classes.cardOffer__text}>
            Requested amount: {item.requestedAmount} ₽
          </p>
        </li>
        <li>
          <p className={classes.cardOffer__text}>
            Total amount: {item.totalAmount} ₽
          </p>
        </li>
        <li>
          <p className={classes.cardOffer__text}>For {item.term} months</p>
        </li>
        <li>
          <p className={classes.cardOffer__text}>
            Monthly payment: {item.monthlyPayment} ₽
          </p>
        </li>
        <li>
          <p className={classes.cardOffer__text}>Your rate: {item.rate} %</p>
        </li>
        <li className={classes.cardOffer__listItem}>
          <p className={classes.cardOffer__text}>
            Insurance included {item.isInsuranceEnabled}
          </p>
          <span>
            {item.isInsuranceEnabled ? (
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
          <p className={classes.cardOffer__text}>
            Salary client {item.isSalaryClient}
          </p>
          <span>
            {item.isSalaryClient ? (
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
      <CustomButton
        text="select"
        variant="primary"
        paddings="pSelect"
        onClick={selectOffer}
      />
    </article>
  );
};

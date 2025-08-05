import React, { FC } from 'react';
import { RATES } from '../../consts/consts';
import { Divider } from '../UI/Divider/Divider';

import classes from './RatesTab.module.scss';

export const RatesTab: FC = () => {
  return (
    <section className={classes.rates} aria-label="Card rates and conditions">
      {RATES.map((item, index) => (
        <div
          key={`rate-${index}`}
          role="listitem"
          aria-labelledby={`rate-title-${index}`}
        >
          <div className={classes.rates__wrapper}>
            <p className={classes.rates__title} id={`rate-title-${index}`}>
              {item.title}
            </p>
            {index !== RATES.length - 1 ? (
              <p className={classes.rates__text}>{item.text}</p>
            ) : (
              <div className={classes.rates__textWrapper}>
                <p className={classes.rates__text}>{item.text}</p>
                <p
                  className={`${classes.rates__text} ${classes.rates__textBr}`}
                >
                  {item.textBr}
                </p>
              </div>
            )}
          </div>
          {index !== RATES.length - 1 && (
            <Divider
              type="rates"
              width={63.5}
              thickness={0.0625}
              orientation="horizontal"
              variant="solid"
              color="blue-grey"
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </section>
  );
};

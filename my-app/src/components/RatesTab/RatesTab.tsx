import React from 'react';
import { RATES } from '../../consts/consts';
import { Divider } from '../UI/Divider/Divider';

import classes from './RatesTab.module.scss';

export const RatesTab = () => {
  return (
    <section className={classes.rates}>
      {RATES.map((item, index) => (
        <div>
          <div className={classes.rates__wrapper}>
            <p className={classes.rates__title}>{item.title}</p>
            {index !== RATES.length - 1 ? (
              <p className={classes.rates__text}>{item.text}</p>
            ) : (
              <div>
                <p className={classes.rates__text}>{item.text}</p>
                <p
                  className={`${classes.rates__text} ${classes.rates__textBr}`}
                >
                  {item.textBr}
                </p>
              </div>
            )}
          </div>
          {index !== RATES.length - 1 ? (
            <Divider
              width={63.5}
              thickness={0.0625}
              orientation="horizontal"
              variant="solid"
              color="blue-grey"
            />
          ) : (
            ''
          )}
        </div>
      ))}
    </section>
  );
};

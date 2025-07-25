import React, { useState } from 'react';
import { CustomLabel } from '../UI/CustomLabel/CustomLabel';
import { CustomInput } from '../UI/CustomInput/CustomInput';
import { CustomSelect } from '../UI/CustomSelect/CustomSelect';
import { DATA_SCORING } from '../../consts/consts';

import classes from './ScoringForm.module.scss';

export const ScoringForm = () => {
  const [option, setOption] = useState<string | number>('');

  const handleOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classes.form}
      ref={formRef}
      aria-labelledby="form-heading"
    >
      {loading ? (
        <div
          aria-label="Loading news"
          aria-busy="true"
          className={classes.customForm__spinner_wrapper}
        >
          <Loader aria-hidden="false" />
        </div>
      ) : error ? (
        <div>
          <div
            className={classes.customForm__error}
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        </div>
      ) : (
        <div>
          <div className={classes.form__amountWrapper}>
            <div className={classes.form__selectAmountWrapper}>
              <div className={classes.form__legendWrapper}>
                <legend className={classes.form__legend}>
                  Continuation of the application
                </legend>
                <p className={classes.form__step}>Step 2 of 5</p>
              </div>
            </div>

            <div className={classes.form__chosenAmount}></div>
          </div>

          <div className={classes.form__inputGroupsWrapper}>
            <h3 className={classes.form__inputGroupsTitle}>
              Contact Information
            </h3>

            <div className={classes.form__inputGroups} role="list">
              {DATA_SCORING.map((data, index) => {
                return (
                  <div
                    className={classes.form__inputGroup}
                    key={data.field}
                    role="listitem"
                  >
                    <CustomLabel
                      text="Date of issue of the passport"
                      required={true}
                      inputId="Date of issue of the passport"
                    />

                    {index < 2 ? (
                      <CustomSelect
                        width={25.0625}
                        options={data.options}
                        value={option}
                        onChange={handleOption}
                        register={register(
                          data.field,
                          convertToRegisterOptions(data.field, data.errors),
                        )}
                        aria-describedby={`${data.field}-error`}
                      />
                    ) : (
                      <CustomInput
                        width={18.5625}
                        variant="primary"
                        placeholder={data.placeholder}
                        id={data.label}
                        svgError={errors[data.field] ? true : false}
                        svgSuccess={
                          isSubmitted && !errors[data.field] ? true : false
                        }
                        type={
                          data.label === 'Your email'
                            ? 'email'
                            : data.label === 'Your date of birth'
                            ? 'text'
                            : data.label === 'Your passport series' ||
                              data.label === 'Your passport number'
                            ? 'number'
                            : 'text'
                        }
                        register={register(
                          data.field,
                          convertToRegisterOptions(data.field, data.errors),
                        )}
                        aria-describedby={`${data.field}-error`}
                      />
                    )}

                    {(isSubmitted || errors[data.field]) && (
                      <span className={classes.form__inputError} role="alert">
                        {errors[data.field]?.message?.toString()}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <CustomButton text="Continue" variant="primary" paddings="pContinue" />
    </form>
  );
};

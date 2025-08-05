import React, { useState } from 'react';
import { CustomLabel } from '../UI/CustomLabel/CustomLabel';
import { CustomInput } from '../UI/CustomInput/CustomInput';
import { CustomSelect } from '../UI/CustomSelect/CustomSelect';
import { CustomButton } from '../UI/CustomButton/CustomButton';
import { DATA_SCORING } from '../../consts/consts';
import { IScoringData } from '../../types/types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Loader } from '../UI/Loader/Loader';
import { usePostRequest } from '../../hooks/usePostRequest';
import { sendScoring } from '../../API/api';
import { store } from '../../redux/features/store';
import { checkStatus } from '../../redux/features/steps/statusThunks';

import classes from './ScoringForm.module.scss';

export const ScoringForm = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { axiosPost, loading, error } = usePostRequest();

  const dispatch = store.dispatch;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<IScoringData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const onSubmit: SubmitHandler<IScoringData> = async (
    formData: IScoringData,
  ) => {
    setIsSubmitted(true);

    formData.employment.salary = +formData.employment.salary;
    formData.employment.workExperienceCurrent =
      +formData.employment.workExperienceCurrent;
    formData.employment.workExperienceTotal =
      +formData.employment.workExperienceTotal;
    formData.dependentAmount = +formData.dependentAmount;
    formData.account = '11223344556677889900';

    if (Object.keys(errors).length === 0) {
      let data = localStorage.getItem('offers');
      if (!data || data.trim() === '') {
        return;
      }
      try {
        const getId = JSON.parse(data);
        const response = await sendScoring(getId[0].applicationId, formData);

        if (response?.status === 200) {
          dispatch(checkStatus(getId[0].applicationId));
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const personalFields = DATA_SCORING.slice(0, 5);
  const employmentFields = DATA_SCORING.slice(5);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classes.form}
      aria-labelledby="form-title"
      noValidate
    >
      {loading ? (
        <div
          aria-busy="true"
          aria-live="polite"
          className={classes.customForm__spinner_wrapper}
        >
          <Loader aria-hidden="true" />
        </div>
      ) : error ? (
        <div>
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
              <div className={classes.form__inputGroups} role="group">
                {personalFields.map((data, index) => {
                  return (
                    <div className={classes.form__inputGroup} key={data.field}>
                      {index < 5 && data.label ? (
                        <CustomLabel
                          text={data.label}
                          required={true}
                          inputId={data.label}
                        />
                      ) : (
                        ''
                      )}

                      {data.options.length !== 0 ? (
                        <CustomSelect
                          width={window.innerWidth > 500 ? 25.0625 : 15.625}
                          options={data.options}
                          defaultValue=""
                          required={
                            errors[data.field as keyof IScoringData]
                              ? true
                              : false
                          }
                          register={register(data.field, data.errors)}
                          aria-invalid={
                            errors[data.field as keyof IScoringData]
                              ? 'true'
                              : 'false'
                          }
                          aria-describedby={`${data.field}-error`}
                        />
                      ) : (
                        <CustomInput
                          width={
                            window.innerWidth > 1300
                              ? 38
                              : window.innerWidth < 500
                              ? 15.625
                              : 25.0625
                          }
                          variant="primary"
                          placeholder={data.placeholder}
                          id={data.label}
                          svgError={
                            errors[data.field as keyof IScoringData]
                              ? true
                              : false
                          }
                          svgSuccess={
                            isSubmitted &&
                            !errors[data.field as keyof IScoringData]
                              ? true
                              : false
                          }
                          type="text"
                          register={register(data.field, data.errors)}
                          aria-invalid={
                            errors[data.field as keyof IScoringData]
                              ? 'true'
                              : 'false'
                          }
                          aria-describedby={`${data.field}-error`}
                        />
                      )}

                      {(isSubmitted ||
                        errors[data.field as keyof IScoringData]) && (
                        <span className={classes.form__inputError} role="alert">
                          {errors[
                            data.field as keyof IScoringData
                          ]?.message?.toString()}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <h3 className={classes.form__employmentTitle}>Employment</h3>

              <div className={classes.form__inputGroups} role="group">
                {employmentFields.map((data, index) => {
                  return (
                    <div className={classes.form__inputGroup} key={data.field}>
                      {data.label && (
                        <CustomLabel
                          text={data.label}
                          required={true}
                          inputId={data.label}
                        />
                      )}

                      {data.options.length !== 0 ? (
                        <CustomSelect
                          width={window.innerWidth > 500 ? 25.0625 : 15.625}
                          options={data.options}
                          defaultValue=""
                          required={
                            errors[data.field as keyof IScoringData]
                              ? true
                              : false
                          }
                          register={register(data.field, data.errors)}
                          aria-invalid={
                            errors[data.field as keyof IScoringData]
                              ? 'true'
                              : 'false'
                          }
                          aria-describedby={`${data.field}-error`}
                        />
                      ) : (
                        <CustomInput
                          width={window.innerWidth > 500 ? 25.0625 : 15.625}
                          variant="primary"
                          placeholder={data.placeholder}
                          id={data.label}
                          svgError={
                            errors[data.field as keyof IScoringData]
                              ? true
                              : false
                          }
                          svgSuccess={
                            isSubmitted &&
                            !errors[data.field as keyof IScoringData]
                              ? true
                              : false
                          }
                          type="text"
                          register={register(data.field, data.errors)}
                          aria-invalid={
                            errors[data.field as keyof IScoringData]
                              ? 'true'
                              : 'false'
                          }
                          aria-describedby={`${data.field}-error`}
                        />
                      )}
                      {(isSubmitted ||
                        errors[data.field as keyof IScoringData]) && (
                        <span className={classes.form__inputError} role="alert">
                          {errors[
                            data.field as keyof IScoringData
                          ]?.message?.toString()}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
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
            <div className={classes.form__inputGroups} role="group">
              {personalFields.map((data, index) => {
                return (
                  <div className={classes.form__inputGroup} key={data.field}>
                    {index < 5 && data.label ? (
                      <CustomLabel
                        text={data.label}
                        required={true}
                        inputId={data.label}
                      />
                    ) : (
                      ''
                    )}

                    {data.options.length !== 0 ? (
                      <CustomSelect
                        width={window.innerWidth > 500 ? 25.0625 : 15.625}
                        options={data.options}
                        defaultValue=""
                        required={
                          errors[data.field as keyof IScoringData]
                            ? true
                            : false
                        }
                        register={register(data.field, data.errors)}
                        aria-invalid={
                          errors[data.field as keyof IScoringData]
                            ? 'true'
                            : 'false'
                        }
                        aria-describedby={`${data.field}-error`}
                      />
                    ) : (
                      <CustomInput
                        width={
                          window.innerWidth > 1300
                            ? 38
                            : window.innerWidth < 500
                            ? 15.625
                            : 25.0625
                        }
                        variant="primary"
                        placeholder={data.placeholder}
                        id={data.label}
                        svgError={
                          errors[data.field as keyof IScoringData]
                            ? true
                            : false
                        }
                        svgSuccess={
                          isSubmitted &&
                          !errors[data.field as keyof IScoringData]
                            ? true
                            : false
                        }
                        type="text"
                        register={register(data.field, data.errors)}
                        aria-invalid={
                          errors[data.field as keyof IScoringData]
                            ? 'true'
                            : 'false'
                        }
                        aria-describedby={`${data.field}-error`}
                      />
                    )}

                    {(isSubmitted ||
                      errors[data.field as keyof IScoringData]) && (
                      <span className={classes.form__inputError} role="alert">
                        {errors[
                          data.field as keyof IScoringData
                        ]?.message?.toString()}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <h3 className={classes.form__employmentTitle}>Employment</h3>

            <div className={classes.form__inputGroups} role="group">
              {employmentFields.map((data, index) => {
                return (
                  <div className={classes.form__inputGroup} key={data.field}>
                    {data.label && (
                      <CustomLabel
                        text={data.label}
                        required={true}
                        inputId={data.label}
                      />
                    )}

                    {data.options.length !== 0 ? (
                      <CustomSelect
                        width={window.innerWidth > 500 ? 25.0625 : 15.625}
                        options={data.options}
                        defaultValue=""
                        required={
                          errors[data.field as keyof IScoringData]
                            ? true
                            : false
                        }
                        register={register(data.field, data.errors)}
                        aria-invalid={
                          errors[data.field as keyof IScoringData]
                            ? 'true'
                            : 'false'
                        }
                        aria-describedby={`${data.field}-error`}
                      />
                    ) : (
                      <CustomInput
                        width={window.innerWidth > 500 ? 25.0625 : 15.625}
                        variant="primary"
                        placeholder={data.placeholder}
                        id={data.label}
                        svgError={
                          errors[data.field as keyof IScoringData]
                            ? true
                            : false
                        }
                        svgSuccess={
                          isSubmitted &&
                          !errors[data.field as keyof IScoringData]
                            ? true
                            : false
                        }
                        type="text"
                        register={register(data.field, data.errors)}
                        aria-invalid={
                          errors[data.field as keyof IScoringData]
                            ? 'true'
                            : 'false'
                        }
                        aria-describedby={`${data.field}-error`}
                      />
                    )}
                    {(isSubmitted ||
                      errors[data.field as keyof IScoringData]) && (
                      <span className={classes.form__inputError} role="alert">
                        {errors[
                          data.field as keyof IScoringData
                        ]?.message?.toString()}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <CustomButton
        text="Continue"
        variant="primary"
        paddings="pContinue"
        aria-disabled={loading}
      />
    </form>
  );
};

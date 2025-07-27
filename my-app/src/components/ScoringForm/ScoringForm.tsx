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

import classes from './ScoringForm.module.scss';

export const ScoringForm = () => {
  // const [option, setOption] = useState<string | number>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { axiosPost, loading, error } = usePostRequest();

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

  const onSubmit: SubmitHandler<IScoringData> = async (data: IScoringData) => {
    setIsSubmitted(true);
    if (Object.keys(errors).length === 0) {
      try {
        console.log(data);
        // const response = await axiosPost(sendCustomizeForm, data);

        // if (response?.status === 200) {
        //   localStorage.setItem('offers', JSON.stringify(response?.data));
        //   if (response.data[0].applicationId) {
        //     dispatch(checkStatus(response.data[0].applicationId));
        //   }
        // }
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
                        width={25.0625}
                        options={data.options}
                        defaultValue=""
                        required={errors[data.field] ? true : false}
                        register={register(data.field, data.errors)}
                        aria-invalid={errors[data.field] ? 'true' : 'false'}
                        aria-describedby={`${data.field}-error`}
                      />
                    ) : (
                      <CustomInput
                        width={index < 5 ? 38 : 25.0625}
                        variant="primary"
                        placeholder={data.placeholder}
                        id={data.label}
                        svgError={errors[data.field] ? true : false}
                        svgSuccess={
                          isSubmitted && !errors[data.field] ? true : false
                        }
                        type="text"
                        register={register(data.field, data.errors)}
                        aria-invalid={errors[data.field] ? 'true' : 'false'}
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
                        width={25.0625}
                        options={data.options}
                        defaultValue=""
                        required={errors[data.field] ? true : false}
                        register={register(data.field, data.errors)}
                        aria-invalid={errors[data.field] ? 'true' : 'false'}
                        aria-describedby={`${data.field}-error`}
                      />
                    ) : (
                      <CustomInput
                        width={25.0625}
                        variant="primary"
                        placeholder={data.placeholder}
                        id={data.label}
                        svgError={errors[data.field] ? true : false}
                        svgSuccess={
                          isSubmitted && !errors[data.field] ? true : false
                        }
                        type="text"
                        register={register(data.field, data.errors)}
                        aria-invalid={errors[data.field] ? 'true' : 'false'}
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

      <CustomButton
        text="Continue"
        variant="primary"
        paddings="pContinue"
        aria-disabled={loading}
      />
    </form>
  );
};

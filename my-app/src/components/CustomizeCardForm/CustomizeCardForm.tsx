import { FC, RefObject, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAmountSlider } from '../../hooks/useAmountSlider';
import { AmountSlider } from '../UI/AmountSlider/AmountSlider';
import { CustomButton } from '../UI/CustomButton/CustomButton';
import { CustomInput } from '../UI/CustomInput/CustomInput';
import { CustomLabel } from '../UI/CustomLabel/CustomLabel';
import { CustomSelect } from '../UI/CustomSelect/CustomSelect';
import { Divider } from '../UI/Divider/Divider';
import { DATA_FORM } from '../../consts/consts';
import { usePostRequest } from '../../hooks/usePostRequest';
import { sendCustomizeForm } from '../../API/api';
import { ISendData } from '../../types/types';
import { convertToRegisterOptions } from '../../utils/converterToRegisterOptions';
import { Loader } from '../UI/Loader/Loader';
import { store } from '../../redux/features/store';
import { checkStatus } from '../../redux/features/steps/statusThunks';

import classes from './CustomizeCardForm.module.scss';

interface ICustomizeProps {
  formRef: RefObject<HTMLFormElement | null>;
}

export const CustomizeCardForm: FC<ICustomizeProps> = ({ formRef }) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { axiosPost, loading, error } = usePostRequest();

  const dispatch = store.dispatch;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<ISendData>({
    mode: 'onBlur', // Валидация при уходе с поля
    reValidateMode: 'onChange', // Повторная валидация при изменении
    defaultValues: {
      amount: 150000, // Устанавливаем начальное значение
    },
  });

  const amountValue = watch('amount'); // Следим за значением amount

  const {
    sliderRef,
    thumbRef,
    MIN,
    MAX,
    formatMoney,
    startDrag,
    handleChange,
  } = useAmountSlider(amountValue);

  const onSubmit: SubmitHandler<ISendData> = async (data: ISendData) => {
    setIsSubmitted(true);
    data.term = +data.term;

    if (Object.keys(errors).length === 0) {
      try {
        console.log(data);
        const response = await axiosPost(sendCustomizeForm, data);

        if (response?.status === 200) {
          localStorage.setItem('offers', JSON.stringify(response?.data));
          if (response.data[0].applicationId) {
            dispatch(checkStatus(response.data[0].applicationId));
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    handleChange(e); // Обновляем визуальное состояние слайдера
    setValue('amount', newValue, { shouldValidate: true }); // Обновляем значение в форме
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
          <div>
            <div className={classes.form__amountWrapper}>
              <div className={classes.form__selectAmountWrapper}>
                <div className={classes.form__legendWrapper}>
                  <legend className={classes.form__legend}>
                    Customize your card
                  </legend>
                  <p className={classes.form__step}>Step 1 of 5</p>
                </div>

                <AmountSlider
                  value={amountValue}
                  sliderRef={sliderRef}
                  thumbRef={thumbRef}
                  MIN={MIN}
                  MAX={MAX}
                  formatMoney={formatMoney}
                  startDrag={startDrag}
                  handleChange={handleAmountChange}
                />
              </div>

              <Divider
                type="form"
                orientation="vertical"
                width={14.5}
                thickness={0.0625}
                variant="dashed"
                color="grey-dashed"
                aria-hidden="true"
              />
              <div className={classes.form__chosenAmount}>
                <h3 className={classes.form__amountTitle}>
                  You have chosen the amount
                </h3>
                <CustomInput
                  width={13.75}
                  type="number"
                  variant="amount"
                  value={amountValue}
                  register={register(
                    DATA_FORM[0].field,
                    convertToRegisterOptions(
                      DATA_FORM[0].field,
                      DATA_FORM[0].errors,
                    ),
                  )}
                  onChange={handleChange}
                  aria-describedby="amount-error"
                />
                {(isSubmitted || errors[DATA_FORM[0].field]) && (
                  <span
                    className={classes.form__inputError}
                    id="amount-error"
                    role="alert"
                  >
                    {errors[DATA_FORM[0].field]?.message?.toString()}
                  </span>
                )}
              </div>
            </div>

            <div className={classes.form__inputGroupsWrapper}>
              <h3 className={classes.form__inputGroupsTitle}>
                Contact Information
              </h3>

              <div className={classes.form__inputGroups} role="list">
                {DATA_FORM.map((data) => {
                  // Пропускаем amount, так как оно рендерится отдельно
                  if (data.field === 'amount') return null;

                  // Проверяем, есть ли что рендерить
                  const shouldRender = data.label || data.field === 'term';

                  if (!shouldRender) return null;

                  return (
                    <div
                      className={classes.form__inputGroup}
                      key={data.field}
                      role="listitem"
                    >
                      {data.label && (
                        <CustomLabel
                          text={data.label}
                          required={data.label !== 'Your patronymic'}
                          inputId={data.label}
                        />
                      )}

                      {data.field === 'term' ? (
                        <CustomSelect
                          width={18.5625}
                          options={data.options}
                          defaultValue="6 month"
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
                  Customize your card
                </legend>
                <p className={classes.form__step}>Step 1 of 5</p>
              </div>

              <AmountSlider
                value={amountValue}
                sliderRef={sliderRef}
                thumbRef={thumbRef}
                MIN={MIN}
                MAX={MAX}
                formatMoney={formatMoney}
                startDrag={startDrag}
                handleChange={handleAmountChange}
              />
            </div>

            <Divider
              type="form"
              orientation="vertical"
              width={14.5}
              thickness={0.0625}
              variant="dashed"
              color="grey-dashed"
              aria-hidden="true"
            />
            <div className={classes.form__chosenAmount}>
              <h3 className={classes.form__amountTitle}>
                You have chosen the amount
              </h3>
              <CustomInput
                width={13.75}
                type="number"
                variant="amount"
                value={amountValue}
                register={register(
                  DATA_FORM[0].field,
                  convertToRegisterOptions(
                    DATA_FORM[0].field,
                    DATA_FORM[0].errors,
                  ),
                )}
                onChange={handleChange}
                aria-describedby="amount-error"
              />
              {(isSubmitted || errors[DATA_FORM[0].field]) && (
                <span
                  className={classes.form__inputError}
                  id="amount-error"
                  role="alert"
                >
                  {errors[DATA_FORM[0].field]?.message?.toString()}
                </span>
              )}
            </div>
          </div>

          <div className={classes.form__inputGroupsWrapper}>
            <h3 className={classes.form__inputGroupsTitle}>
              Contact Information
            </h3>

            <div className={classes.form__inputGroups} role="list">
              {DATA_FORM.map((data) => {
                // Пропускаем amount, так как оно рендерится отдельно
                if (data.field === 'amount') return null;

                // Проверяем, есть ли что рендерить
                const shouldRender = data.label || data.field === 'term';

                if (!shouldRender) return null;

                return (
                  <div
                    className={classes.form__inputGroup}
                    key={data.field}
                    role="listitem"
                  >
                    {data.label && (
                      <CustomLabel
                        text={data.label}
                        required={data.label !== 'Your patronymic'}
                        inputId={data.label}
                      />
                    )}

                    {data.field === 'term' ? (
                      <CustomSelect
                        width={18.5625}
                        options={data.options}
                        defaultValue="6 month"
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

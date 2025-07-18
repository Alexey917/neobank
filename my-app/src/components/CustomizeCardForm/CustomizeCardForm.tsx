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

import classes from './CustomizeCardForm.module.scss';

const options = [6, 12, 18, 24];

interface ICustomizeProps {
  formRef: RefObject<HTMLFormElement | null>;
}

export const CustomizeCardForm: FC<ICustomizeProps> = ({ formRef }) => {
  const [option, setOption] = useState<number>(options[0]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { axiosPost, loading, error } = usePostRequest();

  const {
    value,
    sliderRef,
    thumbRef,
    MIN,
    MAX,
    formatMoney,
    startDrag,
    handleChange,
  } = useAmountSlider();

  const handleOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(+e.target.value);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISendData>({
    mode: 'onBlur', // Валидация при уходе с поля
    reValidateMode: 'onChange', // Повторная валидация при изменении
  });

  const onSubmit: SubmitHandler<ISendData> = async (data: ISendData) => {
    console.log(data);
    setIsSubmitted(true);
    if (Object.keys(errors).length === 0) {
      await axiosPost(sendCustomizeForm, data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classes.form}
      ref={formRef}
    >
      {loading ? (
        <div
          aria-label="Loading news"
          aria-busy="true"
          className={classes.customForm__spinner_wrapper}
        >
          <Loader />
        </div>
      ) : error ? (
        <div className={classes.customForm__error} role="alert">
          {error}
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
                value={value}
                sliderRef={sliderRef}
                thumbRef={thumbRef}
                MIN={MIN}
                MAX={MAX}
                formatMoney={formatMoney}
                startDrag={startDrag}
                handleChange={handleChange}
              />
            </div>

            <Divider
              type="form"
              orientation="vertical"
              width={14.5}
              thickness={0.0625}
              variant="dashed"
              color="grey-dashed"
            />
            <div className={classes.form__chosenAmount}>
              <h3 className={classes.form__amountTitle}>
                You have chosen the amount
              </h3>
              <CustomInput
                width={13.75}
                type="number"
                variant="amount"
                value={value}
                register={register(
                  DATA_FORM[0].field,
                  convertToRegisterOptions(
                    DATA_FORM[0].field,
                    DATA_FORM[0].errors,
                  ),
                )}
                onChange={handleChange}
              />
              {(isSubmitted || errors[DATA_FORM[0].field]) && (
                <span className={classes.form__inputError}>
                  {errors[DATA_FORM[0].field]?.message?.toString()}
                </span>
              )}
            </div>
          </div>

          <div className={classes.form__inputGroupsWrapper}>
            <h3 className={classes.form__inputGroupsTitle}>
              Contact Information
            </h3>

            <div className={classes.form__inputGroups}>
              {DATA_FORM.map((data) => {
                // Пропускаем amount, так как оно рендерится отдельно
                if (data.field === 'amount') return null;

                // Проверяем, есть ли что рендерить
                const shouldRender =
                  data.label ||
                  data.field === 'term' ||
                  (data.field !== 'amount' && data.placeholder);

                if (!shouldRender) return null;

                return (
                  <div className={classes.form__inputGroup} key={data.field}>
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
                        options={options}
                        value={option}
                        onChange={handleOption}
                        register={register(
                          data.field,
                          convertToRegisterOptions(data.field, data.errors),
                        )}
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
                      />
                    )}

                    {(isSubmitted || errors[data.field]) && (
                      <span className={classes.form__inputError}>
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

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAmountSlider } from '../../hooks/useAmountSlider';
import { AmountSlider } from '../UI/AmountSlider/AmountSlider';
import { CustomButton } from '../UI/CustomButton/CustomButton';
import { CustomInput } from '../UI/CustomInput/CustomInput';
import { CustomLabel } from '../UI/CustomLabel/CustomLabel';
import { CustomSelect } from '../UI/CustomSelect/CustomSelect';
import { Divider } from '../UI/Divider/Divider';
import { DATA_FORM } from '../../consts/consts';

import classes from './CustomizeCardForm.module.scss';

const options = ['6 month', '12 month', '18 month', '24 month'];

export const isOver18 = (dateString: string) => {
  const today = new Date();
  const birthDate = new Date(dateString);

  // Вычисляем разницу в годах
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Корректируем возраст, если ДР ещё не наступил в этом году
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 18;
};

export const CustomizeCardForm = () => {
  const [option, setOption] = useState<string>(options[0]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
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
    setOption(e.target.value);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onBlur', // Валидация при уходе с поля
    reValidateMode: 'onChange', // Повторная валидация при изменении
  });

  const onSubmit = (data: any) => {
    setIsSubmitted(true);
    if (Object.keys(errors).length === 0) {
      alert(JSON.stringify(data));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
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
            onChange={handleChange}
          />
          {errors.amount && <span className={classes?.error}></span>}
        </div>
      </div>

      <div className={classes.form__inputGroupsWrapper}>
        <h3>Contact Information</h3>
        <div className={classes.form__inputGroups}>
          {DATA_FORM.map((data, index) => (
            <div className={classes.form__inputGroup} key={data.label}>
              <CustomLabel
                text={data.label}
                required={data.label === 'Your patronymic' ? false : true}
                inputId={data.label}
              />
              {index === 3 ? (
                <CustomSelect
                  width={18.5625}
                  options={options}
                  value={option}
                  onChange={handleOption}
                />
              ) : (
                <CustomInput
                  width={18.5625}
                  variant="primary"
                  placeholder={data.placeholder}
                  id={data.label}
                  svgError={!!errors[data.label]}
                  svgSuccess={!errors[data.label] && watch(data.label)}
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
                  register={register(data.label, data.errors)}
                />
              )}
              {(isSubmitted || errors[data.label]) && (
                <span className={classes.form__inputError}>
                  {errors[data.label]?.message?.toString()}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <CustomButton text="Continue" variant="primary" paddings="pContinue" />
    </form>
  );
};

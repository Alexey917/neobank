import { useAmountSlider } from '../../hooks/useAmountSlider';
import { AmountSlider } from '../UI/AmountSlider/AmountSlider';
import { CustomButton } from '../UI/CustomButton/CustomButton';
import { CustomInput } from '../UI/CustomInput/CustomInput';
import { CustomLabel } from '../UI/CustomLabel/CustomLabel';
import { Divider } from '../UI/Divider/Divider';

import classes from './CustomizeCardForm.module.scss';

const DATA_FORM = {
  'Your last name': 'For Example Doe',
  'Your first name': 'For Example Jhon',
  'Your patronymic': 'For Example Victorovich',
  'Select term': '6 month',
  'Your email': 'test@gmail.com',
  'Your date of birth': 'Select Date and Time',
  'Your passport series': '0000',
  'Your passport number': '000000',
};

export const CustomizeCardFrom = () => {
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

  console.log(value);

  return (
    <form action="" className={classes.form}>
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
        </div>
      </div>

      <div className={classes.form__inputGroupsWrapper}>
        <h3>Contact Information</h3>
        <div className={classes.form__inputGroups}>
          {Object.entries(DATA_FORM).map(([key, value]) => (
            <div className={classes.form__inputGroup} key={key}>
              <CustomLabel
                text={key}
                required={key === 'Your patronymic' ? false : true}
                inputId={key}
              />
              <CustomInput
                width={18.5625}
                variant="primary"
                placeholder={value}
                id={key}
                type={
                  key === 'Your email'
                    ? 'email'
                    : key === 'Your date of birth'
                    ? 'text'
                    : key === 'Your passport series' ||
                      key === 'Your passport number'
                    ? 'number'
                    : 'text'
                }
              />
            </div>
          ))}
        </div>
      </div>
      <CustomButton text="Continue" variant="primary" paddings="pContinue" />
    </form>
  );
};

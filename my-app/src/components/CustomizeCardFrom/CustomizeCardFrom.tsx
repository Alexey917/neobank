import { AmountSlider } from '../UI/AmountSlider/AmountSlider';
import { CustomInput } from '../UI/CustomInput/CustomInput';
import { CustomLabel } from '../UI/CustomLabel/CustomLabel';
import { Divider } from '../UI/Divider/Divider';

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
  return (
    <form action="">
      <div>
        <legend>Customize your card</legend>
        <p>Step 1 of 5</p>
        <AmountSlider />
      </div>

      <Divider
        orientation="vertical"
        width={14.5}
        thickness={0.0625}
        variant="dashed"
        color="grey-dashed"
      />
      <div>
        <h3>You have chosen the amount</h3>
        <input type="text" />
      </div>

      <div>
        <h3>Contact Information</h3>
        <div>
          {Object.entries(DATA_FORM).map(([key, value]) => (
            <CustomLabel
              text={key}
              required={key === 'Your patronymic' ? false : true}
              inputId={key}
            >
              <CustomInput
                width={18.5625}
                variant="primary"
                placeholder={value}
                type={
                  key === 'Your email'
                    ? 'email'
                    : key === 'Your date of birth'
                    ? 'date'
                    : key === 'Your passport series' ||
                      key === 'Your passport number'
                    ? 'number'
                    : 'text'
                }
              />
            </CustomLabel>
          ))}
        </div>
      </div>
    </form>
  );
};

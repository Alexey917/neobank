import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import classes from './LoanDocument.module.scss';
import { CustomButton } from '../UI/CustomButton/CustomButton';
import { CustomInput } from '../UI/CustomInput/CustomInput';
import { CustomLabel } from '../UI/CustomLabel/CustomLabel';
import { Checkbox } from '../UI/CheckBox/Checkbox';

export const LoanDocument = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const toggleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  console.log(isChecked);

  return (
    <form className={classes.formDoc}>
      <div className={classes.formDoc__legendWrapper}>
        <legend className={classes.formDoc__legend}>Payment Schedule</legend>
        <p className={classes.formDoc__step}>Step 3 of 5</p>
      </div>
      {/* <Table /> */}
      <div className={classes.formDoc__footer}>
        <CustomButton text="Deny" paddings="pDoc" variant="danger" />
        <div className={classes.formDoc__sendGroup}>
          <div className={classes.formDoc__inputGroup}>
            <CustomLabel
              text="I agree with the payment schedule"
              required={false}
              inputId="checkbox"
              variant="checkbox"
            />
            <Checkbox
              id="checkbox"
              checked={isChecked}
              onChange={toggleCheckbox}
            />
          </div>
          <CustomButton
            text="Send"
            paddings="pDoc"
            variant="primary"
            disabled={!isChecked}
          />
        </div>
      </div>
    </form>
  );
};

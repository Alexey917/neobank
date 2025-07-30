import React, { FC, useState } from 'react';
import { CustomButton } from '../UI/CustomButton/CustomButton';
import { CustomLabel } from '../UI/CustomLabel/CustomLabel';
import { Checkbox } from '../UI/CheckBox/Checkbox';
import { Table } from '../UI/Table/Table';
import { ILoanDocument } from 'src/types/types';

import classes from './LoanDocument.module.scss';

export const LoanDocument: FC<ILoanDocument> = ({ schedule }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const toggleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <form className={classes.formDoc}>
      <div className={classes.formDoc__legendWrapper}>
        <legend className={classes.formDoc__legend}>Payment Schedule</legend>
        <p className={classes.formDoc__step}>Step 3 of 5</p>
      </div>
      <Table schedule={schedule} />
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

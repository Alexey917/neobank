import React, { FC, useState } from 'react';
import { CustomButton } from '../UI/CustomButton/CustomButton';
import { CustomLabel } from '../UI/CustomLabel/CustomLabel';
import { Checkbox } from '../UI/CheckBox/Checkbox';
import { Table } from '../UI/Table/Table';
import { ILoanDocument } from 'src/types/types';
import { sendDocument } from '../../API/api';
import { store } from '../../redux/features/store';
import { checkStatus } from '../../redux/features/steps/statusThunks';

import classes from './LoanDocument.module.scss';
import { ModalWindow } from '../UI/ModalWindow/ModalWindow';

export const LoanDocument: FC<ILoanDocument> = ({ schedule }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isDeny, setIsDeny] = useState<boolean>(false);

  const dispatch = store.dispatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let data = localStorage.getItem('offers');
    if (!data || data.trim() === '') {
      return;
    }
    try {
      const getId = JSON.parse(data);
      const response = await sendDocument(getId[0].applicationId, {});
      console.log(response);

      if (response?.status === 200) {
        dispatch(checkStatus(getId[0].applicationId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <>
      <form className={classes.formDoc} onSubmit={handleSubmit}>
        <div className={classes.formDoc__legendWrapper}>
          <legend className={classes.formDoc__legend}>Payment Schedule</legend>
          <p className={classes.formDoc__step}>Step 3 of 5</p>
        </div>
        <Table schedule={schedule} />
        <div className={classes.formDoc__footer}>
          <CustomButton
            text="Deny"
            paddings="pDoc"
            variant="danger"
            aria-label="Reject payment schedule"
            type="button"
            onClick={() => setIsModal(true)}
          />
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
                aria-required="true"
              />
            </div>
            <CustomButton
              text="Send"
              paddings="pDoc"
              variant="primary"
              disabled={!isChecked}
              aria-disabled={!isChecked}
            />
          </div>
        </div>
      </form>
      {isModal && (
        <ModalWindow
          text="You exactly sure, you want to cancel this application?"
          setIsModal={setIsModal}
          setIsDeny={setIsDeny}
        />
      )}
      {isDeny && (
        <ModalWindow
          text="Your application has been deny!"
          setIsModal={setIsModal}
          isDeny={isDeny}
        />
      )}
    </>
  );
};

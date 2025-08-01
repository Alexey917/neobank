import React, { FC, useState } from 'react';
import { CustomButton } from '../UI/CustomButton/CustomButton';
import { CustomLabel } from '../UI/CustomLabel/CustomLabel';
import { Checkbox } from '../UI/CheckBox/Checkbox';

import classes from './SignDoc.module.scss';
import pdf from '../../assets/sprite.svg';
import creditCardOffer from '../../assets/documents/credit-card-offer.pdf';

export const SignDoc: FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const toggleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <form className={classes.formSign}>
      <div className={classes.formSign__legendWrapper}>
        <legend className={classes.formSign__legend}>
          Signing of documents
        </legend>
        <p className={classes.formSign__step}>Step 4 of 5</p>
      </div>

      <article>
        <p className={classes.formSign__text}>
          Information on interest rates under bank deposit agreements with
          individuals. Center for Corporate Information Disclosure. Information
          of a professional participant in the securities market. Information
          about persons under whose control or significant influence the Partner
          Banks are. By leaving an application, you agree to the processing of
          personal data, obtaining information, obtaining access to a credit
          history, using an analogue of a handwritten signature, an offer, a
          policy regarding the processing of personal data, a form of consent to
          the processing of personal data.
        </p>
      </article>

      <div className={classes.formSign__pdfWrapper}>
        <a
          href={creditCardOffer}
          download="credit-card-offer.pdf"
          className={classes.formSign__pdf}
          aria-label="Download contract terms PDF"
        >
          <svg
            className={classes.formSign__iconPdf}
            aria-hidden="true"
            focusable="false"
          >
            <use href={pdf + '#pdf'}></use>
          </svg>
          <span className={classes.formSign__pdfText}>
            Information on your card
          </span>
        </a>
      </div>

      <div className={classes.formSign__footer}>
        <div className={classes.formSign__sendGroup}>
          <div className={classes.formSign__inputGroup}>
            <CustomLabel
              text="I agree"
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
            paddings="pSend"
            variant="primary"
            disabled={!isChecked}
            aria-disabled={!isChecked}
          />
        </div>
      </div>
    </form>
  );
};

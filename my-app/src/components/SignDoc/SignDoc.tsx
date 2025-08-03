import React, { FC, useState } from 'react';
import { CustomButton } from '../UI/CustomButton/CustomButton';
import { CustomLabel } from '../UI/CustomLabel/CustomLabel';
import { Checkbox } from '../UI/CheckBox/Checkbox';
import { store } from '../../redux/features/tabs/store';
import { checkStatus } from '../../redux/features/tabs/statusThunks';
import { signDocument } from '../../API/api';
import { Loader } from '../UI/Loader/Loader';

import classes from './SignDoc.module.scss';
import pdf from '../../assets/sprite.svg';
import creditCardOffer from '../../assets/documents/credit-card-offer.pdf';

export const SignDoc: FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = store.dispatch;

  const toggleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    let data = localStorage.getItem('offers');
    if (!data || data.trim() === '') {
      setError('No offers data found');
      return;
    }
    try {
      const getId = JSON.parse(data);
      const response = await signDocument(getId[0].applicationId, {});
      console.log(response);

      if (response?.status === 200) {
        dispatch(checkStatus(getId[0].applicationId));
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div role="status" aria-live="polite" className={classes.spinner}>
          <Loader />
        </div>
      ) : error ? (
        <div role="alert" aria-live="assertive" className={classes.error}>
          <form
            className={classes.formSign}
            aria-labelledby="form-title"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className={classes.formSign__legendWrapper}>
              <legend className={classes.formSign__legend} id="form-title">
                Signing of documents
              </legend>
              <p className={classes.formSign__step}>Step 4 of 5</p>
            </div>

            <article>
              <p className={classes.formSign__text}>
                Information on interest rates under bank deposit agreements with
                individuals. Center for Corporate Information Disclosure.
                Information of a professional participant in the securities
                market. Information about persons under whose control or
                significant influence the Partner Banks are. By leaving an
                application, you agree to the processing of personal data,
                obtaining information, obtaining access to a credit history,
                using an analogue of a handwritten signature, an offer, a policy
                regarding the processing of personal data, a form of consent to
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
          <p>Error: {error}</p>
        </div>
      ) : (
        <form
          className={classes.formSign}
          aria-labelledby="form-title"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className={classes.formSign__legendWrapper}>
            <legend className={classes.formSign__legend} id="form-title">
              Signing of documents
            </legend>
            <p className={classes.formSign__step}>Step 4 of 5</p>
          </div>

          <article>
            <p className={classes.formSign__text}>
              Information on interest rates under bank deposit agreements with
              individuals. Center for Corporate Information Disclosure.
              Information of a professional participant in the securities
              market. Information about persons under whose control or
              significant influence the Partner Banks are. By leaving an
              application, you agree to the processing of personal data,
              obtaining information, obtaining access to a credit history, using
              an analogue of a handwritten signature, an offer, a policy
              regarding the processing of personal data, a form of consent to
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
      )}
    </>
  );
};

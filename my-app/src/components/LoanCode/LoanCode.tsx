import React, { FC, useState, useRef, useEffect, FormEvent } from 'react';
import { sendCode } from '../../API/api';
import { store } from '../../redux/features/tabs/store';
import { checkStatus } from '../../redux/features/tabs/statusThunks';
import { Loader } from '../UI/Loader/Loader';

import classes from './LoanCode.module.scss';

interface ILoanCode {
  count: number;
}

export const LoanCode: FC<ILoanCode> = ({ count }) => {
  const [values, setValues] = useState<string[]>(['', '', '', '']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputError, inputSetError] = useState<string | null>(null);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const dispatch = store.dispatch;

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValues = [...values];
    newValues[index] = e.target.value.replace(/\D/g, '').slice(0, 1);
    setValues(newValues);

    if (e.target.value && index < count - 1 && inputsRef.current) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    if (inputsRef.current.length !== count) {
      inputsRef.current = Array(count)
        .fill(null)
        .map(
          (_, i) => inputsRef.current[i] || React.createRef<HTMLInputElement>(),
        );
    }
  }, [count]);

  const onSubmit = async () => {
    setIsLoading(true);
    setError(null);
    let data = localStorage.getItem('offers');

    if (!data || data.trim() === '') {
      setError('No offers data found');
      setIsLoading(false);
      return;
    }

    try {
      if (values.length === 4 && values.every((value) => /^\d$/.test(value))) {
        const getId = JSON.parse(data);
        const response = await sendCode(
          getId[0].applicationId,
          values.join(''),
        );
        console.log(response);

        if (response?.status === 200) {
          dispatch(checkStatus(getId[0].applicationId));
        }
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      inputSetError('Invalid confirmation code');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onSubmit();
  }, [values]);

  return (
    <>
      {isLoading ? (
        <div role="status" aria-live="polite" className={classes.spinner}>
          <Loader />
        </div>
      ) : error ? (
        <div role="alert" aria-live="assertive" className={classes.error}>
          <form className={classes.formCode}>
            <legend className={classes.formCode__legend}>
              Please enter confirmation code
            </legend>
            <fieldset className={classes.formCode__inputWrapper}>
              {values.map((value, index) => (
                <div className={classes.formCode__inputGroup} key={index}>
                  <input
                    className={classes.formCode__input}
                    type="number"
                    placeholder=""
                    value={value}
                    onChange={(e) => handleChange(index, e)}
                    ref={(el) => {
                      if (el) {
                        inputsRef.current[index] = el;
                      }
                    }}
                  />
                  <div className={classes.formCode__inputDecoration}></div>
                </div>
              ))}
            </fieldset>
            {inputError === 'Invalid confirmation code' && (
              <span className={classes.formCode__inputError}>
                Invalid confirmation code
              </span>
            )}
          </form>
          <p>Error: {error}</p>
        </div>
      ) : (
        <form className={classes.formCode}>
          <legend className={classes.formCode__legend}>
            Please enter confirmation code
          </legend>
          <fieldset className={classes.formCode__inputWrapper}>
            {values.map((value, index) => (
              <div className={classes.formCode__inputGroup}>
                <input
                  className={classes.formCode__input}
                  key={index}
                  type="number"
                  placeholder=""
                  value={value}
                  onChange={(e) => handleChange(index, e)}
                  ref={(el) => {
                    if (el) {
                      inputsRef.current[index] = el;
                    }
                  }}
                />
                <div className={classes.formCode__inputDecoration}></div>
              </div>
            ))}
          </fieldset>
          {inputError === 'Invalid confirmation code' && (
            <span>Invalid confirmation code</span>
          )}
        </form>
      )}
    </>
  );
};

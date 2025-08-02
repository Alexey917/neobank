import React, { FC, useState, useRef, useEffect } from 'react';

import classes from './LoanCode.module.scss';

interface ILoanCode {
  count: number;
}

export const LoanCode: FC<ILoanCode> = ({ count }) => {
  const [values, setValues] = useState<string[]>(['', '', '', '']);
  const inputsRef = useRef<HTMLInputElement[]>([]);

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

  const onSubmit = () => {
    if (values.length === 4 && values.every((value) => /^\d$/.test(value))) {
      try {
        console.log('отправляем данные!');
      } catch (e) {
        console.log('Invalid confirmation code');
      }
    }
  };

  useEffect(() => {
    onSubmit();
  }, [values]);

  return (
    <form>
      <legend>Please enter confirmation code</legend>
      <fieldset>
        {values.map((value, index) => (
          <input
            key={index}
            type="number"
            value={value}
            onChange={(e) => handleChange(index, e)}
            ref={(el) => {
              if (el) {
                inputsRef.current[index] = el;
              }
            }}
          />
        ))}
      </fieldset>
    </form>
  );
};

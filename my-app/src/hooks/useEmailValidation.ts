import { useState } from 'react';

export const useEmailValidation = () => {
  const [value, setValue] = useState<string>('');
  const [errorLabel, setErrorLabel] = useState<string>('');
  const [canSend, setCanSend] = useState<boolean>(true);

  const emailValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid =
      /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)/;
    setValue(e.target.value);
    if (!isValid.test(e.target.value)) {
      setErrorLabel('Некорректный e-mail');
      setCanSend(true);
    } else {
      setErrorLabel('');
      setCanSend(false);
    }
  };

  return { emailValidation, errorLabel, canSend };
};

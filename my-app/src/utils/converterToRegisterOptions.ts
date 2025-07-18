import { ISendData, IValidateRules } from '../types/types';
import { RegisterOptions } from 'react-hook-form';

export const convertToRegisterOptions = <T extends keyof ISendData>(
  field: T,
  rules?: IValidateRules,
): RegisterOptions<ISendData, T> => {
  if (!rules) return {} as RegisterOptions<ISendData, T>;

  return {
    required:
      typeof rules.required === 'object'
        ? rules.required
        : rules.required
        ? { value: true, message: rules.required as string }
        : undefined,
    min:
      typeof rules.min === 'object'
        ? rules.min
        : rules.min
        ? { value: rules.min, message: `Minimum ${rules.min}` }
        : undefined,
    max:
      typeof rules.max === 'object'
        ? rules.max
        : rules.max
        ? { value: rules.max, message: `Maximum ${rules.max}` }
        : undefined,
    minLength:
      typeof rules.minLength === 'object'
        ? rules.minLength
        : rules.minLength
        ? {
            value: rules.minLength,
            message: `Minimum length ${rules.minLength}`,
          }
        : undefined,
    maxLength:
      typeof rules.maxLength === 'object'
        ? rules.maxLength
        : rules.maxLength
        ? {
            value: rules.maxLength,
            message: `Maximum length ${rules.maxLength}`,
          }
        : undefined,
    pattern: rules.pattern,
    validate: rules.validate,
  } as RegisterOptions<ISendData, T>;
};

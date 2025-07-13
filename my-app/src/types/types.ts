import { AxiosInstance } from 'axios';

export type TApi = AxiosInstance | null;

export type TBody = IGetNews;

interface IGetNews {
  email: string;
}

// export interface ICustomizeFormData {
//   // amount: number;
//   // term: number;
//   firstName: string;
//   lastName: string;
//   middleName: string | null;
//   email: string;
//   birthdate: string | Date;
//   passportSeries: string;
//   passportNumber: string;
// }

export interface ISendData {
  firstName: string;
  lastName: string;
  middleName: string | null;
  email: string;
  birthdate: string;
  passportSeries: string;
  passportNumber: string;
}

export type TCustomizeFormData = IValidateForm[];

interface IValidateForm {
  label: string;
  placeholder: string;
  errors?: {
    required?:
      | string
      | {
          value?: boolean;
          message: string;
        };
    pattern?: {
      value?: string;
      message: string;
    };
    validate?: {
      func: (value: string) => string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
  };
}

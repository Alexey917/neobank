import { AxiosInstance } from 'axios';

export type TApi = AxiosInstance | null;

export type TBody = IGetNews | ISendData;

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
  amount: number;
  term: number;
  firstName: string;
  lastName: string;
  middleName: string | null;
  email: string;
  birthdate: string;
  passportSeries: string;
  passportNumber: string;
}

export type TCustomizeFormData = IValidateForm[];

export type IValidateRules = {
  required?: string | { value: boolean; message: string };
  min?: number | { value: number; message: string };
  max?: number | { value: number; message: string };
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: Record<string, (value: any) => boolean | string>;
};

interface IValidateForm {
  label?: string;
  field: keyof ISendData;
  placeholder?: string;
  valueAsNumber?: boolean;
  errors?: IValidateRules;
}

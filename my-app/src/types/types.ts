import { AxiosInstance } from 'axios';

export type TApi = AxiosInstance | null;

export type TBody = IGetNews | ISendData;

interface IGetNews {
  email: string;
}

export interface ISendData {
  amount: number;
  term: number;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  email: string;
  birthdate: string;
  passportSeries: string;
  passportNumber: string;
}

export interface IScoringData {
  gender: 'MALE' | 'FAMALE';
  maritalStatus: 'MARRIED' | 'DIVORCED' | 'SINGLE' | 'WIDOW_WIDOWER';
  dependentAmount: number;
  passportIssueDate: string;
  passportIssueBranch: string;
  employment: IEmploymentData;
  account: string;
}

interface IEmploymentData {
  employmentStatus:
    | 'UNEMPLOYED'
    | 'SELF_EMPLOYED'
    | 'EMPLOYED'
    | 'BUSINESS_OWNER';
  employerINN: number;
  salary: number;
  position: 'WORKER' | 'MID_MANAGER' | 'TOP_MANAGER' | 'OWNER';
  workExperienceTotal: number;
  workExperienceCurrent: number;
}

export type TCustomizeFormData = IValidateForm[];
export type TScoringFormData = IScoringForm[];

export interface ICustomizeOptions {
  key: number | string;
  value: string;
}

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
  options: ICustomizeOptions[];
  placeholder?: string;
  valueAsNumber?: boolean;
  errors?: IValidateRules;
}

interface IScoringForm {
  label?: string;
  field: keyof IScoringData | `employment.${keyof IEmploymentData}`;
  options: ICustomizeOptions[];
  placeholder?: string;
  valueAsNumber?: boolean;
  errors?: IValidateRules;
}

export interface IOffer {
  applicationId: number;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
  monthlyPayment: number;
  rate: number;
  requestedAmount: number;
  term: number;
  totalAmount: number;
}

export interface ISchedule {
  number: number;
  date: string;
  debtPayment: number;
  interestPayment: number;
  remainingDebt: number;
  totalPayment: number;
}

export interface ILoanDocument {
  schedule: ISchedule[];
}

export interface INewsParams {
  category: string;
  country: string;
  pageSize: string;
  [key: string]: string | undefined;
}

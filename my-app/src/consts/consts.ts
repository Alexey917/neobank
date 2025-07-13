import { isOver18 } from '../components/CustomizeCardForm/CustomizeCardForm';

export const DATA_FORM = [
  {
    label: 'Your last name',
    placeholder: 'For Example Doe',
    errors: {
      required: 'last name is required',
    },
  },
  {
    label: 'Your first name',
    placeholder: 'For Example Jhon',
    errors: {
      required: 'first name is required',
    },
  },
  {
    label: 'Your patronymic',
    placeholder: 'For Example Victorovich',
  },
  { label: 'Select term', placeholder: '6 month' },
  {
    label: 'Your email',
    placeholder: 'test@gmail.com',
    errors: {
      required: {
        value: true,
        message: 'Email is required',
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      },
    },
  },
  {
    label: 'Your date of birth',
    placeholder: 'Select Date and Time',
    errors: {
      required: {
        value: true,
        message: 'Date of birth is required',
      },
      pattern: {
        value: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        message: 'Please use format YYYY-MM-DD',
      },
      validate: {
        isOver18: (value: string) =>
          isOver18(value) || 'You must be over 18 years old',
      },
    },
  },
  {
    label: 'Your passport series',
    placeholder: '0000',
    errors: {
      required: {
        value: true,
        message: 'Passport series is required',
      },
      minLength: {
        value: 4,
        message: 'The series must consist of 4 digits',
      },
      maxLength: {
        value: 4,
        message: 'The series must consist of 4 digits',
      },
    },
  },
  {
    label: 'Your passport number',
    placeholder: '000000',
    required: true,
    errors: {
      required: {
        value: true,
        message: 'Passport number is required',
      },
      minLength: {
        value: 6,
        message: 'The number must consist of 6 digits',
      },
      maxLength: {
        value: 6,
        message: 'The number must consist of 6 digits',
      },
    },
  },
];

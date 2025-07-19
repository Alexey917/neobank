import { isOver18 } from '../utils/isOver18';
import money from '../assets/sprite.svg';
import calendar from '../assets/sprite.svg';
import clock from '../assets/sprite.svg';
import bag from '../assets/sprite.svg';
import card from '../assets/sprite.svg';
import { TCustomizeFormData } from '../types/types';

export const DATA_FORM: TCustomizeFormData = [
  {
    field: 'amount',
    valueAsNumber: true,
    errors: {
      required: {
        value: true,
        message: 'Enter amount',
      },
      min: {
        value: 15000,
        message: 'At least 15,000',
      },
      max: {
        value: 600000,
        message: 'No more than 600,000',
      },
    },
  },
  {
    label: 'Your last name',
    field: 'lastName',
    placeholder: 'For Example Doe',
    errors: {
      required: 'last name is required',
    },
  },
  {
    label: 'Your first name',
    field: 'firstName',
    placeholder: 'For Example Jhon',
    errors: {
      required: 'first name is required',
    },
  },
  {
    label: 'Your patronymic',
    field: 'middleName',
    placeholder: 'For Example Victorovich',
  },
  { label: 'Select term', field: 'term', placeholder: '6 month' },
  {
    label: 'Your email',
    field: 'email',
    placeholder: 'test@gmail.com',
    errors: {
      required: {
        value: true,
        message: 'Email is required',
      },
      pattern: {
        value:
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Invalid email address',
      },
    },
  },
  {
    label: 'Your date of birth',
    field: 'birthdate',
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
    field: 'passportSeries',
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
    field: 'passportNumber',
    placeholder: '000000',
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

export const RECEIVE_CARD = [
  {
    question: 'How to get a card?',
    answer:
      'We will deliver your card by courier free of charge. Delivery in Moscow and St. Petersburg - 1-2 working days. For other regions of the Russian Federation - 2-5 working days.',
  },

  {
    question:
      'What documents are needed and how old should one be to get a card?',
    answer: 'Need a passport. You must be between 20 and 70 years old.',
  },

  {
    question: 'In what currency can I issue a card?',
    answer: 'In rubles, dollars or euro',
  },

  {
    question: 'How much income do I need to get a credit card?',
    answer:
      'To obtain a credit card, you will need an income of at least 25,000 rubles per month after taxes.',
  },

  {
    question: "How do I find out about the bank's decision on my application?",
    answer:
      'After registration, you will receive an e-mail with a decision on your application.',
  },
];

export const USING_CARD = [
  {
    question: 'What is an interest free credit card?',
    answer:
      'A credit card with a grace period is a bank card with an established credit limit, designed for payment, reservation of goods and services, as well as for receiving cash, which allows you to use credit funds free of charge for a certain period.',
  },

  {
    question: 'How to activate a credit card',
    answer:
      'You can activate your credit card and generate a PIN code immediately after receiving the card at a bank branch using a PIN pad.',
  },

  {
    question: 'What is a settlement date?',
    answer:
      'The settlement date is the date from which you can pay off the debt for the reporting period. The settlement date falls on the first calendar day following the last day of the reporting period. The first settlement date is reported by the bank when transferring the issued credit card to the client, and then in the monthly account statement.',
  },

  {
    question: 'What do I need to know about interest rates?',
    answer:
      'For each reporting period from the 7th day of the previous month to the 6th day of the current month inclusive, a statement is generated for the credit card. The statement contains information on the amount and timing of the minimum payment, as well as the total amount of debt as of the date of issue.',
  },
];

export const RATES = [
  {
    title: 'Card currency',
    text: 'Rubles, dollars, euro',
  },

  {
    title: 'Interest free period',
    text: '0% up to 160 days',
  },

  {
    title: 'Payment system',
    text: 'Mastercard, Visa',
  },

  {
    title: 'Maximum credit limit on the card',
    text: '600 000 ₽',
  },

  {
    title: 'Replenishment and withdrawal',
    text: 'At any ATM. Top up your credit card for free with cash or transfer from other cards',
  },

  {
    title: 'Max cashback per month',
    text: '15 000 ₽',
  },

  {
    title: 'Transaction Alert',
    text: '60 ₽ — SMS or push notifications',
    textBr:
      '0 ₽ — card statement, information about transactions in the online bank',
  },
];

export const ABOUT_TAB = [
  {
    svg: money,
    svgId: 'money',
    title: 'Up to 50 000 ₽',
    text: 'Cash and transfers without commission and percent',
  },

  {
    svg: calendar,
    svgId: 'calendar',
    title: 'Up to 160 days',
    text: 'Without percent on the loan',
  },

  {
    svg: clock,
    svgId: 'clock',
    title: 'Free delivery',
    text: 'We will deliver your card by courier at a convenient place and time for you',
  },

  {
    svg: bag,
    svgId: 'bag',
    title: 'Up to 12 months',
    text: 'No percent. For equipment, clothes and other purchases in installments',
  },

  {
    svg: card,
    svgId: 'card',
    title: 'Convenient deposit and withdrawal',
    text: 'At any ATM. Top up your credit card for free with cash or transfer from other cards',
  },
];

export const CASHBACK_TAB = [
  {
    title: 'For food delivery, cafes and restaurants',
    text: '5%',
  },

  {
    title: 'In supermarkets with our subscription',
    text: '5%',
  },

  {
    title: "In clothing stores and children's goods",
    text: '2%',
  },

  {
    title: 'Other purchases and payment of services and fines',
    text: '1%',
  },

  {
    title: 'Shopping in online stores',
    text: 'up to 3%',
  },

  {
    title: 'Purchases from our partners',
    text: '30%',
  },
];

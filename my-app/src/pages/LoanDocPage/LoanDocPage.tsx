import React, { useEffect, useState } from 'react';
import { LoanDocument } from '../../components/LoanDocument/LoanDocument';
import { getSchedule } from '../../API/api';
import { ISchedule } from '../../types/types';

import classes from './LoanDocPage.module.scss';

export const LoanDocPage = () => {
  const [schedule, setSchedule] = useState<ISchedule[]>([]);

  const getData = async () => {
    let data = localStorage.getItem('offers');
    if (!data || data.trim() === '') {
      return;
    }
    try {
      const getId = JSON.parse(data);
      const response = await getSchedule(getId[0].applicationId);
      setSchedule(response?.data.credit.paymentSchedule);
      console.log(response?.data.credit.paymentSchedule);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className={classes.main}>
      <LoanDocument schedule={schedule} />
    </main>
  );
};

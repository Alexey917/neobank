import React, { useEffect } from 'react';
import { LoanDocument } from '../../components/LoanDocument/LoanDocument';
import { getSchedule } from '../../API/api';

import classes from './LoanDocPage.module.scss';

export const LoanDocPage = () => {
  const getData = async () => {
    let data = localStorage.getItem('offers');
    if (!data || data.trim() === '') {
      return;
    }
    try {
      const getId = JSON.parse(data);
      const response = await getSchedule(getId[0].applicationId);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className={classes.main}>
      <LoanDocument />
    </main>
  );
};

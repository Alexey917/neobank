import React, { FC } from 'react';
import { ISchedule, ILoanDocument } from '../../../types/types';

import classes from './Table.module.scss';

const HEADERS_TABLE = [
  'NUMBER',
  'DATE',
  'TOTAL PAYMENT',
  'INTEREST PAYMENT',
  'DEBT PAYMENT',
  'REMAINING DEBT',
];

export const Table: FC<ILoanDocument> = ({ schedule }) => {
  return (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr className={classes.headerRow}>
          {HEADERS_TABLE.map((header) => (
            <th key={header} className={classes.th}>
              <div className={classes.headerContent}>
                {header}
                <button className={classes.sortButton}>
                  {/* Вставьте вашу SVG иконку здесь */}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody className={classes.tbody}>
        {schedule.map((item, index) => (
          <tr key={index} className={classes.row}>
            <td className={classes.td}>{item.number}</td>
            <td className={classes.td}>{item.date}</td>
            <td className={classes.td}>{item.totalPayment}</td>
            <td className={classes.td}>{item.interestPayment}</td>
            <td className={classes.td}>{item.debtPayment}</td>
            <td className={classes.td}>{item.remainingDebt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

import React, { FC, useState, useMemo } from 'react';
import { ILoanDocument } from '../../../types/types';

import classes from './Table.module.scss';
import arrowDown from '../../../assets/sprite.svg';

const HEADERS_TABLE = [
  { id: 'number', text: 'NUMBER' },
  { id: 'date', text: 'DATE' },
  { id: 'totalPayment', text: 'TOTAL PAYMENT' },
  { id: 'interestPayment', text: 'INTEREST PAYMENT' },
  { id: 'debtPayment', text: 'DEBT PAYMENT' },
  { id: 'remainingDebt', text: 'REMAINING DEBT' },
];

export const Table: FC<ILoanDocument> = ({ schedule }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const sortedSchedule = useMemo(() => {
    if (!sortConfig) return schedule;

    return [...schedule].sort((a, b) => {
      // Для числовых значений
      if (
        [
          'number',
          'totalPayment',
          'interestPayment',
          'debtPayment',
          'remainingDebt',
        ].includes(sortConfig.key)
      ) {
        const valueA = Number(a[sortConfig.key as keyof typeof a]);
        const valueB = Number(b[sortConfig.key as keyof typeof b]);
        return sortConfig.direction === 'asc'
          ? valueB - valueA
          : valueA - valueB;
      }

      // Для дат
      if (sortConfig.key === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortConfig.direction === 'asc' ? dateB - dateA : dateA - dateB;
      }

      // Для строк (по умолчанию)
      const valueA = String(a[sortConfig.key as keyof typeof a]);
      const valueB = String(b[sortConfig.key as keyof typeof b]);
      return sortConfig.direction === 'asc'
        ? valueB.localeCompare(valueA)
        : valueA.localeCompare(valueB);
    });
  }, [schedule, sortConfig]);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
      let res = schedule.map((item) => item);
      console.log(res);
    }

    schedule;
    setSortConfig({ key, direction });
  };

  return (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr className={classes.headerRow} aria-sort="none">
          {HEADERS_TABLE.map((header) => (
            <th key={header.id} className={classes.th}>
              <div className={classes.headerContent}>
                {header.text}
                <button
                  type="button"
                  className={classes.sortButton}
                  onClick={() => handleSort(header.id)}
                >
                  <svg
                    className={`${classes.sortButton__icon} ${
                      sortConfig?.key === header.id
                        ? classes[`sort-${sortConfig.direction}`]
                        : ''
                    }`}
                    aria-hidden="true"
                    focusable="false"
                  >
                    <use href={arrowDown + '#arrowDown'}></use>
                  </svg>
                </button>
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody className={classes.tbody}>
        {sortedSchedule.map((item, index) => (
          <tr key={index} className={classes.row} aria-rowindex={index + 2}>
            <td className={classes.td} data-label="Number">
              {item.number}
            </td>
            <td className={classes.td} data-label="Date">
              {item.date}
            </td>
            <td className={classes.td} data-label="Total payment">
              {item.totalPayment}
            </td>
            <td className={classes.td} data-label="Interest payment">
              {item.interestPayment}
            </td>
            <td className={classes.td} data-label="Debt payment">
              {item.debtPayment}
            </td>
            <td className={classes.td} data-label="Remaining debt">
              {item.remainingDebt}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

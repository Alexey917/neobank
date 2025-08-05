import React, { FC, useRef, useEffect } from 'react';

import classes from './Accordion.module.scss';
import arrow from '../../../assets/sprite.svg';

interface IAccordion {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export const Accordion: FC<IAccordion> = ({
  question,
  answer,
  isOpen,
  onClick,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.style.transform = isOpen
        ? 'rotate(180deg)'
        : 'rotate(0deg)';
    }
  }, [isOpen]);

  return (
    <article className={classes.accordion}>
      <div className={classes.accordion__wrapper}>
        <p className={classes.accordion__question}>{question}</p>
        {isOpen && <p className={classes.accordion__answer}>{answer}</p>}
      </div>
      <button
        onClick={onClick}
        className={classes.accordion__btn}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${question.replace(/\s+/g, '-')}`}
      >
        <svg
          className={classes.accordion__icon}
          ref={svgRef}
          aria-hidden="true"
          focusable="false"
        >
          <use href={arrow + '#arrow'}></use>
        </svg>
      </button>
    </article>
  );
};

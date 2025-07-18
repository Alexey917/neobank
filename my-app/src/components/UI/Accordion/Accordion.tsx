import React, { FC, useRef, useState } from 'react';

import classes from './Accordion.module.scss';
import arrow from '../../../assets/sprite.svg';

interface IAccordion {
  question: string;
  answer: string;
}

export const Accordion: FC<IAccordion> = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const toggleAccordion = () => {
    setShowAnswer((prev) => !prev);
    if (svgRef.current) {
      svgRef.current.style.transform = showAnswer
        ? 'rotate(0deg)'
        : 'rotate(180deg)';
    }
  };

  return (
    <article className={classes.accordion}>
      <div className={classes.accordion__wrapper}>
        <p className={classes.accordion__question}>{question}</p>
        {showAnswer ? (
          <p className={classes.accordion__answer}>{answer}</p>
        ) : (
          ''
        )}
      </div>
      <button
        onClick={toggleAccordion}
        className={classes.accordion__btn}
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

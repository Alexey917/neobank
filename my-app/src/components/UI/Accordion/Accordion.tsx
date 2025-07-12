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
    <article>
      <div>
        <p>{question}</p>
        {showAnswer ? <p>{answer}</p> : ''}
      </div>
      <button onClick={toggleAccordion}>
        <svg className={classes.accordion__icon} ref={svgRef}>
          <use href={arrow + '#arrow'}></use>
        </svg>
      </button>
    </article>
  );
};

import React from 'react';
import { Accordion } from '../UI/Accordion/Accordion';

export const FaqTab = () => {
  return (
    <div>
      <Accordion
        question="How to get a card?"
        answer="We will deliver your card by courier free of charge. Delivery in Moscow and St. Petersburg - 1-2 working days. For other regions of the Russian Federation - 2-5 working days."
      />
    </div>
  );
};

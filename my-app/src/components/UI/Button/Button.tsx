import React, { ComponentProps, ElementType, FC, ReactNode } from 'react';

import classes from './Button.module.scss';

interface IButtonOwnProps<E extends ElementType = ElementType> {
  children: ReactNode;
  styleElem: string;
  as?: E;
}

type ButtonProps<E extends ElementType> = IButtonOwnProps<E> &
  Omit<ComponentProps<E>, keyof IButtonOwnProps>;

const defaultElement = 'button';

export const Button = <E extends ElementType = typeof defaultElement>({
  children,
  styleElem,
  as,
  ...otherProps
}: ButtonProps<E>) => {
  const TagName = as || defaultElement;

  return (
    <>
      <TagName className={classes[styleElem]} {...otherProps}>
        {children}
      </TagName>
    </>
  );
};

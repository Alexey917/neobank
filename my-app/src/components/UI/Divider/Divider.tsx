import { FC } from 'react';
import classes from './Divider.module.scss';

type DividerOrientation = 'horizontal' | 'vertical';
type DividerVariant = 'solid' | 'dashed';

interface IDividerProps {
  width: number;
  thickness: number;
  orientation: DividerOrientation;
  variant?: DividerVariant;
}

export const Divider: FC<IDividerProps> = ({
  width,
  thickness,
  orientation,
  variant,
}) => {
  return (
    <div
      className={classes.divider}
      style={{
        width: orientation === 'horizontal' ? `${width}rem` : `${thickness}rem`,
        height: orientation === 'vertical' ? `${width}rem` : `${thickness}rem`,
        borderStyle: variant,
      }}
    ></div>
  );
};

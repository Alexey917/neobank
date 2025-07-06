import { FC } from 'react';
import classes from './Divider.module.scss';

type DividerOrientation = 'horizontal' | 'vertical';
type DividerVariant = 'solid' | 'dashed';
type DividerColor = 'grey' | 'blue-grey' | 'grey-dashed';

interface IDividerProps {
  width: number;
  thickness: number;
  orientation: DividerOrientation;
  variant: DividerVariant;
  color: DividerColor;
}

export const Divider: FC<IDividerProps> = ({
  width,
  thickness,
  orientation,
  variant,
  color,
}) => {
  return (
    <div
      className={classes.divider}
      style={{
        width: orientation === 'horizontal' ? `${width}rem` : `${thickness}rem`,
        height: orientation === 'vertical' ? `${width}rem` : `${thickness}rem`,
        borderStyle: variant,
        color:
          color === 'grey'
            ? 'rgba(128, 128, 128, 0.2)'
            : color === 'grey-dashed'
            ? 'rgba(128, 128, 128, 0.2)'
            : 'rgba(127, 146, 172, 1)',
      }}
    ></div>
  );
};

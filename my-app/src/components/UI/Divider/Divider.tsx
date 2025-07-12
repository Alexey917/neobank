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
      className={orientation === 'vertical' ? classes.borderVertical : ''}
      style={{
        width: orientation === 'horizontal' ? `${width}rem` : 0,
        height: orientation === 'vertical' ? `${width}rem` : 0,
        borderBottom: `${thickness}rem ${variant} ${
          color === 'grey'
            ? 'rgba(128, 128, 128, 0.2)'
            : color === 'grey-dashed'
            ? 'rgba(128, 128, 128, 0.4)'
            : 'rgba(127, 146, 172, 1)'
        }`,
      }}
    ></div>
  );
};

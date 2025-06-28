import spinner from '../../../assets/sprite.svg';
import classes from './Spinner.module.scss';

export const Spinner = () => {
  return (
    <>
      <svg className={classes.spinner} width="70px" height="70px">
        <use href={spinner + '#spinner'}></use>
      </svg>
    </>
  );
};

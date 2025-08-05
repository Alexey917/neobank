import spinner from '../../../assets/sprite.svg';
import classes from './Loader.module.scss';

export const Loader = () => {
  return (
    <>
      <svg className={classes.spinner} width="70px" height="70px">
        <use href={spinner + '#spinner'}></use>
      </svg>
    </>
  );
};

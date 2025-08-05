import React, { FC } from 'react';
import { CustomButton } from '../CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { switchStep } from '../../../redux/features/steps/stepSlice';

import classes from './ModalWindow.module.scss';
import closeModal from '../../../assets/sprite.svg';

interface IModal {
  text: string;
  setIsModal: (bol: boolean) => void;
  setIsDeny?: (bol: boolean) => void;
  isDeny?: boolean;
}

export const ModalWindow: FC<IModal> = ({
  text,
  setIsModal,
  isDeny,
  setIsDeny,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDenyClick = () => {
    if (setIsDeny) {
      setIsDeny(true);
    }
    localStorage.removeItem('offers');
    dispatch(switchStep('BEGIN'));
  };

  const handleCloseClick = () => {
    isDeny ? navigate('/') : setIsModal(false);
  };

  return (
    <div
      className={classes.modal__overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={classes.modal__content}>
        <div className={classes.modal__titleWrapper}>
          <h3 id="modal-title" className={classes.modal__title}>
            Deny application
          </h3>
          <button
            type="button"
            onClick={handleCloseClick}
            className={classes.modal__btn}
            aria-label="Close modal window"
          >
            <svg
              className={classes.modal__icon}
              aria-hidden="true"
              focusable="false"
            >
              <use href={closeModal + '#closeModal'}></use>
            </svg>
          </button>
        </div>

        <p id="modal-description" className={classes.modal__text}>
          {text}
        </p>

        <div className={classes.modal__buttonsWrapper}>
          {isDeny ? (
            <CustomButton
              text="Go home"
              paddings="pDoc"
              variant="primary"
              aria-label="Go to homepage"
              onClick={() => navigate('/')}
            />
          ) : (
            <>
              <CustomButton
                text="Deny"
                paddings="pDoc"
                variant="danger"
                aria-label="Deny application"
                onClick={handleDenyClick}
              />
              <CustomButton
                text="Cancel"
                paddings="pCancel"
                variant="primary"
                aria-label="Cancel and close modal"
                onClick={() => setIsModal(false)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

import { FC } from 'react';
import { Link } from 'react-router-dom';

import classes from './Footer.module.scss';
import neoLogo from '../../assets/images/neoLogo.png';
import { CustomLink } from '../UI/CustomLink/CustomLink';

const LINKS = {
  'About bank': '/about',
  'Ask a Question': '/questions',
  'Quality of service': '/quality',
  'Requisites': '/requisites',
  'Press center': '/press',
  'Bank career': '/career',
  'Investors': '/investors',
  'Analytics': '/analytics',
  'Business and processes': '/business',
  'Compliance and business ethics': '/compliance',
};

export const Footer: FC = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer__wrapper}>
        <div className={classes.footer__contactsWrapper}>
          <Link to="https://www.neoflex.ru/" aria-label="Neoflex homepage">
            <img
              src={neoLogo}
              alt="Neoflex"
              className={classes.footer__neoLogo}
            />
          </Link>
          <address className={classes.footer__contacts}>
            <Link to="tel:+74959842513" className={classes.footer__phone}>
              +7 (495) 984 25 13
            </Link>
            <Link to="mailto:info@neoflex.ru" className={classes.footer__email}>
              info@neoflex.ru
            </Link>
          </address>
        </div>
        <nav>
          <ul className={classes.footer__list}>
            {Object.entries(LINKS).map(([key, value]) => (
              <li key={key}>
                <CustomLink to={value} variant="footer" paddings="pNav">
                  {key}
                </CustomLink>
              </li>
            ))}
          </ul>
        </nav>
        <hr className={classes.footer__separator} aria-hidden="true" />
        <p className={classes.footer__text}>
          We use cookies to personalize our services and improve the user
          experience of our website. Cookies are small files containing
          information about previous visits to a website. If you do not want to
          use cookies, please change your browser settings
        </p>
      </div>
    </footer>
  );
};

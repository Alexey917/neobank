import { Link } from 'react-router-dom';
import { FooterItem } from '../FooterItem/FooterItem';

import classes from './Footer.module.scss';
import neoLogo from '../../assets/images/neoLogo.png';

export const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer__wrapper}>
        <div className={classes.footer__contactsWrapper}>
          <Link to="#">
            <img
              src={neoLogo}
              alt="Neoflex-logo"
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
            <FooterItem to="#">About bank</FooterItem>
            <FooterItem to="#">Ask a Question</FooterItem>
            <FooterItem to="#">Quality of service</FooterItem>
            <FooterItem to="#">Requisites</FooterItem>
            <FooterItem to="#">Press center</FooterItem>
            <FooterItem to="#">Bank career</FooterItem>
            <FooterItem to="#">Investors</FooterItem>
            <FooterItem to="#">Analytics</FooterItem>
            <FooterItem to="#">Business and processes</FooterItem>
            <FooterItem to="#">Compliance and business ethics</FooterItem>
          </ul>
        </nav>
        <hr className={classes.footer__separator} />
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

import { Link } from 'react-router-dom';
import { FooterItem } from '../FooterItem/FooterItem';

import classes from './Footer.module.scss';
import neoLogo from '../../assets/images/neoLogo.png';

export const Footer = () => {
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
            <FooterItem to="about">About bank</FooterItem>
            <FooterItem to="faq">Ask a Question</FooterItem>
            <FooterItem to="quality">Quality of service</FooterItem>
            <FooterItem to="requisites">Requisites</FooterItem>
            <FooterItem to="press">Press center</FooterItem>
            <FooterItem to="careers">Bank career</FooterItem>
            <FooterItem to="investors">Investors</FooterItem>
            <FooterItem to="analytics">Analytics</FooterItem>
            <FooterItem to="business">Business and processes</FooterItem>
            <FooterItem to="compliance">
              Compliance and business ethics
            </FooterItem>
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

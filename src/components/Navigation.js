import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './css/Navigation.module.css';

const Navigtaion = ({ userObj }) => (
  <nav>
    <ul className={styles.container}>
      <li>
        <Link to="/" className={styles.Home}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/profile" className={styles.profile}>
          {' '}
          <span>
            {userObj.displayName
              ? `${userObj.displayName}의 Profile`
              : 'Profile'}
          </span>
        </Link>
      </li>
    </ul>
  </nav>
);
export default Navigtaion;

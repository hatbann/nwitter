import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './css/Navigation.module.css';

const Navigtaion = ({ userObj, chat, setChat }) => (
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
      <li>
        {chat ? (
          <Link to="/">
            <button onClick={() => setChat(!chat)}>홈으로 돌아가기</button>
          </Link>
        ) : (
          <Link to="/chatroom">
            <button onClick={() => setChat(!chat)}>채팅하기</button>
          </Link>
        )}
      </li>
    </ul>
  </nav>
);
export default Navigtaion;

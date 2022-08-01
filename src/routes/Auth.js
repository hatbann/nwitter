import { async } from '@firebase/util';
import { authService, firebaseInstance } from '../fbase';
import React, { useState } from 'react';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGoogle,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

import AuthForm from '../components/AuthForm';
import styles from './Auth.module.css';

const Auth = () => {
  //variables

  //functions
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    try {
      let result;
      if (name === 'google') {
        provider = new GoogleAuthProvider();
        result = await signInWithPopup(authService, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
      } else if (name === 'github') {
        provider = new GithubAuthProvider();
        result = await signInWithPopup(authService, provider);
        const credential = GithubAuthProvider.credentialFromResult(result);
      }
    } catch (error) {}
  };

  return (
    <div className={styles.container}>
      <AuthForm />
      <div>
        <button
          onClick={onSocialClick}
          name="google"
          className={`${styles.authBtn} ${styles.Google}`}
        >
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button
          onClick={onSocialClick}
          name="github"
          className={styles.authBtn}
        >
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};
export default Auth;

import { async } from '@firebase/util';
import { authService, firebaseInstance } from '../fbase';
import React, { useState } from 'react';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import AuthForm from '../components/AuthForm';

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
      console.log(result);
    } catch (error) {}
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;

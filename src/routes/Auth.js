import { async } from '@firebase/util';
import { authService, firebaseInstance } from 'fbase';
import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

const Auth = () => {
  //variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAcount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  //functions
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (newAcount) {
        //create account
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        //log in
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (e) {
      if (e.message === 'Firebase: Error (auth/email-already-in-use).') {
        setError('이미 계정이 존재합니다');
      } else {
        setError(e.message);
      }
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

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
      <form onSubmit={onSubmit}>
        <input
          name="email"
          onChange={onChange}
          type="email"
          placeholder="Email"
          required
          value={email}
        ></input>
        <input
          name="password"
          onChange={onChange}
          type="password"
          placeholder="Password"
          required
          value={password}
        ></input>
        <input
          type="submit"
          value={newAcount ? 'Create Account' : 'Log In'}
        ></input>
      </form>
      <div>{error}</div>
      <span onClick={toggleAccount}>
        {newAcount ? 'Create Account' : 'Sign in'}
      </span>
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

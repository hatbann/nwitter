import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import styles from './css/AuthForm.module.css';

const AuthForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAcount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
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

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          onChange={onChange}
          type="email"
          placeholder="Email"
          required
          value={email}
          className="authInput"
        ></input>
        <input
          name="password"
          onChange={onChange}
          type="password"
          placeholder="Password"
          required
          value={password}
          className="authInput"
        ></input>
        <input
          type="submit"
          value={newAcount ? 'Create Account' : 'Log In'}
          className="authInput"
        ></input>
        <div>{error && <span className="authError">{error}</span>}</div>
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAcount ? 'Create Account' : 'Sign in'}
      </span>
    </>
  );
};

export default AuthForm;

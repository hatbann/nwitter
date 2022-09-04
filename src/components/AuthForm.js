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
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>{newAcount ? '회원가입' : '로그인'}</h1>
        <div onClick={toggleAccount} className={styles.AuthSwitch}>
          {newAcount ? '로그인 하기' : '회원가입하기'}
        </div>
      </div>
      <form onSubmit={onSubmit} className={styles.inputForm}>
        <div className={styles.authInput}>
          <div className={styles.authInputLeft}>
            <input
              name="email"
              onChange={onChange}
              type="email"
              placeholder="Email"
              required
              value={email}
              className={styles.authInputDetail}
            ></input>
            <input
              name="password"
              onChange={onChange}
              type="password"
              placeholder="Password"
              required
              value={password}
              className={styles.authInputDetail}
            ></input>
          </div>
          <div>
            {' '}
            <input
              type="submit"
              value={newAcount ? '회원가입' : '로그인'}
              className={styles.submit}
            ></input>
          </div>
        </div>
        <div>
          {error && (
            <span className="authError">
              {error === 'Firebase: Error (auth/wrong-password).'
                ? '비밀번호 오류'
                : error}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;

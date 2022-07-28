import AppRouter from './Router';
import { getAuth, onAuthStateChanged, updateCurrentUser } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { authService } from '../fbase';

function App() {
  const [init, setIntit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setIntit(true);
    });
  }, []);

  const refreshUser = async () => {
    const user = authService.currentUser;
    setUserObj({ ...user });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        'Initializing....'
      )}
      <footer>&copy; Hatban {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;

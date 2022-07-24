import { signOut } from 'firebase/auth';
import React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    const auth = getAuth();
    signOut(auth);
    history.push('/');
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;

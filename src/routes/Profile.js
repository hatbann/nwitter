import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import dbService from '../fbase';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { async } from '@firebase/util';

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const history = useHistory();
  const onLogOutClick = () => {
    const auth = getAuth();
    signOut(auth);
    history.push('/');
  };

  const getMyNweets = async () => {
    const q = query(
      collection(dbService, 'nweets')
        .where('createrId', '==', userObj.uid)
        .orderBy('createdAt', 'desc')
    );

    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
    }
    refreshUser();
  };

  useEffect(() => {}, []);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display Name"
          onChange={onChange}
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;

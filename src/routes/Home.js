import React, { useEffect, useState } from 'react';
import dbService, { storageService } from '../fbase';
import { collection, orderBy, onSnapshot, query } from 'firebase/firestore';
import Nweet from '../components/nweet';
import NweetFactory from '../components/NweetFactory';
import styles from './Home.module.css';

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, 'nweets'),
      orderBy('createdAt', 'desc')
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  return (
    <div>
      <NweetFactory userObj={userObj} />
      <div className={styles.nweet}>
        {nweets.map((nweet) => (
          <Nweet
            nweetObj={nweet}
            key={nweet.id}
            isOwner={nweet.createrId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;

import React, { useEffect, useState } from 'react';
import dbService, { storageService } from '../fbase';
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  orderBy,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import Nweet from '../components/nweet';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const [imgfile, setImgFile] = useState();

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

  const onSubmit = async (event) => {
    event.preventDefault();
    let imgfileURL = '';
    if (imgfile !== '') {
      const imgfileRef = ref(storageService, `${userObj.uid}/${v4()}`);
      await uploadString(imgfileRef, imgfile, 'data_url');
      imgfileURL = await getDownloadURL(ref(storageService, imgfileRef));
    }
    const nweetObj = {
      text: nweet,
      createdAt: serverTimestamp(),
      createrId: userObj.uid,
      imgfileURL,
    };
    await addDoc(collection(dbService, 'nweets'), nweetObj);
    setNweet('');
    setImgFile('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const image = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setImgFile(result);
    };
    reader.readAsDataURL(image);
  };

  const onClearImg = (event) => {
    setImgFile(null);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="what's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input onSubmit={onSubmit} type="submit" value="Nweet" />
        {imgfile && (
          <div>
            <img src={imgfile} width="100px" height="100px" />
            <button onClick={onClearImg}>Clear</button>
          </div>
        )}
      </form>
      <div>
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

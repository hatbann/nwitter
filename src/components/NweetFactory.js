import React, { useState } from 'react';
import dbService, { storageService } from '../fbase';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './css/nweetFactory.module.css';

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [imgfile, setImgFile] = useState();

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
    setImgFile('');
  };

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <div className={styles.top}>
        {' '}
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="what's on your mind?"
          maxLength={120}
          className={styles.inputMind}
        />
        <label for="attach-file" className={styles.factoryInput_label}>
          <span>Add Photo</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          id="attach-file"
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
      </div>
      <input
        onSubmit={onSubmit}
        type="submit"
        value="Nweet"
        className={styles.Nweet}
      />
      {imgfile && (
        <div>
          <img src={imgfile} width="100px" height="100px" />
          <button onClick={onClearImg}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;

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
  const [imgfile, setImgFile] = useState('');

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
        <input
          onSubmit={onSubmit}
          type="submit"
          value="Nweet"
          className={styles.Nweet}
        />
      </div>
      <label for="attach-file" className={styles.factoryInput_label}>
        <span
          style={{ fontSize: '12px', marginRight: '5px', color: ' #63dfff' }}
        >
          Add Photo
        </span>
        <FontAwesomeIcon
          icon={faPlus}
          style={{ fontSize: '10px', color: '#63dfff' }}
        />
      </label>
      <input
        id="attach-file"
        style={{ display: 'none' }}
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />
      {imgfile && (
        <div className={styles.attached}>
          <img src={imgfile} className={styles.attachedImg} />
          <div className={styles.imgClear} onClick={onClearImg}>
            <span
              style={{ fontSize: '11px', marginRight: '5px', color: '#383838' }}
            >
              Remove
            </span>
            <FontAwesomeIcon
              icon={faTimes}
              style={{ fontSize: '11px', color: '#383838' }}
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;

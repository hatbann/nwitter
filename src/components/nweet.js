import { async } from '@firebase/util';
import dbService, { storageService } from '../fbase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from '@firebase/storage';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './css/nweet.module.css';

const Nweet = ({ nweetObj, isOwner }) => {
  const NweetTextRef = doc(dbService, 'nweets', `${nweetObj.id}`);
  const desertRef = ref(storageService, nweetObj.imgfileURL);
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you Sure you want to delete?');
    console.log(nweetObj);
    if (ok) {
      try {
        //delete
        await deleteDoc(NweetTextRef);
        if (nweetObj.imgfileURL !== '') {
          await deleteObject(desertRef);
        }
      } catch (error) {
        window.alert('삭제에 실패했습니다');
      }
    }
  };

  const toggleEditing = async () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(NweetTextRef, {
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div className={styles.container}>
      {editing ? (
        <>
          {' '}
          <form onSubmit={onSubmit} className={styles.nweetEdit}>
            <input type="text" onChange={onChange} value={newNweet} required />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <div className={styles.nweet}>
          {nweetObj.imgfileURL && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontWeight: '600',
              }}
            >
              {' '}
              <img src={nweetObj.imgfileURL} className={styles.nweet_img} />
            </div>
          )}
          <div className={styles.content}>
            <p className={styles.text}>{nweetObj.text}</p>
            {isOwner && (
              <div>
                <span
                  onClick={onDeleteClick}
                  class={`${styles.actions} ${styles.delete}`}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span
                  onClick={toggleEditing}
                  class={`${styles.actions} ${styles.edit}`}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Nweet;

import { async } from '@firebase/util';
import dbService, { storageService } from '../fbase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from '@firebase/storage';
import React, { useState } from 'react';

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
    <div>
      {editing ? (
        <>
          {' '}
          <form onSubmit={onSubmit}>
            <input type="text" onChange={onChange} value={newNweet} required />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          {nweetObj.imgfileURL && (
            <img src={nweetObj.imgfileURL} width="100px" height="100px" />
          )}
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;

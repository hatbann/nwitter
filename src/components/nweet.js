import { async } from '@firebase/util';
import { dbService } from 'fbase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';

const Nweet = ({ nweetObj, isOwner }) => {
  const NweetTextRef = doc(dbService, 'nweets', `${nweetObj.id}`);
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you Sure you want to delete?');
    if (ok) {
      //delete
      await deleteDoc(NweetTextRef);
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

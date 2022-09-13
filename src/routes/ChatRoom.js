import React, { useEffect, useState, useRef } from 'react';
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  limit,
} from 'firebase/firestore';
import dbService, { storageService, authService } from '../fbase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ChatRoom = ({ refreshUser, userObj }) => {
  const username = userObj.displayName;
  const [input, setInput] = useState('');

  const dummy = useRef();
  const messagesRef = collection(dbService, 'messages');
  const q = query(messagesRef, orderBy('createdAt'), limit(25));

  const [messages] = useCollectionData(q, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = authService.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: dbService.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
};

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass =
    uid === authService.currentUser.uid ? 'sent' : 'received';

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'
          }
        />
        <p>{text}</p>
      </div>
    </>
  );
}

export default ChatRoom;

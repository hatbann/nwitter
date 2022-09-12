import React, { useEffect, useState } from 'react';
import dbService, { storageService } from '../fbase';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import {
  addDoc,
  collection,
  serverTimestamp,
  orderBy,
  onSnapshot,
  query,
} from 'firebase/firestore';

import ChatMessage from '../components/ChatMessage';
import { async } from '@firebase/util';

const ChatRoom = ({ refreshUser, userObj }) => {
  const username = userObj.displayName;
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const q = query(
      collection(dbService, 'messages'),
      orderBy('timestamp', 'desc')
    );
    onSnapshot(q, (snapshot) => {
      const messageArr = snapshot.docs.map((document) => ({
        id: document.id,
        message: document.data(),
      }));
      setMessages(messageArr);
    });
  }, []);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setInput(value);
  };

  const sendMsg = async (e) => {
    e.preventDefault();
    const msgobj = {
      message: input,
      username,
      timestamp: serverTimestamp(),
    };
    await addDoc(collection(dbService, 'messages'), msgobj);
    setMessages('');
  };

  return (
    <>
      <div>
        <form>
          <label htmlFor="msgInput"></label>
          <input
            type="text"
            id="msgInput"
            placeholder="메세지를 입력하세요"
            value={input}
            onChange={onChange}
          ></input>
          <button disabled={!input} type="submit" onClick={sendMsg}>
            전송
          </button>
        </form>
        <div>
          {messages.map((id, message) => (
            <ChatMessage key={id} username={username} message={message} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatRoom;

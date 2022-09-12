import React from 'react';

const ChatMessage = ({ message, username }) => {
  const isUser = username === message.username;

  return (
    <div>
      <div>
        {isUser ? `${username}` : 'Unknown'} : {message.message}
      </div>
    </div>
  );
};

export default ChatMessage;

import React from 'react';

import './styles.css';

interface IMessage {
  user: string
  content: string;
  time: Date;
}

interface IProps {
  message: IMessage;  
  previousMessage: IMessage | null;
  nextMessage: IMessage | null;
  firstMessageFromChat: boolean;
  from: 'me' | 'foreigner';
}

const Message: React.FC<IProps> = ({ message, from, nextMessage, previousMessage, firstMessageFromChat }) => {

  let divClass = 'message';

  const firstMessage = (previousMessage !== null && message.user !== previousMessage.user) || firstMessageFromChat;

  if(firstMessage) {
    divClass += ' first';
  }

  if(nextMessage === null || message.user !== nextMessage.user) {
    divClass += ' last';
  }

  if(from === 'me') {
    divClass += ' me';
  } else {
    divClass += ' foreigner'
  }

  
  return (
    <div className={divClass}>
      {(firstMessage) && <strong>{message.user} says:</strong>}
      <p>{message.content}</p>
    </div>
  );
}

export default Message;
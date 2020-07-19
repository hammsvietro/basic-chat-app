import React, { useRef, useEffect } from 'react';

import Message from '../Message';

import './styles.css'

interface IMessage {
  user: string
  content: string;
  time: Date;
}

interface IProps {
  userId: string
  messages: IMessage[];
}



const Chat: React.FC<IProps> = ({messages, userId}) => {

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollDown = () => {
    if(scrollRef.current){

      scrollRef.current.scrollTo({
        behavior: 'smooth',
        top: scrollRef.current.scrollHeight
      });
    }
  }


  useEffect(() => {
    
    scrollDown();
  }, [messages]);


  return (
    <div ref={scrollRef} className="chat-container">
      {messages.map((message, index) => 
        <Message key="index" firstMessageFromChat={index === 0} message={message} from={message.user === userId ? 'me' : 'foreigner'} previousMessage={messages[index - 1] ? messages[index - 1] : null} nextMessage={messages[index + 1] ? messages[index + 1] : null} />
      )}
    </div>
  )
}

export default Chat
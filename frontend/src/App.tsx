import React, { useState, useEffect, useRef } from 'react';
import crypto from 'crypto';
import io from 'socket.io-client';
import { MdSend } from 'react-icons/md'
import './App.css';

const socket = io('http://localhost:3333');
const userId = crypto.randomBytes(8).toString('hex');

socket.on('connect', () => {console.log('Conectado')});

interface IMessage {
  user: string
  content: string;
  time: Date;
}




function App() {

  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<IMessage>({
    user: userId,
    content: '',
    time: new Date(),
  });

  
  const handleNewMessage = (data: IMessage) => {
    if(data.user !== userId) {
      setMessages([...messages, data]);
    }
    
  }
  
  socket.on('message', handleNewMessage);
  
  const handleSendMessage = () => {
    if(message.content.trim()) {
      setMessage({...message, time: new Date()});
      socket.emit('message', message);
      setMessages([...messages, message]);
      setMessage({...message, content: ''});
    }
  }

  const scrollDown = () => {
    if(scrollRef.current){

      scrollRef.current.scrollTo({
        behavior: "smooth",
        top: scrollRef.current.offsetHeight
      });
    }
  }

  
  useEffect(() => {
    
    scrollDown();
  }, [messages]);

  return (
    <div className="chat-page">

      <div className="chat">
        <div ref={scrollRef} className="messages">

        {
          messages.map((message, index) => (
            <div className={message.user === userId ? 'mine' : 'foreign'} key={index}>
              <strong>{message.user} says:</strong>
              <br/>
              <p>{message.content}</p>
            </div>
            ))
          }

        </div>
      <div className="send">
        <input value={message.content} onChange={(e) => {setMessage({...message, content: e.target.value})}} type="text"/>
        <button onClick={handleSendMessage} ><MdSend size={24} color="#cfe5cf" /></button>
      </div>
      </div>
    </div>
  );
}

export default App;

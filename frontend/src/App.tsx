import React, { useState, useEffect } from 'react';
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
  
  useEffect(() => {
  }, []);

  return (
    <div className="chat-page">

      <div className="chat">
        <div className="messages">

        {
          messages.map((message, index) => (
            <h4 key={index}>{message.content}</h4>
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

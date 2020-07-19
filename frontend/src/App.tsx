import React, { useState, useRef } from 'react';
import crypto from 'crypto';
import io from 'socket.io-client';
import { MdSend } from 'react-icons/md'

import Chat from './components/Chat';

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

  const inputRef = useRef<HTMLInputElement>(null);

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
  
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if(event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  }

  const handleSendMessage = () => {
    if(message.content.trim()) {
      setMessage({...message, time: new Date()});
      socket.emit('message', message);
      setMessages([...messages, message]);
      setMessage({...message, content: ''});
      
      inputRef.current?.focus();
    }
  }

  return (
    <div className="chat-page">
    
    <Chat messages={messages} userId={userId} />
      
    <div className="send">
      <input ref={inputRef} value={message.content} onKeyPress={handleKeyPress} onChange={(e) => {setMessage({...message, content: e.target.value})}} type="text"/>
      <button onClick={handleSendMessage} ><MdSend size={24} color="#cfe5cf" /></button>
    </div>
    
    </div>
  );
}

export default App;

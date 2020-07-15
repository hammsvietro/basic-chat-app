import React from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3333');
socket.on('connect', () => {console.log('Conectado')});

function App() {

  
  const abc = 'ovo'
  return (
    <div className="App">
      <h1>{abc}</h1>
    </div>
  );
}

export default App;

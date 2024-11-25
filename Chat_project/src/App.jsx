import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// ES modules
import { io } from "socket.io-client";
function App() {
  const [count, setCount] = useState(0)

  const [username, setUsername] = useState('');

  const [socket, setSocket] = useState(null);

  function connectToChatServer(){
    console.log('connectToChatServer');
    const _socket = io('http://localhost:3000', {
      autoConnect: false,
      query: {
        username: username,
      }
    });
    _socket.connect();
    setSocket(_socket);
  }

  function disconnectToChatServer(){
    console.log('disconnectToChatServer');
    socket?.disconnect();
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      <h1>유저 : {username}</h1>
      <div className = 'card'>
        <input value = {username} onChange = { e => setUsername(e.target.value)} />
        <button onClick={() => connectToChatServer()}>
           접속
        </button>
        <button onClick={() => disconnectToChatServer()}>
           접속종료
        </button>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

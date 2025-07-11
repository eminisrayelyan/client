import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import client from 'socket.io-client'

const socket = client.io('http://localhost:3000')

function App() {
  const [count, setCount] = useState(0);
  const [allUsers, setAllUsers] =useState({});
  const enemiesCounts = Object.values(allUsers);


  useEffect(() => {
    socket.on('update-count', (serverAllUsers) => {
      console.log('update-count', socket.id, serverAllUsers);
      const currentUserCount = serverAllUsers[socket.id];
      setCount(currentUserCount);
      delete serverAllUsers[socket.id];
      setAllUsers(serverAllUsers);
  });


  return () => {
    socket.off('update-count');
  };
}, []);


  return (
  
     

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <p>Your count is {count}</p>
        {enemiesCounts.map((count,index) => {
          <p key={index}>Enemy count is {count}</p>
        })}
      </div>
  )
}

export default App

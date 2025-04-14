import { useUserAuth } from './context/UserAuthContext.jsx'
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  
  const user = useUserAuth();
  console.log(user);
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello World</h1>
    </>
  )
}

export default App

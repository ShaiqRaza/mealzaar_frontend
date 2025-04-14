import { useUserAuth } from './context/UserAuthContext.jsx'
import Header from './components/Header.jsx'
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  
  const user = useUserAuth();
  console.log(user);
  return (
    <div>
      <Header />
    </div>
  )
}

export default App

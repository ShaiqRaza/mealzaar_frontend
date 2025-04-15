import { useUserAuth } from './context/UserAuthContext.jsx'
import Header from './components/Header.jsx'
import axios from 'axios';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  }
]);

function App() {
  
  return (
      <RouterProvider router={router} />
  )
}

export default App

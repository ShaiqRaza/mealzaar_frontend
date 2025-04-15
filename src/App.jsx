import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './components/index.js';
import Layout from './Layout.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <Login />,
      }
    ]
  }
]);

function App() {
  
  return (
      <RouterProvider router={router} />
  )
}

export default App

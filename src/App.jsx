import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login, Signup, Home } from './components/index.js';
import Layout from './Layout.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
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

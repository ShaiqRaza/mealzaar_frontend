import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login, Signup, Home, KitchenDetails } from './components/index.js';
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
        },
        {
          path: "kitchen/:id",
          element: <KitchenDetails />,
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

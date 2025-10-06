import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserPage from './screens/user.page.jsx';
import Login from './component/login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/users",
    element: <UserPage />,
  },
  {
    path: "/login",
    element: <Login/> ,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App/> */}
    <RouterProvider router={router} />
  </StrictMode>
)

import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@ant-design/v5-patch-for-react-19'
import "antd/dist/reset.css";
import './index.css'

import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserPage from './screens/user.page.jsx'
import AoSoMiPage from "./screens/AoSoMiPage.jsx"
import Login from './component/login.jsx'
import Register from "./component/register.jsx";
import ForgotPassword from "./component/forgot.jsx";

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/users', element: <UserPage /> },
  { path: '/login', element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot", element: <ForgotPassword /> },
  { path: '/ao-so-mi', element: <AoSoMiPage /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

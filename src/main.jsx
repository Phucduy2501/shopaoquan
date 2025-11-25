import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@ant-design/v5-patch-for-react-19'
import "antd/dist/reset.css";
import './index.css'

import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserPage from './screens/user.page.jsx'
import AoSoMiPage from "./screens/AoSoMiPage.jsx"
import AoThunPage from "./screens/AoThunPage.jsx"
import AoPoloPage from "./screens/AoPoloPage.jsx"
import QuanJeansPage from "./screens/QuanJeansPage.jsx"
import QuanTayPage from "./screens/QuanTayPage.jsx"
import QuanKakiPage from "./screens/QuanKakiPage.jsx"
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
  { path: '/ao-Thun', element: <AoThunPage /> },
  { path: '/ao-Polo', element: <AoPoloPage /> },
  { path: '/quan-jeans', element: <QuanJeansPage /> },
  { path: '/quan-tay', element: <QuanTayPage /> },
  { path: '/quan-kaki', element: <QuanKakiPage /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

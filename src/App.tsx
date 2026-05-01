import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
const SignIn= React.lazy(() => import('./pages/DashBoard'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const DashBoard = React.lazy(() => import('./pages/DashBoard'));
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<DashBoard />} />
            <Route path='/dashboard' element={<DashBoard />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>

  )
}
export default App

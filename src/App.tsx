
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashBoard from './pages/DashBoard'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<DashBoard />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      </BrowserRouter>
    </div>

  )
}
export default App

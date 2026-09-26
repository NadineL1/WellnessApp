import './App.css';
import { Route, Routes } from 'react-router';
import RegisterPage from '../src/components/auth/Register';
import LoginPage from '../src/components/auth/Login';
import DashboardPage from '../src/components/DashBoard';
import NewDailyLog from '../src/components/NewDailyLog';
import NotFoundPage from '../src/components/NotFound';

function App() {

  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/newdailylog' element={<NewDailyLog />} />
      <Route path='/dashboard' element={<DashboardPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App

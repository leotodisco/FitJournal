
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Homepage';
import RegistrationPage from './pages/RegistrationPage.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import "./style/containers.css";
import { UserProvider } from './components/UserProvider';


function App() {

  return (
    <UserProvider>
      <div className='main-container'>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signin" element={<RegistrationPage />} />
            
            {/* Proteggi tutte le altre rotte con ProtectedRoute */}
            <Route path="/" element={<ProtectedRoute element={<Homepage />} />} />
            
          </Routes>
        </Router>
      </div>
    </UserProvider>
  )
}

export default App;

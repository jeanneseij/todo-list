import './App.css';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Register from './pages/Register'
import Auth from './pages/Auth'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

type AuthData = {
  token: string | null;
};

function App() {
  const { token }: AuthData = useAuth();
  console.log('token', token)
  return (
      <Router>
        <Routes>
          <Route path="/" element={token ? <Tasks /> : <Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={token ? <Tasks /> : <Auth />} />
        </Routes>
      </Router>
  );
}

export default App;

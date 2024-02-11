import { useState } from 'react';
import { Container, LoginForm, Input, Button, Link } from './LoginStyles';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password
      });
  
      if (response.status === 200) {
        console.log('Login successful');
        console.log(response.data)
        login(response.data.token);
        window.location.href = '/tasks';
      }
    } catch (error: any) {
      console.error('Error during login:', error);
      if (error.response && error.response.data && error.response.data.detail) {
        setError(error.response.data.detail);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };
  

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <div className="mb-3">
          <Input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <Input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        {error && (
          <div className="alert alert-danger" role="alert" style={{ color: 'red' }}>
            {error}
          </div>
        )}
        <div>
          <Button type="submit">Login</Button>
          <Link href="#">Forgot Password?</Link>
        </div>
      </LoginForm>
    </Container>
  );
};

export default Login;
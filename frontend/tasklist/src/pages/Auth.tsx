import { useState } from 'react';
import Login from './Login';
import Registration from './Register';
import { AuthContainer, Title, ToggleButton } from './AuthStyles'



const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <AuthContainer>
      <Title>Task List (To-Do App)</Title>
      <h2>{showLogin ? 'Login' : 'Register'}</h2>
      {showLogin ? (
        <Login />
      ) : (
        <Registration />
      )}
      <ToggleButton onClick={toggleForm}>
        {showLogin ? 'Switch to Register' : 'Switch to Login'}
      </ToggleButton>
    </AuthContainer>
  );
};

export default Auth;

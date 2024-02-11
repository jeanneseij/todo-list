import React, { useState } from 'react';
import { Container, FormContainer, FormGroup, Label, Input, Button } from './RegisterStyles';
import axios, { AxiosError } from 'axios';

type ErrorResponse = {
  error: string;
  details?: {
    username?: string[];
    email?: string[];
  };
}

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const { confirmPassword, ...dataToSend } = formData;
    console.log(dataToSend);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', dataToSend);
  
      if (response.status === 201) {
        console.log('Registration successful');
        window.alert('Registration successful. You can now log in.');
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error during registration:', error);
  
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response?.status === 400) {
          const responseData = axiosError.response.data;
          if (responseData && responseData.error) {
            let errorMessage = responseData.error;
            if (responseData.details && responseData.details.username) {
              errorMessage = responseData.details.username[0];
            } else if (responseData.details && responseData.details.email) {
              errorMessage = responseData.details.email[0];
            }
            setError(errorMessage);
          }
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
      }
    }
  };  

  return (
    <Container>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <FormGroup>
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {!passwordsMatch && <p style={{ color: 'red' }}>Passwords do not match</p>}
          </FormGroup>
          <Button type="submit">Register</Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default Registration;
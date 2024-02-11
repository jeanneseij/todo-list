import styled from 'styled-components';

export const AuthContainer = styled.div`
  max-height: 20vh;
  max-width: 50%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h1`
  font-size: 35px;
  color: #333;
  margin-bottom: 20px;
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font-size: inherit;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;
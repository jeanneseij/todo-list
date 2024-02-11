import styled from 'styled-components';

export const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 100vh;
  margin-top: 100px;
`;

export const TaskModalContainer = styled.div`
  padding: 10px;
`;

export const CreateButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const LogoutButton = styled.a`
  color: #007bff;
  text-decoration: none;
  margin-left: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #0056b3;
  }
`;
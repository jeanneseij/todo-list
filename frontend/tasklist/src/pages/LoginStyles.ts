import styled from 'styled-components';


export const Container = styled.div`
  background-color: white;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginForm = styled.form`
  background-color: #EDEDED;
  padding: 20px;
  border-radius: 5px;
  width: 350px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
`;

export const Input = styled.input`
  background-color: #F5F5F5;
  border: 1px solid #CCCCCC;
  margin-bottom: 10px;
  padding: 10px;
  width: 95%;
  border-radius: 5px;
`;

export const Button = styled.button`
  background-color: #A3C1DA;
  color: black;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #91b2c7;
  }
`;

export const Link = styled.a`
  color: #999999;
  display: block;
  margin-top: 10px;
  text-align: right;
`;

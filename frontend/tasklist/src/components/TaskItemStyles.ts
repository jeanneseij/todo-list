import styled from 'styled-components';

export const TaskContainer = styled.div<{ completed: string }>`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  text-decoration: ${(props) => (props.completed === 'true' ? 'line-through' : 'none')};
  color: ${(props) => (props.completed === 'true' ? 'gray' : 'black')};
`;

export const TaskInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 5px;
  margin-left: 10px;
  margin-right: 100px;
`;

export const TaskTitle = styled.div`
  font-weight: bold;
`;

export const TaskDetailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-column-gap: 10px;
  margin-left: 10px;
  width: 100%;
`;

export const TaskDescription = styled.div``;

export const TaskDeadline = styled.div`
  font-style: italic;
`;

export const EditButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const DeleteButton = styled.button`
  background-color: red;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;
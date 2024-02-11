import { useState } from 'react';
import { TaskContainer, TaskInfo, TaskTitle, TaskDetailsContainer, TaskDescription, TaskDeadline, EditButton, DeleteButton } from './TaskItemStyles';
import { HighPriority, MediumPriority, LowPriority } from './TaskPriorityStyles';

type TaskProps = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  priority: number;
  completed: boolean;
  onToggleComplete: (taskId: number) => void;
  onEditTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
};

const TaskItem = ({ id, title, description, deadline, priority, completed, onToggleComplete, onEditTask, onDeleteTask }: TaskProps) => {
    const [isChecked, setIsChecked] = useState(completed);

    const formattedDeadline = new Date(deadline).toLocaleDateString();

    const renderPriority = () => {
        switch (priority) {
          case 1:
            return <HighPriority>High</HighPriority>;
          case 2:
            return <MediumPriority>Medium</MediumPriority>;
          case 3:
            return <LowPriority>Low</LowPriority>;
          default:
            return null;
        }
      };
      
      const handleEditClick = () => {
        onEditTask(id);
      };

      const handleCheckboxChange = () => {
        const newCompleted = !isChecked;
        setIsChecked(newCompleted);
    
        onToggleComplete(id);
      };

      const handleDeleteClick = () => {
        onDeleteTask(id);
      };
      
      return (
        <TaskContainer completed={completed.toString()}>
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          <TaskInfo>
            <TaskTitle>{title}</TaskTitle>
            <TaskDetailsContainer>
              <TaskDescription>{description}</TaskDescription>
              <TaskDeadline> Deadline: {formattedDeadline}</TaskDeadline>
              Priority: {renderPriority()}
            </TaskDetailsContainer>
          </TaskInfo>
          <EditButton onClick={handleEditClick}>Edit</EditButton>
          <DeleteButton onClick={handleDeleteClick}>Delete</DeleteButton>
        </TaskContainer>
      );
};

export default TaskItem;

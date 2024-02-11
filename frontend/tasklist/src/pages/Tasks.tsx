import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from '../components/TaskItem';
import EditTaskModal from '../components/EditTaskModal';
import { CenteredContainer, TaskModalContainer, CreateButton, LogoutButton } from './TasksStyles';

const Tasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Authorization token not found');
        return;
      }

      const response = await axios.get('http://127.0.0.1:8000/api/tasks/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  const handleToggleComplete = (taskId: number) => {
    const updatedTasks = tasks.map(task => {  
      if (task.id === taskId) {
        const updatedTask = { ...task, completed: !task.completed };
        // Update task completion status locally
        setTasks(prevTasks => prevTasks.map(prevTask => (prevTask.id === taskId ? updatedTask : prevTask)));
        // Send PATCH request to update completion status
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Authorization token not found');
          return;
        }
        axios.patch(`http://127.0.0.1:8000/api/task/${taskId}/complete/`, { completed: updatedTask.completed }, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then(response => {
          console.log('Task completion status updated successfully:', response.data);
        })
        .catch(error => {
          console.error('Error updating task completion status:', error);
        });
      }
      return task;
    });
  };
  

  const handleEditTask = (task: any) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const handleUpdateTask = (updatedTask: any) => {
    const updatedTasks = tasks.map(task => {  
      if (task.id === updatedTask.id) {
        return { ...task, ...updatedTask };
      }
      return task;
    });
    setTasks(updatedTasks);
  
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Authorization token not found');
      return;
    }
    axios.put(`http://127.0.0.1:8000/api/update/${updatedTask.id}/`, updatedTask, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(response => {
      console.log('Task updated successfully:', response.data);
      setShowEditModal(false);
      fetchTasks();
    })
    .catch(error => {
      console.error('Error updating task:', error);
    });
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Authorization token not found');
        return;
      }

      await axios.delete(`http://127.0.0.1:8000/api/delete/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleCreateNewTask = () => {
    setShowEditModal(true);
    setSelectedTask({
      title: '',
      description: '',
      deadline: '',
      priority: 1,
    });
  };

  const handleCreateTask = (newTask: any) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Authorization token not found');
      return;
    }
    axios.post('http://127.0.0.1:8000/api/create/', newTask, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(response => {
      console.log('Task created successfully:', response.data);
      setShowEditModal(false);
      fetchTasks();
    })
    .catch(error => {
      console.error('Error creating task:', error);
    });
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  console.log(selectedTask)

  return (
    <div>
      <h1>Welcome to Tasks Page</h1>
      <CreateButton onClick={handleCreateNewTask}>Create New Task</CreateButton>
      <LogoutButton href="/" onClick={handleLogout}>Logout</LogoutButton>
      {showEditModal && (
        <TaskModalContainer>
          <EditTaskModal
            task={selectedTask}
            onCreateTask={handleCreateTask}
            onUpdateTask={handleUpdateTask}
            onCancel={handleCloseModal}
            mode={selectedTask.id ? 'update' : 'create'}
          />
        </TaskModalContainer>
      )}
      <CenteredContainer>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            {...task}
            onToggleComplete={() => handleToggleComplete(task.id)}
            onEditTask={() => handleEditTask(task)}
            onDeleteTask={() => handleDeleteTask(task.id)}
          />
        ))}
      </CenteredContainer>
    </div>
  );
};

export default Tasks;
import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CustomModal, ModalBodyCentered, FormContainer, ModalFooter, CloseButton, StyledModalBody } from './EditTaskModalStyles'

type EditTaskModalProps = {
  task: {
    title: string;
    description: string;
    deadline: string;
    priority: number;
  };
  onUpdateTask: (updatedTask: Partial<{ title: string; description: string; deadline: string; priority: number }>) => void;
  onCreateTask: (newTask: { title: string; description: string; deadline: string; priority: number }) => void;
  onCancel: () => void;
  mode: 'create' | 'update';
};

const EditTaskModal = ({ task, onUpdateTask, onCreateTask, onCancel, mode }: EditTaskModalProps) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleInputChange = (key: string, value: string) => {
    setEditedTask({ ...editedTask, [key]: value });
  };

  const handleSaveTask = () => {
    // Check if any of the fields are empty
    if (
      editedTask.title.trim() === '' ||
      editedTask.description.trim() === '' ||
      editedTask.deadline.trim() === ''
    ) {
      // If any field is empty, show an alert or handle the error accordingly
      alert('All fields are required');
      return;
    }

    if (mode === 'create') {
      // Call the onCreateTask function with the new task details
      onCreateTask(editedTask);
    } else if (mode === 'update') {
      // Call the onUpdateTask function with the updated task details
      onUpdateTask(editedTask);
    }
  };
  

  return (
    <CustomModal show={true} onHide={onCancel} centered>
      <StyledModalBody>
        <Modal.Header>
          <CloseButton onClick={onCancel}>x</CloseButton>
          <Modal.Title>
          {mode === 'create' ? 'Create' : 'Update'} Task
          </Modal.Title>
        </Modal.Header>
        <ModalBodyCentered>
          <FormContainer>
            <StyledModalBody>
              <Form>
                <Form.Group controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={editedTask.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter description"
                    value={editedTask.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formDeadline">
                  <Form.Label>Deadline</Form.Label>
                  <Form.Control
                    type="date"
                    value={editedTask.deadline}
                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formPriority">
                  <Form.Label>Priority</Form.Label>
                  <Form.Control
                    as="select"
                    value={editedTask.priority.toString()}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                  >
                    <option value="1">High</option>
                    <option value="2">Medium</option>
                    <option value="3">Low</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </StyledModalBody>
          </FormContainer>
        </ModalBodyCentered>
        <ModalFooter>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveTask}>
            {mode === 'create' ? 'Create' : 'Update'}
          </Button>
        </ModalFooter>
      </StyledModalBody>
    </CustomModal>
  );
};

export default EditTaskModal;
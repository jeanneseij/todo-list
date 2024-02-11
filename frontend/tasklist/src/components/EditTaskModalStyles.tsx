import styled from 'styled-components';
import { Modal, Button } from 'react-bootstrap';

export const CustomModal = styled(Modal)`
  & .modal-content {
    background-color: #fff; /* Background color of the modal */
    border-radius: 10px; /* Rounded corners */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Box shadow for depth */
  }
`;

export const ModalBodyCentered = styled(Modal.Body)`
  display: flex;
  justify-content: center;
`;

export const FormContainer = styled.div`
  width: 80%; 
`;

export const ModalFooter = styled(Modal.Footer)`
  display: flex;
  justify-content: space-between;
`;

export const CloseButton= styled(Button)`
  font-size: 16px;
  padding: 6px 12px;
  border-radius: 5px;
  background-color: #d1d1d1;
  border-color: #b5b5b5;

  &:hover {
    background-color: #b5b5b5;
    border-color: #9e9e9e;
  }
`;

export const StyledModalBody = styled(Modal.Body)`
  padding: 20px;
`;

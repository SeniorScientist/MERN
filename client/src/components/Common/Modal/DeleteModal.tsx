import { Box, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, } from "@chakra-ui/react";
import { DeleteModalProps } from "@/types/modal";


const DeleteModal = (props: DeleteModalProps) => {

  const { isOpen, onClose, onDelete } = props;

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="rgba(0, 0, 0, 0.5)" p={{ base: 4, md: "unset" }} />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>Are you sure you want to delete a task or the tasks?</ModalBody>
          <ModalFooter>
            <Button
              onClick={onDelete}
              type="button"
              background="red.500">
               Delete
            </Button>

            <Button onClick={onClose} marginLeft="3">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DeleteModal;
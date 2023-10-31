import { Box, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, } from "@chakra-ui/react";
import { CreateModalProps } from "@/types/modal";


const CreateModal = (props: CreateModalProps) => {

  const { isOpen, onClose, onCreate } = props;

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="rgba(0, 0, 0, 0.5)" p={{ base: 4, md: "unset" }} />
        <ModalContent>
          <ModalHeader>Confirm Creation</ModalHeader>
          <ModalBody>
            <Box>
              <h1>
                Are you sure you want to create this task?
              </h1>
              
            </Box>

          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onCreate}
              type="button"
              className="bg-red-50">
              Create
            </Button>

            <Button onClick={onClose} className="ml-3">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateModal;
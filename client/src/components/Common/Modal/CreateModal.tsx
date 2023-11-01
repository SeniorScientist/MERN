import { Box, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, } from "@chakra-ui/react";
import { CreateModalProps } from "@/types/modal";
import { taskSchema } from "./task.schema";
import Form from "../Form";
import { useCreateAction } from "./useTaskAction";
import TextField from "../TextField";

const CreateModal = (props: CreateModalProps) => {

  const { isOpen, onClose, onCreate } = props;
  const { handleSubmit, isLoading } = useCreateAction();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="rgba(0, 0, 0, 0.5)" p={{ base: 4, md: "unset" }} />
      <ModalContent>
        <Form
          onSubmit={(values) => handleSubmit(values)}
          schema={taskSchema}
        >
          <ModalHeader>Task Creation</ModalHeader>
          <ModalBody>
            <Box>
              <TextField name="title" label="Title" />
              <TextField name="description" label="Description" />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isLoading}
              type="submit"
              background="blue.500"
              marginRight="3">
              Create
            </Button>

            <Button
              isLoading={isLoading}
              onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </Form >
      </ModalContent>
    </Modal>

  );
};

export default CreateModal;
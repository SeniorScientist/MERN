import { Box, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, } from "@chakra-ui/react";
import { UpdateModalProps } from "@/types/modal";
import { taskSchema } from "./task.schema";
import Form from "../Form";
import { useUpdateAction } from "./useTaskAction";
import TextField from "../TextField";

const UpdateModal = (props: UpdateModalProps) => {

  const { isOpen, onClose, task } = props;
  const { handleSubmit, isLoading } = useUpdateAction(task && task._id);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="rgba(0, 0, 0, 0.5)" p={{ base: 4, md: "unset" }} />
      <ModalContent>
        <Form
          onSubmit={(values) => handleSubmit(values)}
          schema={taskSchema}
        >
          <ModalHeader>Task Update</ModalHeader>
          <ModalBody>
            <Box>
              <TextField name="title" label="Title" defaultValue={task && task.title}/>
              <TextField name="description" label="Description" defaultValue={task && task.description}/>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isLoading}
              type="submit"
              background="blue.500"
              marginRight="3">
              Update
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

export default UpdateModal;
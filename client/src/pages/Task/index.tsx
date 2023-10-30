import { Box, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { Task } from "@/types/task"

const Task = () => {

  const [loading, setLoading] = useState<boolean>(true)
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedRows, setSelectedRows] = useState<Task[]>([])

  
  return (
    <Box w="100%" mx="auto" px="50px">
      <Heading fontSize='24px' fontWeight='medium'>
        Task Management Board
      </Heading>
      <Box mt="20px">

      </Box>
    </Box>
  );
};

export default Task;
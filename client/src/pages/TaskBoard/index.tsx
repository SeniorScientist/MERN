import { Box, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { Task } from "@/types/task"
import ReusableTable, { ColumnConfig } from "@/components/Common/Table";

const Columns: ColumnConfig[] = [
  { key: 'id', flex: 0.5, label: 'ID', sortable: true },
  { key: 'title', flex: 2, label: 'Title', sortable: true },
  { key: 'description', flex: 2, label: 'Description', sortable: true },
]

const TaskBoard = () => {

  const [loading, setLoading] = useState<boolean>(true)
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedRows, setSelectedRows] = useState<Task[]>([])


  return (
    <Box w="100%" mx="auto" p="50px">
      <Box>
        <ReusableTable
          loading={loading}
          columns={Columns}
          data={[]}
          searchFields={['title']}
          onSelectRows={rows => setSelectedRows(rows)}
          useUrlQuery
        />
      </Box>
    </Box>
  );
};

export default TaskBoard;
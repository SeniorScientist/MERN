import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Task } from "@/types/task"
import ReusableTable, { ColumnConfig } from "@/components/Common/Table";
import API from "@/services/API";

const Columns: ColumnConfig[] = [
  { key: 'id', flex: 0.5, label: 'ID', sortable: true },
  { key: 'title', flex: 2, label: 'Title', sortable: true },
  { key: 'description', flex: 2, label: 'Description', sortable: true },
]

const TaskBoard = () => {

  const [loading, setLoading] = useState<boolean>(true)
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedRows, setSelectedRows] = useState<Task[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await API.get('/task', { params: {  } })
      setTasks(res.data.tasks.map((e: any, index: number) => ({
        id: index + 1,
        ...e
      })))
    } catch (err) {
      console.log("~ file: index.tsx ~ line 30 ~ fetchData ~ err", err)
    } finally {
      setLoading(false)
    }  
  }

  return (
    <Box w="100%" mx="auto" p="50px">
      <Box>
        <ReusableTable
          loading={loading}
          columns={Columns}
          data={tasks}
          searchFields={['title']}
          onSelectRows={rows => setSelectedRows(rows)}
          useUrlQuery
        />
      </Box>
    </Box>
  );
};

export default TaskBoard;
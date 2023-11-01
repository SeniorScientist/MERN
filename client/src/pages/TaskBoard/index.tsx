import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Task } from "@/types/task"
import ReusableTable, { ColumnConfig } from "@/components/Common/Table";
import API from "@/services/API";
import CreateModal from "@/components/Common/Modal/CreateModal";

const Columns: ColumnConfig[] = [
  { key: 'id', flex: 0.5, label: 'ID', sortable: true },
  { key: 'title', flex: 2, label: 'Title', sortable: true },
  { key: 'description', flex: 2, label: 'Description', sortable: true },
  { key: 'createdAt', flex: 2, label: 'Created time'}
]

const TaskBoard = () => {

  const [loading, setLoading] = useState<boolean>(true)
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedRows, setSelectedRows] = useState<Task[]>([])

  const [isCreateOpen, setCreateOpen] = useState<boolean>(false)
  const [isUpdateOpen, setUpdateOpen] = useState<boolean>(false)
  const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false)


  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await API.get('/task', { params: {  } });
      const tasks = res.data.list.map((e: any, index: number) => ({
        id: index + 1,
        title: e.title,
        description: e.description,
        createdAt: e.createdAt
      }))
      setTasks(tasks);
    } catch (err) {
      console.log("~ file: index.tsx ~ line 30 ~ fetchData ~ err", err);
    } finally {
      setLoading(false);
    }  
  }

  const handleCreateModal = () => {
    setCreateOpen(state => !state);
  }

  return (
    <Box w="100%" mx="auto" p="50px">
      <Box>
        <ReusableTable
          loading={loading}
          columns={Columns}
          data={tasks}
          searchable={false}
          // searchFields={['title']}
          onSelectRows={rows => setSelectedRows(rows)}
          useUrlQuery
          onTaskCreate={handleCreateModal}
        />
        <CreateModal isOpen={isCreateOpen} onClose={handleCreateModal} />
      </Box>
    </Box>
  );
};

export default TaskBoard;

function notifySuccess(message: any) {
  throw new Error("Function not implemented.");
}

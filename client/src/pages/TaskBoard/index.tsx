import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Task } from "@/types/task"
import ReusableTable, { ColumnConfig } from "@/components/Common/Table";
import API from "@/services/API";
import CreateModal from "@/components/Common/Modal/CreateModal";
import DeleteModal from "@/components/Common/Modal/DeleteModal";
import { useNavigate } from "react-router-dom";
import UpdateModal from "@/components/Common/Modal/UpdateModal";
import moment from "moment";

const Columns: ColumnConfig[] = [
  { key: 'id', flex: 0.5, label: 'ID', sortable: true },
  { key: 'title', flex: 2, label: 'Title', sortable: true },
  { key: 'description', flex: 3, label: 'Description', sortable: true },
  { key: 'createdAt', flex: 2, label: 'Created At' }
]

const TaskBoard = () => {
  
  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedRows, setSelectedRows] = useState<Task[]>([]);
  const [selectedRow, setSelectedRow] = useState<Task>();

  const [isCreateOpen, setCreateOpen] = useState<boolean>(false);
  const [isUpdateOpen, setUpdateOpen] = useState<boolean>(false);
  const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false);


  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await API.get('/task', { params: {} });
      const tasks = res.data.list.map((e: any, index: number) => ({
        id: index + 1,
        _id: e._id,
        title: e.title,
        description: e.description,
        createdAt: moment(e.createdAt).format('MM/DD/YYYY hh:mm:ss')
      }))
      setTasks(tasks);
    } catch (err) {
      console.log("~ file: index.tsx ~ line 30 ~ fetchData ~ err", err);
    } finally {
      setLoading(false);
    }
  }

  const deleteTasks = async () => {
    try {
      setLoading(true);

      const res = await API.delete('/task/delete', {
        data: {
          ids: selectedRows.map((e: Task) => {
            return e._id
          })
        }
      });
    } catch (err) {

    } finally {
      setLoading(false);
      handleDeleteModal();
    }
  }

  const handleCreateModal = () => {
    setCreateOpen(state => !state);
  }

  const handleDeleteModal = () => {
    setDeleteOpen(state => !state);
  }

  const handleUpdateModal = () => {
    setUpdateOpen(state => !state);
  }

  const handleUpdateRow = (row: Task) => {
    setSelectedRow(row);
    handleUpdateModal();
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
          onRowClick={row => handleUpdateRow(row)}
          onTaskCreate={handleCreateModal}
          onTaskDelete={handleDeleteModal}
        />
        <CreateModal isOpen={isCreateOpen} onClose={handleCreateModal} />
        <DeleteModal isOpen={isDeleteOpen} onClose={handleDeleteModal} onDelete={deleteTasks} />
        <UpdateModal task={selectedRow} isOpen={isUpdateOpen} onClose={handleUpdateModal} />
      </Box>
    </Box>
  );
};

export default TaskBoard;

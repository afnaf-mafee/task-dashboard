import React from "react";
import { Table, Tag, Space, Switch, Button, Card, Popconfirm, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  useGetTasksQuery,
  useDeleteTaskMutation,

} from "../../../redux/services/taskApiServices/taskApiServices.js";

const AllTaskTable = () => {
  const navigate = useNavigate();

  // RTK Query: fetch tasks
  const { data: tasks = [], isLoading } = useGetTasksQuery();

  // RTK Query: mutations
  const [deleteTask] = useDeleteTaskMutation();
 
  // handle delete
  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId).unwrap(); // RTK Query mutation
      message.success("Task deleted successfully ✅");
    } catch (err) {
      message.error("Failed to delete task ❌");
    }
  };

  // handle status toggle
  const handleStatusChange = async (checked, record) => {
    // try {
    //   await updateTaskStatus({ taskId: record._id, status: checked ? "active" : "inactive" }).unwrap();
    //   message.success("Status updated ✅");
    // } catch (err) {
    //   message.error("Failed to update status ❌");
    // }
  };

  // table columns
  const columns = [
    { title: "Icon", dataIndex: "icon", render: (icon) => <span style={{ fontSize: 20 }}>{icon}</span> },
    { title: "Title", dataIndex: "title" },
    // { title: "Reward", dataIndex: "reward", render: (r) => `$${r}` },
    { title: "Type", dataIndex: "type", render: (type) => <Tag color="blue">{type}</Tag> },
    { title: "Duration", dataIndex: "duration", render: (d) => `${d}s` },
    {
      title: "Status",
      render: (_, record) => (
        <Switch checked={record.status === "active"} onChange={(checked) => handleStatusChange(checked, record)} />
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => navigate(`/edit-task/${record._id}`)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Task Management"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate("/add-task")}>
          Add Task
        </Button>
      }
    >
      <Table columns={columns} dataSource={tasks?.data} rowKey="_id" loading={isLoading} pagination={{ pageSize: 6 }} />
    </Card>
  );
};

export default AllTaskTable;
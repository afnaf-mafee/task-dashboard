import {
  Input,
  Skeleton,
  Table,
  Select,
  message,
  Tooltip,
  Button,
  Modal,
  Form,
} from "antd";
import { useState } from "react";
import { PiSmileySadLight } from "react-icons/pi";
import { FaRegCopy } from "react-icons/fa";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Popconfirm } from "antd";
import {
  useGetNotificationsQuery,
  useCreateNotificationMutation,
  useDeleteNotificationMutation,
} from "../../../redux/services/notificationService/notificationApiServices";

dayjs.extend(utc);
dayjs.extend(timezone);

const { Option } = Select;

const AllNotificationsTable = () => {
  const [searchUserId, setSearchUserId] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [form] = Form.useForm();

  const { data: notificationData, isLoading } = useGetNotificationsQuery({
    userId: searchUserId,
  });
  const [deleteNotification, { isLoading: deleting }] =
  useDeleteNotificationMutation();

  const [createNotification, { isLoading: creating }] =
    useCreateNotificationMutation();

  const notifications = notificationData?.data || [];

  // ✅ Copy
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    message.success(`${label} copied`);
  };

  // ✅ Create Notification
  const handleCreateNotification = async (values) => {
    try {
     const res = await createNotification(values).unwrap();
     console.log(res);

      message.success("Notification Sent Successfully ✅");

      form.resetFields();
      setOpenModal(false);
    } catch (error) {
      message.error("Failed to send notification");
    }
  };
  const handleDelete = async (id) => {
  try {
    await deleteNotification(id).unwrap();
    message.success("Notification deleted successfully");
  } catch (error) {
    console.error(error);
    message.error("Failed to delete notification");
  }
};


  // ✅ Table Columns
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (title) => (
        <div className="flex items-center gap-2">
          <span>{title}</span>

        </div>
      ),
    },

    {
      title: "Message",
      dataIndex: "message",
      render: (messageText) => (
        <span className="text-gray-600">{messageText}</span>
      ),
    },

    {
      title: "User ID",
      dataIndex: "userId",
      render: (userId) => (
        <div className="flex items-center gap-2">
          <span>{userId || "All Users"}</span>

          <Tooltip title="Copy User ID">
            <FaRegCopy
              size={18}
              onClick={() => handleCopy(userId || "All Users", "User ID")}
              className="cursor-pointer text-gray-500 hover:text-blue-500"
            />
          </Tooltip>
        </div>
      ),
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date) =>
        dayjs(date).tz("Asia/Dhaka").format("YYYY-MM-DD hh:mm A"),
    },{
  title: "Action",
  key: "action",
  render: (_, record) => (
    <Popconfirm
      title="Delete this notification?"
      description="This action cannot be undone"
      okText="Delete"
      cancelText="Cancel"
      onConfirm={() => handleDelete(record._id)}
    >
      <button
        disabled={deleting}
        className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-1 rounded-lg font-semibold transition disabled:opacity-50"
      >
        {deleting ? "Deleting..." : "Delete"}
      </button>
    </Popconfirm>
  ),
}
  ];

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl shadow-md mt-5 overflow-x-auto font-urbanist">
      {/* HEADER + BUTTON */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Notifications</h2>

        <Button
          size="large"
          onClick={() => setOpenModal(true)}
          style={{
            background: "linear-gradient(135deg,#8c20fa,#6135f7)",
            color: "#fff",
            border: "none",
          }}
        >
          + Create Notification
        </Button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 max-w-md">
        <Input
          placeholder="Search by User ID..."
          value={searchUserId}
          onChange={(e) => setSearchUserId(e.target.value)}
          size="large"
        />
      </div>

      {/* TABLE */}
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : (
        <Table
          columns={columns}
          dataSource={notifications}
          rowKey="_id"
          pagination={{
            pageSize: 5,
            total: notificationData?.total,
          }}
          scroll={{ x: "max-content" }}
          locale={{
            emptyText: (
              <div className="flex flex-col items-center py-10">
                <PiSmileySadLight className="text-3xl text-gray-400 mb-2" />
                <span className="font-bold text-gray-500 text-lg">
                  No Notifications Found
                </span>
              </div>
            ),
          }}
        />
      )}

      {/* CREATE NOTIFICATION MODAL */}
      <Modal
        open={openModal}
        title="Create Notification"
        footer={null}
        centered
        onCancel={() => setOpenModal(false)}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateNotification}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Notification Title" />
          </Form.Item>

          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} placeholder="Notification Message" />
          </Form.Item>

          <Form.Item name="userId" label="User ID (all) ">
            <Input placeholder="Leave empty for ALL users" />
          </Form.Item>

          <Button
            htmlType="submit"
            loading={creating}
            block
            size="large"
            style={{
              background: "linear-gradient(135deg,#8c20fa,#6135f7)",
              border: "none",
              color: "#fff",
            }}
          >
            Send Notification 🚀
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AllNotificationsTable;

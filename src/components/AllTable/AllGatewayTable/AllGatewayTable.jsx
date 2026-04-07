import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  message,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import {
  useGetGatewaysQuery,
  useAddGatewayMutation,
  useDeleteGatewayMutation,
} from "../../../redux/services/gateWayApiServices/gateWayApiServices.js";

const { Option } = Select;

const AllGatewayTable = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  /* ================= API HOOKS ================= */

  const { data, isLoading } = useGetGatewaysQuery();
  const [addGateway, { isLoading: addLoading }] =
    useAddGatewayMutation();
  const [deleteGateway] = useDeleteGatewayMutation();

  const gateways = data?.data || [];

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    try {
      await deleteGateway(id).unwrap();
      message.success("Gateway deleted successfully ✅");
    } catch {
      message.error("Delete failed");
    }
  };

  /* ================= ADD ================= */

  const onFinish = async (values) => {
    try {
      await addGateway({
        ...values,
        status: true,
      }).unwrap();

      message.success("Gateway added successfully 🎉");

      form.resetFields();
      setOpen(false);
    } catch {
      message.error("Add failed");
    }
  };

  /* ================= TABLE ================= */

  const columns = [
    {
      title: "Gateway",
      dataIndex: "name",
    },
    {
      title: "Number",
      dataIndex: "number",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Popconfirm
          title="Delete Gateway"
          description="Are you sure you want to delete this gateway?"
          onConfirm={() => handleDelete(record._id)}
        >
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl shadow-md mt-5 overflow-x-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Payment Gateways</h2>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
          className="!bg-indigo-600 !border-none"
        >
          Add Gateway
        </Button>
      </div>

      {/* Table */}
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={gateways}
        loading={isLoading}
        pagination={false}
      />

      {/* Modal */}
      <Modal
        title="Add Payment Gateway"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Gateway Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Bkash / Nagad / Rocket" />
          </Form.Item>

          <Form.Item
            label="Number"
            name="number"
            rules={[{ required: true }]}
          >
            <Input placeholder="017XXXXXXXX" />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select Type">
              <Option value="Personal">Personal</Option>
              <Option value="Agent">Agent</Option>
              <Option value="Merchant">Merchant</Option>
            </Select>
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            loading={addLoading}
            block
            className="!bg-indigo-600 !border-none"
          >
            Save Gateway
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AllGatewayTable;
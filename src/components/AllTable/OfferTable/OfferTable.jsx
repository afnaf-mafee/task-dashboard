import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Popconfirm,
  message,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import {
  useGetOffersQuery,
  useAddOfferMutation,
  useDeleteOfferMutation,
} from "../../../redux/services/offerApiService/offerApiService.js";

const { Option } = Select;

const AllOfferTable = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  /* ================= API HOOKS ================= */
  const { data, isLoading } = useGetOffersQuery();
  const [addOffer, { isLoading: addLoading }] = useAddOfferMutation();
  const [deleteOffer] = useDeleteOfferMutation();

  const offers = data?.data || [];

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    try {
      await deleteOffer(id).unwrap();
      message.success("Offer deleted successfully ✅");
    } catch {
      message.error("Delete failed");
    }
  };

  /* ================= ADD ================= */
  const onFinish = async (values) => {
    try {
      await addOffer({
        ...values,
        active: true,
        createdAt: new Date(),
      }).unwrap();

      message.success("Offer added successfully 🎉");

      form.resetFields();
      setOpen(false);
    } catch {
      message.error("Add failed");
    }
  };

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
    },
    {
      title: "Image URL",
      dataIndex: "image",
      render: (text) => text || "-",
    },
    {
      title: "Button Text",
      dataIndex: "buttonText",
      render: (text) => text || "-",
    },
    {
      title: "Button URL",
      dataIndex: "buttonUrl",
      render: (text) =>
        text ? (
          <a href={text} target="_blank" rel="noreferrer">
            {text}
          </a>
        ) : (
          "-"
        ),
    },
    {
      title: "Show On",
      dataIndex: "showOn",
      render: (text) => text || "-",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Popconfirm
          title="Delete Offer"
          description="Are you sure you want to delete this offer?"
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
        <h2 className="text-xl font-bold">Offers</h2>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
          className="!bg-indigo-600 !border-none"
        >
          Add Offer
        </Button>
      </div>

      {/* Table */}
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={offers}
        loading={isLoading}
        pagination={false}
      />

      {/* Modal */}
      <Modal
        title="Add Offer"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          {/* Offer Title */}
          <Form.Item
            label="Offer Title"
            name="title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input placeholder="Enter offer title" />
          </Form.Item>

          {/* Description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <Input.TextArea placeholder="Enter offer description" rows={3} />
          </Form.Item>

          {/* Image URL */}
          <Form.Item label="Image URL" name="image">
            <Input placeholder="Optional image URL" />
          </Form.Item>

          {/* Button Text */}
          <Form.Item label="Button Text" name="buttonText">
            <Input placeholder="Optional button text (e.g., 'Claim Now')" />
          </Form.Item>

          {/* Button URL */}
          <Form.Item label="Button URL" name="buttonUrl">
            <Input placeholder="Optional button URL (https://example.com)" />
          </Form.Item>

          {/* Show On */}
          <Form.Item
            label="Show On"
            name="showOn"
            rules={[{ required: true, message: "Please select where to show" }]}
          >
            <Select placeholder="Select where to show">
              <Option value="Home">Home</Option>
              <Option value="Profile">Profile</Option>
            </Select>
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            loading={addLoading}
            block
            className="!bg-indigo-600 !border-none"
          >
            Save Offer
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AllOfferTable;
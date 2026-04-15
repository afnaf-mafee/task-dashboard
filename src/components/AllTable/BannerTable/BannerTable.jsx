import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, message, Popconfirm } from "antd";
import {
  useAddBannerMutation,
  useDeleteBannerMutation,
  useGetBannerQuery,
} from "../../../redux/services/bannerApiServices/bannerApiServices";

const BannerTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // API
  const { data: bannerData, isLoading, isFetching } = useGetBannerQuery();
  const [addBanner, { isLoading: addLoading }] = useAddBannerMutation();
  const [deleteBanner, { isLoading: deleteLoading }] =
    useDeleteBannerMutation();

  // Submit
  const handleSubmit = async (values) => {
    try {
      await addBanner({
        imageUrl: values.imageUrl,
      }).unwrap();

      message.success("Banner Added Successfully");
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error(error?.data?.message || "Failed to add banner");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteBanner(id).unwrap();
      message.success("Banner Deleted Successfully");
    } catch (error) {
      message.error("Failed to delete banner");
    }
  };

  // Columns
  const columns = [
    {
      title: "Banner Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) => (
        <img
          src={imageUrl}
          alt="banner"
          className="w-40 h-20 object-cover rounded"
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Delete banner?"
          description="Are you sure you want to delete this banner?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger loading={deleteLoading}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  // Data fix
  const tableData = Array.isArray(bannerData?.data)
    ? bannerData.data
    : bannerData?.data
      ? [bannerData.data]
      : [];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold font-montserrat">Banner Management</h2>

        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          style={{ backgroundColor: "#722ed1", borderColor: "#722ed1" }}
        >
          Add Banner
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={tableData}
        loading={isLoading || isFetching}
        pagination={false}
        bordered
        rowKey="_id"
      />

      {/* Modal */}
      <Modal
        title="Add Banner"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Banner Image URL (Recommended 305 × 150 px)"
            name="imageUrl"
            rules={[{ required: true, message: "Image URL required" }]}
          >
            <Input placeholder="Enter image url" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={addLoading}
            style={{ backgroundColor: "#722ed1", borderColor: "#722ed1" }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#531dab";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#722ed1";
            }}
          >
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default BannerTable;

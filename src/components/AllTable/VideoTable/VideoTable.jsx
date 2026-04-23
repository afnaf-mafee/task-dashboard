import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, message, Popconfirm } from "antd";
import {
  useGetVideosQuery,
  useAddVideoMutation,
  useDeleteVideoMutation,
} from "../../../redux/services/videoApiServices/videoApiServices";

const VideoTable = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [form] = Form.useForm();

  // 👉 API Hooks
  const { data, isLoading, isFetching } = useGetVideosQuery();
  const [addVideo, { isLoading: addLoading }] = useAddVideoMutation();
  const [deleteVideo, { isLoading: deleteLoading }] = useDeleteVideoMutation();

  // 👉 Normalize data
  const tableData = data?.videos
  console.log(tableData);


   // 👉 Add Video
const handleAdd = async (values) => {
  try {
    const res = await addVideo(values).unwrap();

    if (res?.success) {
      message.success(res?.message || "Video Added Successfully");
      form.resetFields();
      setIsAddModalOpen(false);
    } else {
      message.error(res?.message || "Failed to add video");
    }
  } catch (error) {
    message.error(error?.data?.message || "Failed to add video");
  }
};



  // 👉 Delete Video
 const handleDelete = async (id) => {
  try {
    const res = await deleteVideo(id).unwrap();

    if (res?.success) {
      message.success(res?.message || "Video Deleted Successfully");
    } else {
      message.error(res?.message || "Failed to delete video");
    }
  } catch (error) {
    message.error(error?.data?.message || "Failed to delete video");
  }
};

  // 👉 View Video
  const handleViewVideo = (record) => {
    setSelectedVideo(record);
    setIsVideoModalOpen(true);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button type="primary" onClick={() => handleViewVideo(record)}>
            View
          </Button>

          <Popconfirm
            title="Delete video?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger loading={deleteLoading}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold">Video Management</h2>

        <Button
          type="primary"
          onClick={() => setIsAddModalOpen(true)}
          style={{ backgroundColor: "#722ed1", borderColor: "#722ed1" }}
        >
          Add Video
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={tableData}
        rowKey="_id"
        bordered
        loading={isLoading || isFetching}
        pagination={false}
      />

      {/* Add Modal */}
      <Modal
        title="Add Video"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAdd}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title required" }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description required" }]}
          >
            <Input.TextArea placeholder="Enter description" />
          </Form.Item>

          <Form.Item
            label="Video URL (YouTube embed)"
            name="videoUrl"
            rules={[{ required: true, message: "Video URL required" }]}
          >
            <Input placeholder="https://www.youtube.com/embed/..." />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={addLoading}
            style={{ backgroundColor: "#722ed1", borderColor: "#722ed1" }}
          >
            Submit
          </Button>
        </Form>
      </Modal>

      {/* Video Modal */}
      <Modal
        title={selectedVideo?.title}
        open={isVideoModalOpen}
        onCancel={() => setIsVideoModalOpen(false)}
        footer={null}
        width={800}
      >
        {selectedVideo && (
          <div>
            <p className="mb-3">{selectedVideo.description}</p>

            <iframe
              width="100%"
              height="400"
              src={selectedVideo.videoUrl}
              title="video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VideoTable;
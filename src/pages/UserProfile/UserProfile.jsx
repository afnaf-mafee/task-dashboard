import React, { useState } from "react";
import CommonHeading from "../../components/commonHeading/CommonHeading";
import { useLocation } from "react-router-dom";
import { useGetSingleUserQuery } from "../../redux/services/userApiServices/userApiServices";

import { Button, Card, Modal, Form, Input, message } from "antd";
import { useAddMoneyMutation } from "../../redux/services/userPaymentApiService/userPaymentApiService";

const UserProfile = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get("id");
  const { data, isLoading, error,refetch } = useGetSingleUserQuery(userId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [addMoney, { isLoading: isAdding }] = useAddMoneyMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user</p>;

  const user = data?.data;

  const handleAddMoney = async () => {
    try {
      const values = await form.validateFields();
      await addMoney({ userId, amount: values.amount }).unwrap();
      message.success(`$${values.amount} added to user successfully`);
      form.resetFields();
      setIsModalOpen(false);
      refetch()
    } catch (err) {
      message.error(err?.data?.message || "Failed to add money");
    }
  };

  return (
    <div className="p-6 flex justify-center font-urbanist">
      <Card
        title={`User ID: ${user.userId}`}
        className="w-full max-w-md shadow-lg rounded-xl"
        bordered={false}
      >
        <p>
          <strong>Username:</strong> {user.username || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {user.email || "N/A"}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Balance:</strong>{" "}
          <span className="text-green-600 font-semibold">
            ${user.available_balance}
          </span>
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={
              user.status === "active" ? "text-green-600" : "text-red-600"
            }
          >
            {user.status}
          </span>
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>

        <div className="flex justify-between mt-6">
          <Button type="primary" danger>
            Delete User
          </Button>
          <Button
            className="!bg-green-500 hover:!bg-green-600 !border-green-500 !text-white"
            onClick={() => setIsModalOpen(true)}
          >
            Add Money
          </Button>
          <Button type="default">Payout Money</Button>
        </div>

        {/* Add Money Modal */}
        <Modal
          title={`Add Money to ${user.username || user.userId}`}
          open={isModalOpen}
          onOk={handleAddMoney}
          onCancel={() => setIsModalOpen(false)}
          confirmLoading={isAdding}
          okText="Add Money"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Amount"
              name="amount"
              rules={[
                { required: true, message: "Please enter an amount" },
                // { type: "number", min: 1, message: "Amount must be greater than 0" },
              ]}
            >
              <Input
                type="number"
                placeholder="Enter amount"
                onKeyDown={(e) =>
                  e.key === "e" || e.key === "+" || e.key === "-" ? e.preventDefault() : null
                }
              />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default UserProfile;
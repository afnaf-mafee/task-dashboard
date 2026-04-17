import React, { useState } from "react";
import CommonHeading from "../../components/commonHeading/CommonHeading";
import { useLocation } from "react-router-dom";
import { useGetSingleUserQuery } from "../../redux/services/userApiServices/userApiServices";

import { Button, Card, Modal, Form, Input, message } from "antd";

import {
  useAddMoneyMutation,
  usePayoutMoneyMutation,
} from "../../redux/services/userPaymentApiService/userPaymentApiService";

const UserProfile = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get("id");

  const { data, isLoading, error, refetch } = useGetSingleUserQuery(userId);

  /* ---------------- ADD MONEY ---------------- */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [addMoney, { isLoading: isAdding }] = useAddMoneyMutation();

  /* ---------------- PAYOUT MONEY ---------------- */
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutForm] = Form.useForm();

  const [payoutMoney, { isLoading: isPayouting }] = usePayoutMoneyMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user</p>;

  const user = data?.data;

  /* ------------ ADD MONEY FUNCTION ------------ */
  const handleAddMoney = async () => {
    try {
      const values = await form.validateFields();

      await addMoney({
        userId,
        amount: values.amount,
      }).unwrap();

      message.success(`$${values.amount} added successfully`);

      form.resetFields();
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      message.error(err?.data?.message || "Failed to add money");
    }
  };

  /* ------------ PAYOUT FUNCTION ------------ */
  const handlePayoutMoney = async () => {
    try {
      const values = await payoutForm.validateFields();

      await payoutMoney({
        userId,
        amount: values.amount,
      }).unwrap();

      message.success(`$${values.amount} payout successful`);

      payoutForm.resetFields();
      setIsPayoutModalOpen(false);
      refetch();
    } catch (err) {
      message.error(err?.data?.message || "Payout failed");
    }
  };
  const levelBadgeMap = {
    Basic: { color: "bg-gray-300 text-black", icon: "👤" },
    One: { color: "bg-blue-400 text-white", icon: "⭐" },
    Two: { color: "bg-purple-400 text-white", icon: "💎" },
    Three: { color: "bg-orange-400 text-white", icon: "🔥" },
    Four: { color: "bg-green-400 text-black", icon: "🏆" },
  };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* HEADER */}
        {/* HEADER */}
        <div className="h-40 bg-gradient-to-r to-blue-500   via-pink-600  via-pink-500 to-blue-500   relative">
          {/* Profile Image */}
          <div className="absolute -bottom-12 left-6">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-xl"
            />

            {/* ✅ Floating Level Badge */}
            <div
              className={`absolute -top-2 -right-2 px-3 py-1 rounded-full shadow-md border-2 border-white animate-bounce  font-semibold
    ${levelBadgeMap[user?.level]?.color || "bg-gray-200 text-black"}`}
            >
              {levelBadgeMap[user?.level]?.icon || "👤"}{" "}
              {user?.level || "Basic"}
            </div>
          </div>
        </div>

        {/* PROFILE */}
        <div className="pt-16 px-6 pb-6">
          <h2 className="text-xl ">UserId : {user?.userId || "User Name"}</h2>{" "}
          <h2 className="text-xl ">{user?.email || user?.phone}</h2>
          <p className="mt-4  text-2xl font-semibold">
            Total Balance: ${user.available_balance}
          </p> <p className="mt-4  text-2xl font-semibold">
          Deposit Balance: ${user?.deposit_balance || 0}
          </p>
          {/* BUTTONS */}
          <div className="flex gap-3 mt-4 flex-wrap">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-500 text-white cursor-pointer px-4 py-2 rounded-full"
            >
              Add Money
            </button>

            <button
              onClick={() => setIsPayoutModalOpen(true)}
              className="bg-orange-500 text-white px-4 cursor-pointer py-2 rounded-full"
            >
              Payout
            </button>
          </div>
        </div>
      </div>

      {/* ✅ ADD MONEY MODAL */}
      <Modal
        title="Add Money"
        open={isModalOpen}
        onOk={handleAddMoney}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={isAdding}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Enter amount" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>

      {/* ✅ PAYOUT MODAL */}
      <Modal
        title="Payout Money"
        open={isPayoutModalOpen}
        onOk={handlePayoutMoney}
        onCancel={() => setIsPayoutModalOpen(false)}
        confirmLoading={isPayouting}
      >
        <Form form={payoutForm} layout="vertical">
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Enter amount" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserProfile;

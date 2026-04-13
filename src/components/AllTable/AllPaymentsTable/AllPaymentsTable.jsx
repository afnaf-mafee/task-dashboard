import { Input, Skeleton, Table, Select, message, Popconfirm, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useState } from "react";
import { PiSmileySadLight } from "react-icons/pi";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  useGetPaymentsQuery,
  useUpdatePaymentStatusMutation,
} from "../../../redux/services/paymentsApiServices/paymentsApiServices";
import { FaRegCopy } from "react-icons/fa";

dayjs.extend(utc);
dayjs.extend(timezone);

const { Option } = Select;

const AllPaymentsTable = () => {
  const [searchId, setSearchId] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  const { data: paymentsData, isLoading } = useGetPaymentsQuery({
    transactionId: searchId,
    status: statusFilter,
  });

  const [updatePaymentStatus] = useUpdatePaymentStatusMutation();

  const payments = paymentsData?.data || [];

  // ✅ Copy Function
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    message.success(`${label} copied`);
  };

  const handleMarkCompleted = async (paymentId) => {
    try {
      setLoadingId(paymentId);

      await updatePaymentStatus({
        id: paymentId,
        status: "Completed",
      }).unwrap();

      message.success("Payment marked as Completed");
    } catch (err) {
      console.error(err);
      message.error("Failed to update status");
    } finally {
      setLoadingId(null);
    }
  };

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (transactionId) => (
        <div className="flex items-center gap-2">
          <span>{transactionId}</span>

          <Tooltip title="Copy Transaction ID">
            <FaRegCopy size={20}
              onClick={() =>
                handleCopy(transactionId, "Transaction ID")
              }
              className="cursor-pointer text-gray-500 hover:text-blue-500 transition"
            />
          </Tooltip>
        </div>
      ),
    },

    {
      title: "Method",
      dataIndex: "method",
      key: "method",
    },

    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      render: (userId) => (
        <div className="flex items-center gap-2">
          <span>{userId}</span>

          <Tooltip title="Copy User ID">
            <FaRegCopy size={20}
              onClick={() => handleCopy(userId, "User ID")}
              className="cursor-pointer text-gray-500 hover:text-blue-500 transition"
            />
          </Tooltip>
        </div>
      ),
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <span className="text-red-600 font-semibold">
          ${amount}
        </span>
      ),
    },

    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (date) =>
        dayjs(date)
          .tz("Asia/Dhaka")
          .format("YYYY-MM-DD hh:mm A"),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`font-semibold ${
            status === "Completed"
              ? "text-green-600"
              : "text-orange-500"
          }`}
        >
          {status}
        </span>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.status === "Pending" ? (
          <Popconfirm
            title="Mark payment as Completed?"
            description="Are you sure you want to complete this payment?"
            okText="Yes"
            cancelText="No"
            onConfirm={() =>
              handleMarkCompleted(record._id)
            }
          >
            <button
              disabled={loadingId === record._id}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg font-semibold transition cursor-pointer disabled:opacity-50"
            >
              {loadingId === record._id
                ? "Processing..."
                : "Mark Completed"}
            </button>
          </Popconfirm>
        ) : (
          <span className="text-gray-400 font-semibold">
            Completed
          </span>
        ),
    },
  ];

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl shadow-md mt-5 overflow-x-auto">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 max-w-md">
        <Input
          placeholder="Search by Transaction ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          size="large"
        />

        <Select
          placeholder="Filter by Status"
          value={statusFilter || undefined}
          onChange={(value) =>
            setStatusFilter(value || "")
          }
          allowClear
          size="large"
          style={{ width: 200 }}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      </div>

      {/* Table */}
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : (
        <Table
          columns={columns}
          dataSource={payments}
          rowKey="_id"
          pagination={{
            pageSize: 5,
            total: paymentsData?.total,
          }}
          scroll={{ x: "max-content" }}
          locale={{
            emptyText: (
              <div className="flex flex-col items-center justify-center py-10">
                <PiSmileySadLight className="text-3xl text-gray-400 mb-2" />
                <span className="font-bold text-gray-500 text-lg">
                  Payment does not exist
                </span>
              </div>
            ),
          }}
        />
      )}
    </div>
  );
};

export default AllPaymentsTable;
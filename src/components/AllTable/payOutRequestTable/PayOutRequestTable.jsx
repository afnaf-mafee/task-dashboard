import React, { useState, useMemo } from "react";
import { Table, Skeleton, Input, Button, Popconfirm, Tag } from "antd";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import {
  useGetAllPayoutRequestsQuery,
  useUpdatePayoutStatusMutation,
} from "../../../redux/services/payOutRequestServices/payOutRequestApiServices";

const { Search } = Input;

const PayOutRequestTable = () => {
  const { data: payOutRequest, isLoading } =
    useGetAllPayoutRequestsQuery();

  const [updateStatus, { isLoading: actionLoading }] =
    useUpdatePayoutStatusMutation();

  // ✅ search state
  const [searchText, setSearchText] = useState("");

  // ✅ format data
  const tableData = useMemo(() => {
    return payOutRequest?.data?.map((item) => ({
      key: item._id,
      ...item,
      createdAt: dayjs(item.createdAt).format(
        "YYYY-MM-DD hh:mm A"
      ),
    }));
  }, [payOutRequest]);

  // ✅ filter by userId
  const filteredData = useMemo(() => {
    if (!searchText) return tableData;

    return tableData?.filter((item) =>
      item.userId
        ?.toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText, tableData]);

  const handleCopy = (text) => {
  navigator.clipboard.writeText(text);
  toast.success("User ID copied!");
};
  // ✅ status update handler
  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success(`Payout ${status} successfully`);
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const columns = [
  {
  title: "User ID",
  dataIndex: "userId",
  key: "userId",
  sorter: (a, b) => a.userId.localeCompare(b.userId),
  render: (text) => (
    <div className="flex items-center gap-2">
      <span>{text}</span>

      <Tooltip title="Copy">
        <CopyOutlined
          onClick={() => handleCopy(text)}
          className="cursor-pointer text-gray-500 hover:text-blue-500"
        />
      </Tooltip>
    </div>
  ),
},
    {
      title: "Wallet",
      dataIndex: "wallet",
      key: "wallet",
      filters: [
        { text: "Bkash", value: "bkash" },
        { text: "Nagad", value: "nagad" },
      ],
      onFilter: (value, record) => record.wallet === value,
    },
    {
      title: "Wallet Number",
      dataIndex: "walletNumber",
      key: "walletNumber",
    },
    {
      title: "Account Type",
      dataIndex: "accountType",
      key: "accountType",
      filters: [
        { text: "Personal", value: "personal" },
        { text: "Agent", value: "agent" },
      ],
      onFilter: (value, record) =>
        record.accountType === value,
    },
    {
      title: "Amount (৳)",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },

    // ✅ STATUS COLUMN
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "Completed", value: "Completed" },
        { text: "Rejected", value: "Rejected" },
      ],
      onFilter: (value, record) =>
        record.status === value,
      render: (status) => {
        let color = "gold";

        if (status === "Completed") color = "green";
        if (status === "Rejected") color = "red";

        return <Tag color={color}>{status}</Tag>;
      },
    },

    {
      title: "Request Time",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) =>
        new Date(a.createdAt) - new Date(b.createdAt),
    },

    // ✅ ACTION COLUMN ⭐
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">

          {record.status === "Pending" && (
            <>
              <Popconfirm
                title="Approve this payout?"
                onConfirm={() =>
                  handleStatusChange(record.key, "Completed")
                }
              >
                <Button
                  type="primary"
                  size="small"
                  loading={actionLoading}
                >
                  Approve
                </Button>
              </Popconfirm>

              <Popconfirm
                title="Reject this payout?"
                onConfirm={() =>
                  handleStatusChange(record.key, "Rejected")
                }
              >
                <Button
                  danger
                  size="small"
                  loading={actionLoading}
                >
                  Reject
                </Button>
              </Popconfirm>
            </>
          )}

          {record.status === "Completed" && (
            <span className="text-green-600 font-semibold">
              Done
            </span>
          )}

          {record.status === "Rejected" && (
            <span className="text-red-600 font-semibold">
              Rejected
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mt-5">

      {/* ✅ Search */}
      <div className="mb-4 flex justify-between items-center">
        <Search
          placeholder="Search by User ID..."
          allowClear
          enterButton
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 300 }}
        />
      </div>

      {isLoading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          className="bg-white rounded-lg"
        />
      )}
    </div>
  );
};

export default PayOutRequestTable;
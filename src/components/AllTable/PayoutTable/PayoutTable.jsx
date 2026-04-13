import React from "react";
import { Table, Skeleton } from "antd";
import dayjs from "dayjs";
import { useGetPayoutQuery } from "../../../redux/services/userPaymentApiService/userPaymentApiService";

const PayoutTable = () => {
  const { data: allPayouts, isLoading } = useGetPayoutQuery();

  const payOutData = allPayouts?.data?.map((item) => ({
    key: item._id,
    ...item,
    time: dayjs(item.time).format("YYYY-MM-DD hh:mm A"), // 12-hour format
  }));

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      sorter: (a, b) => a.userId.localeCompare(b.userId),
    },
    {
      title: "Amount (৳)",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: [
        { text: "Payout", value: "payout" },
        { text: "Deposit", value: "deposit" },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Completed", value: "completed" },
        { text: "Pending", value: "pending" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <span
          className={`px-2 py-1 rounded-full text-white ${
            status === "completed" ? "bg-green-500" : "bg-yellow-500"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Time (BD)",
      dataIndex: "time",
      key: "time",
      sorter: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">Payout History</h3>
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <Table
          columns={columns}
          dataSource={payOutData}
          pagination={{ pageSize: 5 }}
          className="bg-white rounded-lg"
        />
      )}
    </div>
  );
};

export default PayoutTable;
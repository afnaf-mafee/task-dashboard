import { Input, Skeleton, Table } from "antd";
import { useState } from "react";
import { PiSmileySadLight } from "react-icons/pi";
import { useGetUsersQuery } from "../../../redux/services/userApiServices/userApiServices";
import { Link } from "react-router-dom";

const AllUsersTable = () => {
  const [searchId, setSearchId] = useState("");

  const { data: usersData, isLoading } = useGetUsersQuery(searchId);

  const users = usersData?.data || [];

  const columns = [
    { title: "User ID", dataIndex: "userId", key: "userId" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Balance",
      dataIndex: "available_balance",
      key: "balance",
      render: (balance) => (
        <span className="text-green-600 font-semibold">${balance}</span>
      ),
    },
    { title: "Refer By", dataIndex: "invite", key: "invite" }, // Add actual field if available
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
      <Link to={`/user?id=${record.userId}`}>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg font-semibold transition cursor-pointer">
          Profile
        </button></Link>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl shadow-md mt-5 overflow-x-auto">
      {/* Search Input */}
      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Search by User ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          size="large"
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : (
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={users}
            rowKey="_id"
            pagination={{ pageSize: 5, total: usersData?.total }}
            scroll={{ x: "max-content" }} // Makes table horizontally scrollable
            locale={{
              emptyText: (
                <div className="flex flex-col items-center justify-center py-10">
                  <PiSmileySadLight className="text-3xl text-gray-400 mb-2" />
                  <span className="font-bold text-gray-500 text-lg">
                    User does not exist
                  </span>
                </div>
              ),
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AllUsersTable;
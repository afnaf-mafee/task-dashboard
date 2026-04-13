import { Input, Skeleton, Table, Select } from "antd";
import { useState } from "react";
import { PiSmileySadLight } from "react-icons/pi";
import { useGetUsersQuery } from "../../../redux/services/userApiServices/userApiServices";
import { Link } from "react-router-dom";
import { FaStar, FaUserAlt, FaGem } from "react-icons/fa";
import { MdGrade } from "react-icons/md";
const AllUsersTable = () => {
  const [searchId, setSearchId] = useState("");
  const [level, setLevel] = useState(""); // New state for level filter

  // Fetch users with searchId and level filter
  const { data: usersData, isLoading } = useGetUsersQuery({ searchId, level });

  const users = usersData?.data || [];

  const columns = [
    { title: "User ID", dataIndex: "userId", key: "userId" },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      render: (level) => {
        let color = "";
        let Icon = null;

        switch (level) {
          case "Basic":
            color = "bg-gray-300 text-gray-800";
            Icon = FaUserAlt;
            break;
          case "One":
            color = "bg-blue-300 text-blue-800";
            Icon = FaStar;
            break;
          case "Two":
            color = "bg-purple-300 text-purple-800";
            Icon = FaGem;
            break;
          case "Three":
            color = "bg-orange-300 text-orange-800";
            Icon = MdGrade;
            break;
          case "Four":
            color = "bg-green-300 text-green-800";
            Icon = FaStar; // reuse star for Four
            break;
          default:
            color = "bg-gray-200 text-gray-700";
            Icon = FaUserAlt;
        }

        return (
          <span
            className={`flex items-center gap-1 px-2 py-1 rounded-full font-semibold text-sm ${color}`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            {level}
          </span>
        );
      },
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Balance",
      dataIndex: "available_balance",
      key: "balance",
      render: (balance) => (
        <span className="text-green-600 text-xl font-semibold">${balance}</span>
      ),
    },
    {
      title: "Refer By",
      dataIndex: "invite",
      key: "invite",
      render: (invite) => {
        const hasReferrer = invite && invite !== "";
        const color = hasReferrer
          ? "bg-green-200 text-green-800"
          : "bg-gray-200 text-gray-700";

        return (
          <span
            className={`px-2 py-1 rounded-full font-semibold text-sm ${color}`}
          >
            {hasReferrer ? invite : "None"}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link to={`/user?id=${record.userId}`}>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg font-semibold transition cursor-pointer">
            Profile
          </button>
        </Link>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl shadow-md mt-5 overflow-x-auto">
      {/* Search and Level Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        {/* Search Input */}
        <Input
          placeholder="Search by User ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          size="large"
          className="max-w-sm"
        />

        {/* Level Filter */}
        <Select
          placeholder="Filter by Level"
          size="large"
          allowClear
          className="max-w-xs"
          value={level || undefined}
          onChange={(value) => setLevel(value || "")}
          options={[
            { label: "Basic", value: "Basic" },
            { label: "One", value: "One" },
            { label: "Two", value: "Two" },
            { label: "Three", value: "Three" },
            { label: "Four", value: "Four" },
          ]}
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
            scroll={{ x: "max-content" }}
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

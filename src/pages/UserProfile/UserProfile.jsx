import React from "react";
import CommonHeading from "../../components/commonHeading/CommonHeading";
import { useLocation } from "react-router-dom";
import { useGetSingleUserQuery } from "../../redux/services/userApiServices/userApiServices";
import { Button, Card, Modal } from "antd";

const UserProfile = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get("id");
  const { data, isLoading, error } = useGetSingleUserQuery(userId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user</p>;

  const user = data?.data;
  return (
    <div className="p-6 flex justify-center font-urbanist">
      <Card
        title={`User ID: ${user.userId}`}
        className="w-full max-w-md shadow-lg rounded-xl"
        bordered={false}
      >
       
        <p><strong>Username:</strong> {user.username || "N/A"}</p>
        <p><strong>Email:</strong> {user.email || "N/A"}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p>
          <strong>Balance:</strong>{" "}
          <span className="text-green-600 font-semibold">${user.available_balance}</span>
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={user.status === "active" ? "text-green-600" : "text-red-600"}>
            {user.status}
          </span>
        </p>
        <p><strong>Role:</strong> {user.role}</p>

        <div className="flex justify-between mt-6">
          <Button type="primary" danger>
            Delete User
          </Button>
          <Button type="default" >
            Payout Money
          </Button>
        </div>

        <Modal
          title="Confirm Delete"
   
          okText="Delete"
          okButtonProps={{ danger: true }}
        >
          <p>Are you sure you want to delete this user?</p>
        </Modal>
      </Card>
    </div>
  );
};

export default UserProfile;

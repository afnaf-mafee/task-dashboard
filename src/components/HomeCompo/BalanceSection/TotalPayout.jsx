import React from "react";
import { useGetTotalPayoutsQuery } from "../../../redux/services/userPaymentApiService/userPaymentApiService";

const TotalPayout = () => {
  const { data, isLoading, isError } = useGetTotalPayoutsQuery();

  if (isLoading) {
    return <p className="text-center text-blue-500">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Something went wrong</p>;
  }

  return (
    <div className="p-6 w-[50%]">
      <div className="">
        {/* Total Transactions */}
        <div className="bg-gradient-to-r from-yellow-400 to-red-400 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300">
          <h2 className="text-lg font-semibold mb-2">💸 Total Payout</h2>
          <p className="text-3xl font-bold mb-4">৳ {data?.totalAmount || 0}</p>

          <h2 className="text-lg font-semibold mb-2">
            📤 Withdraw Requests {data?.totalTransactions || 0}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TotalPayout;

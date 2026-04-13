import React from "react";
import { useGetTotalCompletedPaymentsQuery } from "../../../redux/services/userPaymentApiService/userPaymentApiService";

const TotalPayment = () => {
  const { data, isLoading, isError } = useGetTotalCompletedPaymentsQuery();

  if (isLoading) {
    return <p className="text-center text-blue-500">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Something went wrong</p>;
  }

  return (
    <div className="p-6 w-[50%]">
      <div className="">
        {/* Total Revenue Card */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500/40 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300">
          <h2 className="text-lg font-semibold ">💰 Total Deposit</h2>
          <p className="text-3xl font-bold mb-4">৳ {data?.totalAmount || 0}</p>
          <h2 className="text-lg font-semibold mb-2">
            📊 Transactions {data?.totalTransactions || 0}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TotalPayment;

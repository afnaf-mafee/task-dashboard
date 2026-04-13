import React from "react";
import toast from "react-hot-toast";
import UserChart from "../../components/HomeCompo/UserChart/UserChart";
import BalanceSection from "../../components/HomeCompo/BalanceSection/BalanceSection";
import TotalPayment from "../../components/HomeCompo/BalanceSection/TotalPayment";
import TotalPayout from "../../components/HomeCompo/BalanceSection/TotalPayout";

const Home = () => {
  return (
    <section className="bg-white p-5 rounded-md ">
      <div className="flex">
        <TotalPayment />
        <TotalPayout />
      </div>
      <UserChart />
    </section>
  );
};

export default Home;

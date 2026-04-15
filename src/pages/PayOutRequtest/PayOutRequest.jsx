import React from "react";
import CommonHeading from "../../components/commonHeading/CommonHeading";
import PayOutRequestTable from "../../components/AllTable/payOutRequestTable/PayOutRequestTable";

const PayOutRequest = () => {
  return (
    <section>
      <CommonHeading text={"Payout Request"} />
      <PayOutRequestTable />
    </section>
  );
};

export default PayOutRequest;

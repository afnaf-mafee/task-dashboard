import React from "react";
import CommonHeading from "../../components/commonHeading/CommonHeading";
import AllGatewayTable from "../../components/AllTable/AllGatewayTable/AllGatewayTable";

const Gateway = () => {
  return (
    <section>
      <CommonHeading text={"All Payment Gateway"} />
      {/* table Section */}
      <AllGatewayTable />
    </section>
  );
};

export default Gateway;

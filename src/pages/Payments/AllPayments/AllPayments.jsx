import React from 'react';
import CommonHeading from '../../../components/commonHeading/CommonHeading';
import AllPaymentsTable from '../../../components/AllTable/AllPaymentsTable/AllPaymentsTable';

const AllPayments = () => {
    return (
         <section>
            <CommonHeading text={"Payments"}/>
            {/* table Section */}
         <AllPaymentsTable/>
        </section>
    );
};

export default AllPayments;
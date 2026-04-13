import React from 'react';
import CommonHeading from '../../components/commonHeading/CommonHeading';
import PayoutTable from '../../components/AllTable/PayoutTable/PayoutTable';

const Payout = () => {
    return (
       <section>
            <CommonHeading text={"Payout History"}/>
            {/* table Section */}
         <PayoutTable/>
        </section>
    );
};

export default Payout;
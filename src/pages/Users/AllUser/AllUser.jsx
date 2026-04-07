import React from 'react';
import CommonHeading from '../../../components/commonHeading/CommonHeading';
import AllUsersTable from '../../../components/AllTable/AllUsersTable/AllUsersTable';


const AllUser = () => {

    return (
        <section>
            <CommonHeading text={"All Users"}/>
            {/* table Section */}
            <AllUsersTable/>
        </section>
    );
};

export default AllUser;
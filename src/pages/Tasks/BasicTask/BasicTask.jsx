import React from 'react';
import CommonHeading from '../../../components/commonHeading/CommonHeading';
import AllTaskTable from '../../../components/AllTable/AllTaskTable/AllTaskTable';

const BasicTask = () => {
    return (
        <div>
           <CommonHeading text={"All Tasks"}/>
           <AllTaskTable/>
        </div>
    );
};

export default BasicTask;
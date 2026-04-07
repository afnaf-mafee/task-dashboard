import React from 'react';
import CommonHeading from '../../components/commonHeading/CommonHeading';
import AllOfferTable from '../../components/AllTable/OfferTable/OfferTable';

const Offer = () => {
    return (
        <div>
            <CommonHeading text={"Offer"}/>
            <AllOfferTable/>
        </div>
    );
};

export default Offer;
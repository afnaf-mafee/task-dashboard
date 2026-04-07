import React from 'react';
import toast from 'react-hot-toast';

const Home = () => {
    return (
        <div>
           <h3>Home</h3> 
           <button onClick={() => {
            toast.success("hi")
           }}>Click</button>
        </div>
    );
};

export default Home;
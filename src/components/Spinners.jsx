import React from 'react'
import PulseLoader from "react-spinners/PulseLoader";

const cssOverride = {
    display: 'block',
    margin: '100px auto',
}

const Spinners = ({loading}) => {
  return (
    <div className="flex justify-center items-center h-screen">
        <PulseLoader
        color="#4338ca"
        cssOverride={cssOverride}
        loading={loading}
        size={15}
        />  
    </div> )
}

export default Spinners
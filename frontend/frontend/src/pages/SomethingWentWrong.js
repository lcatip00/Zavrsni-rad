import React from 'react'
import { useParams } from 'react-router-dom'

const SomethingWentWrong = () =>{
    
    const { errormessages } = useParams();

    return(
        
        <div className="center d-flex justify-content-center">
           <p className="error-text-style">{errormessages}</p>
        </div>
    );
};

export default SomethingWentWrong;
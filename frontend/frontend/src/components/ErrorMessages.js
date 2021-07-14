import React from 'react'

const ErrorMessages = (props) => {
    return(
        // messages
        <div className="fixed error-message mt-2 mb-2">
           <li> {props.fielderrorMessages}</li>
        </div>
    )
}

export default ErrorMessages;
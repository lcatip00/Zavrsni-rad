import axios from 'axios'
import React from 'react'

const DeleteCommentButton = (props) =>{

    const handleClick = () => {
        const token = localStorage.getItem('token');

        axios.delete(`http://127.0.0.1:8000/comments/delete/${props.id}`,{headers: {
            'Authorization': `Token ${token}` 
          }
        }).then(res => {
            console.log(res)
            window.location.reload(true);
        }).catch(err => {
            console.log(err)
        })
    }

    return(
        <div className="float-right">
            <button className="btn btn-secondary btn-sm mt-2 float-right" onClick={handleClick}>Delete comment</button>
        </div>
    )
}

export default DeleteCommentButton;
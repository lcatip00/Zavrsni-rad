import axios from 'axios'
import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'

const DeletePostButton = (props) =>{

    const [redirect, setRedirect] = useState(false);

    const handleClick = () => {
        const token = localStorage.getItem('token');
        axios.delete(`http://127.0.0.1:8000/posts/delete/${props.slug}`,{headers: {
            'Authorization': `Token ${token}` 
          }
        }).then(res => {
            setRedirect(true);
        }).catch(err => {
            console.log(err)
        })
    }

    if (redirect){
        return <Redirect to="/"></Redirect>
    }

    return(
        <div className="float-right ms-auto mr-2 ">
            <button className="btn btn-secondary btn-sm mr-1 mb-2" onClick={handleClick}>Delete Post</button>
        </div>
    )
}

export default DeletePostButton;
import axios from 'axios'
import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'

const DeletePostButton = (props) =>{

    const [redirect, setRedirect] = useState(false);

    const handleClick = () => {
        const token = localStorage.getItem('token');
        axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/delete/${props.slug}`,{headers: {
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
            <button type="button" className="btn btn-secondary btn-sm mr-1 mb-2" data-toggle="modal" data-target="#exampleModal">
                Delete Post
            </button>


            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete Post</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this post?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick} data-dismiss="modal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>  
    )
}

export default DeletePostButton;
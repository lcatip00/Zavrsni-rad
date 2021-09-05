import axios from 'axios';
import moment from "moment";
import React, {useState} from 'react'

const CommentForm = (props) => {

    const [content, setContent] = useState('')
    const [toastmessage, setToastmessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault()
        
        const data ={
            'post': props.postId,
            'content': content,
            'publish': moment().format("YYYY-MM-DD")
        }
        const token = localStorage.getItem('token');

        axios.post(`${process.env.REACT_APP_BASE_URL}/comments/create/`, data, {headers: {
            'Authorization': `Token ${token}` 
          }}).then(res => {
                window.location.reload(true);
            }).catch(err =>{
                console.log(err.response.status)
                if(err.response.status == 401){
                    alert("Please log in")
                    setToastmessage("Please log")
                }
            })
    }

    return(
        <div className="card-body">
            {/* form for comment input */}
            <form className="mb-4" onSubmit={handleSubmit}>
                <textarea 
                    className="form-control" 
                    rows="3" 
                    placeholder="Join the discussion and leave a comment!"
                    onChange={e => setContent(e.target.value)}>
                </textarea>
                <button className="btn btn-secondary mt-3"  type="submit" >Submit</button>
            </form>
        </div>
    )
}

export default CommentForm
import axios from 'axios'
import React from 'react'

const VoteButtons = (props) => {

    // const data ={ "vote": false, "post": props.postId, "account": 2}

    const handleLikeButton = () => {
        const token = localStorage.getItem('token');

        axios.post(`http://127.0.0.1:8000/votes/like/`,
            {
                "vote": true,
                "post": props.postId,
            }, 
            {headers: {
                    'Authorization': `Token ${token}`
            }})
            .then(res => {console.log(res)
            window.location.reload(true);
            })
            .catch(err => {
                if(err.response.status == 401){
                    alert("You must be login to vote")
                }
            })
    }

    const handleDislike = () => {
        const token = localStorage.getItem('token');
       
        axios.post(`http://127.0.0.1:8000/votes/dislike/`,
            {
                "vote": false,
                "post": props.postId,
            },
            {headers: {
                    'Authorization': `Token ${token}`
            }})
            .then(res => {console.log(res)
                window.location.reload(true);
            })
            .catch(err => {
                console.log(err)
                if(err.response.status == 401){
                    console.log("idel")
                    alert("You must be login to vote")
                }
        })
    }

    return (
         <div>
            <button type="button" onClick={handleLikeButton} className="btn btn-secondary btn-sm mr-1">{props.likeNumber} Like</button>
            <button type="button" onClick={handleDislike} className="btn btn-secondary btn-sm">{props.dislikeNumber} Dislike</button>
        </div>
    );
}

export default VoteButtons;
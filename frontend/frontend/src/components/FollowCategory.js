import axios from 'axios'
import React from 'react'

const FollowCategory = (props) => {

    const handleClick = () => {
        const token = localStorage.getItem('token');
        const data ={}
        if (token == null){
           alert("Please log in")
        }
        else{
            axios.post(`http://127.0.0.1:8000/categories/follow/${props.slug}/`, data, {headers: {
                'Authorization': `Token ${token}`}
            }).then(res =>{ 
                window.location.reload(true);
            })
            .catch(err => {console.log(err)})
        }
    }

    return(     
        <div>
            <button type="button" className="btn btn-secondary btn-sm mt-2 mr-1" onClick={handleClick}>
                Follow
            </button>
        </div>
    )
}

export default FollowCategory;
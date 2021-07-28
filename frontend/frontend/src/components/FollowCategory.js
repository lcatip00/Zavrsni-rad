import axios from 'axios'
import React, {useState, useEffect} from 'react'

const FollowCategory = (props) => {
    const [isFollower, setIsFollower]  = useState();
    
    
    useEffect(() => {
        // check if user is follower
        checkIsFollower();
    }, [isFollower]);

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

    const checkIsFollower = () => {
        const token = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:8000/categories/isFollower/${props.slug}/`, {headers: {
            'Authorization': `Token ${token}`}
        }).then(res =>{
            setIsFollower(res.data.follower)
            console.log("res za foll: ", res.data.follower)
        }).catch(err => {console.log("eror je: ",err)})
    }

    return(     
        <div>
            {/* if user is follower show btn unfollow */}
            {
                isFollower == "true" && 
                    <button type="button" className="btn btn-secondary btn-sm mt-2 mr-1" onClick={handleClick}>
                        Unfollow 
                    </button>       
            }
            {/* if user is not follower show btn follow */}
            {
                isFollower == "false" && 
                    <button type="button" className="btn btn-secondary btn-sm mt-2 mr-1" onClick={handleClick}>
                        Follow
                    </button>
            }           
        </div>
    )
}

export default FollowCategory;
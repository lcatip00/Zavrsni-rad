import {Link} from 'react-router-dom'
import React from 'react'

const ProfileCard = (props) =>{
    return(
        <div class="card mb-3" >
            <div class="row g-0">
                <div class="col-md-4">
                    <img src={props.profileImage} alt="..." width="130" className="rounded mb-2 img-thumbnail"/>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <Link to={{pathname: `/profile/${props.slug}`}} className="link">{props.username}</Link>
                        <h5 class="card-title">{props.username}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;
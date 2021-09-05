import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

const Profile = (props) => {
   
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const { slug } = useParams();
    const [username, setUsername] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
       
        axios.get(`${process.env.REACT_APP_BASE_URL}/accounts/${slug}`)
        .then(res=>{
            setUsername(res.data.username)
            setFirstName(res.data.first_name)
            setLastName(res.data.last_name)
            setEmail(res.data.email)
            setDescription(res.data.description)
            setProfileImage(res.data.profile_image)
        })
        .catch(err=> console.log(err))
    }

    return(
        <div className="container mt-100">
            <div className="row ">
                <div className="col col-lg-10 mr-1">
                    {/* <!-- Profile widget --> */}
                    <div className="bg-white shadow rounded overflow-hidden">
                        <div className="px-4 pt-0 pb-4 bg-dark">
                            <div className="media align-items-end profile-header">
                                <div className="profile mr-3 mt-4">
                                    <img src={profileImage} alt="..." width="130" className="rounded mb-2 img-thumbnail"/>
                                </div>
                                <div className="media-body mb-5 text-white">
                                    <h4 className="mt-0 mb-0">{username}</h4>
                                </div>
                            </div>
                        </div>

                        <div className="py-4 px-4">
                            <div className="py-4">
                                {/* profile info */}
                                <div className="tab-content py-4">
                                    <div className="tab-pane active p-4 bg-light rounded shadow-sm" id="profile">
                                            <h5 className="font-italic mb-3">First name: </h5>
                                            <p className="font-italic mb-0"> {firstName} </p>
                                        <hr></hr>
                                        <h5 className="font-italic mb-3">Last name: </h5>
                                            <p className="font-italic mb-0"> {lastName} </p>
                                        <hr></hr>
                                        <h5 className="font-italic mb-3">Email: </h5>
                                            <p className="font-italic mb-0">{email} </p>
                                        <hr></hr>
                                        <h5 className="font-italic mb-3">About me: </h5>
                                        <p className="font-italic mb-0"> {description} </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
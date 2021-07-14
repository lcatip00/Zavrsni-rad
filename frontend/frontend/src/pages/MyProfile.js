import axios from 'axios'
import EditMyProfile from '../components/EditMyProfile'
import React, {useEffect, useState} from 'react'
import UpdateProfileImage from '../components/UpdateProfileImage'

const MyProfile = () => {
    
    const [slug, setSlug] = useState('');
    const [changeProfileImageModal, setChangeProfileImageModal] = useState(false);
    // const [data, setData] = useState({ 
    //                             'description': description,
    //                             'first_name': firstName,
    //                             'last_name': lastName,
    //                             'email': email});
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        fetchData();    
    }, []);

    const fetchData = () => {
        const token = localStorage.getItem('token');

        axios.get(`http://127.0.0.1:8000/accounts/myprofile`,
        {headers: {
          'Authorization': `Token ${token}`
        }})
        .then(res=>{
            setSlug(res.data.results[0].slug)
            setUsername(res.data.results[0].username)
            setFirstName(res.data.results[0].first_name)
            setLastName(res.data.results[0].last_name)
            setEmail(res.data.results[0].email)
            setDescription(res.data.results[0].description)
            setProfileImage(res.data.results[0].profile_image)
        })
        .catch(err=> console.log(err))
    }

    const handleChangeProfileImage = () =>{
        setChangeProfileImageModal(true)
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
                                <div>
                                    <button className="btn btn-secondary mt-3" onClick={handleChangeProfileImage}>
                                        Change Profile Image
                                    </button>
                                </div>
                                <div>
                                    {/* button for image change */}
                                    {
                                        changeProfileImageModal == true &&
                                        <UpdateProfileImage 
                                            slug={slug} 
                                            setChangeProfileImageModal={setChangeProfileImageModal}
                                            changeProfileImageModal={changeProfileImageModal}
                                        ></UpdateProfileImage>}
                                </div>
                            </div>
                        </div>

                        <div className="py-4 px-4">
                            <div className="py-4">
                                {/* navbar */}
                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <a href="" data-target="#profile" data-toggle="tab" className="nav-link ">Profile</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="" data-target="#edit" data-toggle="tab" className="nav-link">Edit</a>
                                    </li>
                                </ul>
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
                                        <h5 className="font-italic mb-3">Description: </h5>
                                        <p className="font-italic mb-0"> {description} </p>
                                    </div>

                                    {/* edit */}
                                    {
                                        slug &&
                                        <div className="tab-pane p-4 bg-light rounded shadow-sm" id="edit">
                                            <EditMyProfile 
                                                firstName={firstName}
                                                lastName={lastName}
                                                email={email}
                                                description={description}
                                                slug={slug}
                                                setSlug={setSlug}
                                            ></EditMyProfile>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;
import axios from 'axios'
import React, {useState, useEffect} from 'react'

const UpdateProfileImage = (props) => {

    const [image, setImage] = useState("null");

    const handleImageChange = (event) => {
        event.preventDefault()
        if (event.target.files && event.target.files[0]) {
            setImage({
                image: event.target.files[0]
            })
            console.log("dvidim: ",  event.target.files)
        }
    }

    const submit = (event) =>{
        event.preventDefault()

        let data = new FormData();
        const id = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (image.image){
            data.append("profile_image", image.image)
            axios.put(`${process.env.REACT_APP_BASE_URL}/accounts/changeProfileImage/${id}/`, data,{headers: {
                'Authorization': `Token ${token}`
            }}).then(res =>{
                props.setChangeProfileImageModal(false)
                window.location.reload(true);
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const handleClose = () =>{
        props.setChangeProfileImageModal(false)
    }

    return(
       

    <div className="modal-body"  tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-toggle="modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" >title</h5>
                        </div>
                
                        <div className="modal-body">
                            <div className="tab-pane p-4 bg-light rounded shadow-sm" id="edit">
                            <form role="form" id="postForm" onSubmit={submit}>
                               <div className="form-group row">
                               <label className="col-lg-3 col-form-label form-control-label">Image</label>
                                     <div className="col-lg-9">
                                         <input 
                                            className="mt-10" 
                                            type="file" 
                                            placeholder="Add new image" 
                                           onChange={handleImageChange}>
                                       </input>
                                    </div>
                               </div>
                             </form> 
                                
                            </div>
                        </div>
                        {/* buttons for submit and discard */}
                        <div className="modal-footer">
                         <button className="btn btn-secondary mt-3" type="submit" form="postForm"  >Submit</button>
                         <button  className="btn btn-secondary mt-3" onClick={handleClose}>Discard</button>
                     </div>
                    </div>
                </div>
            </div>
    
    )
}

export default UpdateProfileImage;


// -----------dio za prikaz profile image, radi

    //     <section className="modal-main">
    //         <div className="modal-body"  tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-toggle="modal" >
    //             <div className="modal-dialog" role="document">
    //                 <div className="modal-content">
    //                     <div className="modal-header">
    //                         <h5 className="modal-title">Change Profile Image</h5>
    //                     </div>
    //                 <div className="modal-body">
    //                     <div className="tab-pane p-4 bg-light rounded shadow-sm" id="edit">
    //                         <form role="form" id="postForm" onSubmit={submit}>
    //                             <div className="form-group row">
    //                                 <label className="col-lg-3 col-form-label form-control-label">Image</label>
    //                                 <div className="col-lg-9">
    //                                     <input 
    //                                         className="mt-10" 
    //                                         type="file" 
    //                                         placeholder="Add new image" 
    //                                         onChange={handleImageChange}>
    //                                     </input>
    //                                 </div>
    //                             </div>
    //                         </form>
    //                     </div>
    //                 </div>
    //                 <div className="modal-footer">
    //                     <button className="btn btn-secondary mt-3" type="submit" form="postForm"  >Submit</button>
    //                     <button  className="btn btn-secondary mt-3" onClick={handleClose}>Discard</button>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </section>
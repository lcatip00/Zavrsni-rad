import axios from 'axios'
import ErrorMessages from './ErrorMessages'
import React, { useState } from 'react'

const CreatePostForm = ({actionTitle, acton, categoryId, showCreatePostForm, setShowCreatePostForm}) =>{

    
    const [content, setContent] = useState("");
    const [fielderrorMessages, setFielderrorMessages] = useState({});
    const [image, setImage] = useState("null");
    const [title, settitle] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault()

        const token = localStorage.getItem('token');
        let data = new FormData();

        data.append("title", title)

        // image field is optional
        // it is necessary to check if image exists
         if (image.image){
            data.append("image", image.image)
         }
        
        data.append("content", content)
        data.append("category", categoryId)

        axios.post(`${process.env.REACT_APP_BASE_URL}/posts/create/`, data, {headers: {
            'Authorization': `Token ${token}`
          }})
            .then(res => {
                console.log(res)
                setShowCreatePostForm(!showCreatePostForm);
                window.location.reload(true);
            }).catch(err =>
                {console.log("err: ",err)
                setFielderrorMessages(err.response.data)}
            )
        
    }

    const handleImageChange = (event) => {
        event.preventDefault()
        if (event.target.files && event.target.files[0]) {
            setImage({
                image: event.target.files[0]
            })
        }
    }
    // when usser click on discard, remove his input
    // and hode form
    const hideForm = (event) => {
        event.preventDefault()
        if(showCreatePostForm == false){
            settitle("")
            setContent ("")
            setImage("null")
        }
        setShowCreatePostForm(!showCreatePostForm)
    }

  return (
    <>
        {/* if showCreatePostForm is true show form */}
        {showCreatePostForm ? 
        (
            <div className="modal-body"  tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-toggle="modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" >{actionTitle}</h5>
                        </div>
                
                        <div className="modal-body">
                            <div className="tab-pane p-4 bg-light rounded shadow-sm" id="edit">
                                <form role="form" id="postForm" onSubmit={handleSubmit}>
                                    {/* add post title */}
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Post Title*</label>
                                        <div className="col-lg-9">
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            onChange={e => settitle(e.target.value)}
                                        >
                                        </input>
                                        </div>
                                    </div>
                                    {/* add post description form */}
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Description*</label>
                                        <div className="col-lg-9">
                                        <textarea 
                                                className="form-control mt-10" 
                                                rows="3" 
                                                placeholder="Add Post description ..."
                                                onChange={e => setContent(e.target.value)}>
                                        </textarea>
                                        </div>
                                    </div>
                                    {/* image selector */}
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Image</label>
                                        <div className="col-lg-9">
                                        <input
                                            className=" mt-10"
                                            type="file"
                                            placeholder="Add new image"
                                            onChange={handleImageChange}>
                                        </input>
                                        </div>
                                    </div>
                                    {/* if there is any error display them */}
                                    {
                                        Object.keys(fielderrorMessages).length != 0 &&
                                        (
                                            <ul className="error-border">
                                                {
                                                    Object.keys(fielderrorMessages).map(key =>{
                                                        const message = fielderrorMessages[key]
                                                        return <ErrorMessages fielderrorMessages={message}></ErrorMessages>
                                                    })
                                                }
                                            </ul>
                                        )
                                    }
                                </form>
                            </div>
                        </div>
                        {/* buttons for submit and discard */}
                        <div className="modal-footer">
                            <button className="btn btn-secondary mt-3" type="submit" form="postForm" >Submit</button>
                            <button  className="btn btn-secondary mt-3" onClick={hideForm}>Discard</button>
                        </div>
                    </div>
                </div>
            </div>
        ) : null}
    </>
  )
}

export default CreatePostForm;
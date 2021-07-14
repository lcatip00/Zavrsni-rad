import axios from 'axios'
import React, { useState, useEffect } from 'react'

const UpdatePost = (props) => {

    const [data, setData] = useState({});
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("null");
    const [title, setTitle] = useState("");
    let dataAxios = new FormData();
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        axios.get(`http://127.0.0.1:8000/posts/${props.slug}`)
        .then(res=>{
            setTitle(res.data.title);
            setDescription(res.data.content);
            setImage(res.data.image);
        }  )
        .catch(err=> console.log(err))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token');
        // let dataAxios = new FormData();
        console.log("srenje: ", dataAxios)
        console.log("Data u endsgi: ", data)
        console.log("prije tit", title)
        console.log("s des", description)
        // console.log("s img", image.image)

        if ('title' in data){
            console.log("UPd tit", title)
            dataAxios.append("title",title)
        }
        if ('description' in data){
            console.log("UPd des", description)
            dataAxios.append("content",description)     
        }
        if ('image' in data){
            console.log("UPd img", image.image)
            dataAxios.append("image", image.image)
        }
        // console.log("data: ", dataAxios.values())
        for (var value of dataAxios.values()) {
            console.log("val",value);
         }
        // if(title != ""){
        //     console.log("UPd tit", title)
        //     dataAxios.append("title",title)
        // }
        // if(description != ""){
        //     console.log("UPd des", description)
        //     dataAxios.append("description",description)
        // }
        // if (image.image != undefined){
        //     console.log("UPd img", image.image)
        //     dataAxios.append("image", image.image)
        // // }
        // console.log("data: ", dataAxios   )

        axios.patch(`http://127.0.0.1:8000/posts/${props.slug}/update/`, dataAxios, {headers: {
            'Authorization': `Token ${token}`
          }})
        .then(res => {
            //if request is successful close foorm and reefresh page
            props.setShowModal(false);
            window.location.reload(true);
        }).catch(err => {
            console.log("err: ", err)
        })
    }

    const handleClose = () => {
        props.setShowModal(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch(name){
            case "title":
                console.log("first_name izmj",e.target.value )
                setTitle(e.target.value)
            break;
            case "description":
                console.log("last_name izmj: ", e.target.value)
                setDescription(e.target.value)
            break;
            case "image":
                if (e.target.files && e.target.files[0]) {
                    setImage({
                        image: e.target.files[0]
                    })
                    console.log("dvidim: ",  e.target.files)
                }
            break;
        }

        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log("Sta je u data: ", data )
    }

    return(
        <section className="modal-main">
            <div className="modal-body"  tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-toggle="modal" >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Update Post</h5>
                        </div>
                        <div className="modal-body">
                            <div className="tab-pane p-4 bg-light rounded shadow-sm" id="edit">
                                <form role="form" id="poxstForm">
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Post Title</label>
                                        <div className="col-lg-9">
                                        <input
                                            type="text" 
                                            placeholder="Title"
                                            name="title"
                                            value={title}
                                            onChange={handleChange}>
                                        </input>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Description</label>
                                        <div className="col-lg-9">
                                        <input
                                                // className="form-control mt-10"
                                                // rows="3" 
                                                type="textarea" 
                                                placeholder="Add Post description ..."
                                                name="description"
                                                value={description}
                                                onChange={handleChange}>
                                        </input>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Image</label>
                                        <div className="col-lg-9">
                                        <input className=" mt-10" type="file" placeholder="Add new image"
                                        name="image"
                                        onChange={handleChange}
                                        ></input>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* submit and discard btns */}
                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary mt-3"
                                type="submit"
                                form="postForm"
                                onClick={handleSubmit}>
                                Submit
                            </button>
                            <button className="btn btn-secondary mt-3" onClick={handleClose}>Discard</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UpdatePost;
import axios from 'axios'
import React, {useState, useEffect} from 'react'

const EditMyProfile  = (props) => {

    const [data, setData] = useState({});
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
 
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData =  () => {
        const token = localStorage.getItem('token');

        axios.patch(`${process.env.REACT_APP_BASE_URL}/accounts/${props.slug}/update/`, data,
        {headers: {
          'Authorization': `Token ${token}`
        }})
        .then(res=>{
            setFirstName(res.data.first_name)
            setlastName(res.data.last_name)
            setEmail(res.data.email)
            setDescription(res.data.description)
        }  )
        .catch(err=> console.log(err))
    }

    const update = (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token');
  
        axios.patch(`${process.env.REACT_APP_BASE_URL}/accounts/${props.slug}/update/`, data,
        {headers: {
          'Authorization': `Token ${token}`
        }})
        .then(res=>{
            setFirstName(res.data.first_name)
            setlastName(res.data.last_name)
            setEmail(res.data.email)
            setDescription(res.data.description)
            window.location.reload(true);
        }  )
        .catch(err=> console.log(err))
    }

    // on input change input value
    const handleChange = (e) => {
        const { name, value } = e.target;

        switch(name){
            case "first_name":
                setFirstName(e.target.value)
            break;
            case "last_name":
                setlastName(e.target.value)
            break;
            case "email":
                setEmail(e.target.value)
            break;
            case "description":
                setDescription(e.target.value)
            break;
        }

        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return(
        <div>
            <form role="form" onSubmit={update}>
                <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">First name</label>
                    <div className="col-lg-9">
                        <input
                            className="form-control"
                            type="text"
                            value={firstName}
                            name= "first_name"
                            onChange={handleChange}>
                            </input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Last name</label>
                    <div className="col-lg-9">
                        <input
                            className="form-control"
                            type="text"
                            value={lastName}
                            name= "last_name"
                            onChange={handleChange}>
                            </input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Email</label>
                    <div className="col-lg-9">
                        <input
                            className="form-control"
                            type="email"
                            value={email}
                            name="email"
                            onChange={handleChange}>
                        </input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Description</label>
                    <div className="col-lg-9">
                        <input
                            className="form-control"
                            type="text"
                            value={description}
                            name="description"
                            onChange={handleChange}>
                        </input>
                    </div>
                </div>
                <button className="btn btn-secondary" type="submit">Edit</button>
            </form>
        </div>
    )
}

export default EditMyProfile;
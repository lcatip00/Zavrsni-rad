import axios from 'axios'
import ErrorMessages from '../components/ErrorMessages'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'


const Register = () => {
    
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errormessages, setErrormessages] = useState("");
    const [fielderrorMessages, setFielderrorMessages] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [username, setUsername] = useState('');

    //on submit create new user
    const handleSubmit = (e) =>{
        e.preventDefault()
        const data ={
            "username": username,
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "password": password,
            "password2": confirmPassword
        }

        // check is some required field is empy
        if(username == "" || email == "" || password == "" || confirmPassword == ""){
            setFielderrorMessages({"messages": ["Please fill all fields with *"]})
        }else{
            axios.post('http://127.0.0.1:8000/accounts/create/', data)
            .then(res => {
                    setRedirect(true);
                    window.location.reload(true);
                }
            ).catch(err => {
                try{
                    setFielderrorMessages(err.response.data)
                }catch (error){
                    if (!error.response) {
                        // network error
                        setErrormessages("Network error")
                    } else {
                        setErrormessages("Something went wrong")
                    }
                }
            })
        }
    }

    //if user is successfully created redirect to login page
    if (redirect){
        return <Redirect to="/login"></Redirect>
    }
 
    return(
        <div>
            {/* handle network error */}
            {
                errormessages &&
                <Redirect to={{pathname: `/SomethingWentWrong/${errormessages}`}}></Redirect>
            }
            <main className="form-signin">
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Please Register</h1>
                    
                    <div className="form-floating mb-3 row">
                        <input type="text" className="form-control" placeholder="Username*"
                            onChange={e => setUsername(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Username *</label>
                    </div>
                    <div className="form-floating mb-3 row">
                        <input type="text" className="form-control" placeholder="First Name"
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <label htmlFor="floatingInput">First Name</label>
                    </div>
                    <div className="form-floating mb-3 row">
                        <input type="text" className="form-control" placeholder="Last Name"
                            onChange={e => setLastName(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Last Name</label>
                    </div>
                    <div className="form-floating mb-3 row">
                        <input type="email" className="form-control" placeholder="name@example.com*"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Email address *</label>
                    </div>
                    <div className="form-floating mb-1 row">
                        <input type="password" className="form-control" placeholder="Password*"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Password *</label>
                    </div>
                    <div className="form-floating mb-3 row">
                        <input type="password" className="form-control" placeholder="Confirm Password*"
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Confirm Password *</label>
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
                    <div>
                        <button className="w-100 btn btn-lg btn-secondary" type="submit">Register</button>
                    </div> 
                </form>
            </main>
        </div>
    );
};

export default Register;
import axios from 'axios'
import ErrorMessages from '../components/ErrorMessages'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'


const Login = () => {

    const [errormessages, setErrormessages] = useState("");
    const [fielderrorMessages, setFielderrorMessages] = useState({});
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [username, setUsername] = useState('');

    //on submit login user
    const handleSubmit = async (event) => {
        event.preventDefault()
        const data ={
            "username": username,
            "password": password,
        }

        // Set error message if some field is empty
        if (password == '' || username == ''){
            setFielderrorMessages({'non_field_errors': "All fields must be filled"})
        }else{
            // post request to login user if theere is no empty field
            await axios.post(`${process.env.REACT_APP_BASE_URL}/accounts/rest-auth/login/`, data)
            .then(res => {
                //set token to the local storage
                localStorage.setItem('token', res.data.key)
                setRedirect(true);
            }).catch( err => {
                // Set error messages
                try{
                    setFielderrorMessages(err.response.data)
                }catch (error){
                    if (!error.response) {
                        // network error
                        setErrormessages("Network error")
                    } else {
                        setErrormessages("Something went worng")
                    }
                }
            })
        }
    }

    // if user is successfully logged in, save user ID
    // then redirect to the home page
        if (redirect){
            const token = localStorage.getItem('token');

            axios.get(`${process.env.REACT_APP_BASE_URL}/accounts/rest-auth/user`, {headers: {
                'Authorization': `Token ${token}` 
                }}).then(
                res => {
                    localStorage.setItem('user', res.data.pk)
                    window.location.reload(true);
                }
            ).catch(err =>{console.log(err)})

            return <Redirect to="/"></Redirect>
        }

    return (
        <div>
            {/* if there is some errores redirect to SomethingWentWrong page */}
            {
                errormessages &&
                <Redirect to={{pathname: `/SomethingWentWrong/${errormessages}`}}></Redirect>
            }
            <main className="form-signin">
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    {/* <!-- Username field --> */}
                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="Username"
                            onChange={e => setUsername(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    {/* <!-- Password field--> */}
                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    {/* Handle error display */}
                    {
                        fielderrorMessages.non_field_errors &&
                        (
                            <ul className="error-border">
                                <ErrorMessages fielderrorMessages={fielderrorMessages.non_field_errors}></ErrorMessages>
                            </ul>
                        )
                    }
                    {/* <!-- Button to log in --> */}
                    <button className="w-100 btn btn-lg btn-secondary" type="submit">Login</button>
                    <a href="http://localhost:8000/admin/login/">Login as Admin</a>
                </form>
            </main>
        </div>
    );
};

export default Login;
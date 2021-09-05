import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Redirect, Router, Link } from 'react-router-dom'
import styled from 'styled-components'

const Styles = styled.div`{
    .navBar {
        background-color: #111;
    }

    .navbar-brand, .navbar-nav, .nav-link{
        color: #bbb;

        &: hover {
            color: red;
        }
    }
}`;

const handleLogoutClick = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/accounts/rest-auth/logout/`)
    .then(res => {console.log(res)})
    .catch(err => {console.log(err)})
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.reload(true);
}

const NavigationBar = () => {

    const [query, setQuery] = useState("");

    const useEffect  =() =>{
        window.location.reload(true);
    }

    return(
        <div>

            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark mb-10">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/categoryList" className="nav-link active">Category List</Link>
                            </li>
                            {/* if the user is logged in show profile button */}
                            {/* else do not show it  */}
                            {
                                localStorage.getItem('token')?
                                <li className="nav-item">
                                    <Link to="/myprofile/" className="nav-link active">My Profile</Link>
                                </li>
                                :null
                            }
                        </ul>
                        
                        <form inline className="d-flex me-2 inline">
                        
                            <input
                                className="form-control"
                                onChange={e => setQuery(e.target.value)}
                                type="text"
                                placeholder="Enter search term..."
                            />
                            <Link  to={{pathname: `/search/${query}`}} className="link">
                                <h5 className="btn btn-secondary">Search</h5>
                            </Link>                        
                        </form>
                        

                        {/* if user is logged in show button logout otherwise sho buttons login and register */}
                        {
                            localStorage.getItem('token')?
                            <div>
                                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link active" onClick={handleLogoutClick} >Logout</Link>
                                    </li>
                                </ul>
                            </div>:

                            <div>
                                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-link active">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/register" className="nav-link active">Register</Link>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavigationBar;
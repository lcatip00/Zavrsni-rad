import axios from 'axios'
import PostList from './PostList'
import React, {useEffect, useState} from 'react'
import MyCategories from './MyCategories'
import { Container } from 'react-bootstrap';
import Pagination from './Pagination';

const LoggedUserPosts = () => {
    
    useEffect(() => {
        //when user refresh page, url is empty string
        //pa je nuzno da postavimo u url inicijalnu vrjednost
        if (url == ""){
            //set url depending on user authentication
            console.log("url je nista")
            localStorage.getItem('token')? setUrl("http://127.0.0.1:8000/posts/followedPosts"):
            setUrl("http://127.0.0.1:8000/posts/")
        }
        //display data depending on user authentication
        localStorage.getItem('token')? loggedUserData() : unLoggedUserData()
    }, [url]);
    // ccekaj da se popuni url polje pa onda radi nesto

    
    //get post list for authenticated user
    const loggedUserData = async () => {
        //kad sredim dio na bckendu dohvti podatke ovisno o tome je li korisnik logiran
        const token = localStorage.getItem('token');
        axios.get( url, {headers: {
            'Authorization': `Token ${token}`
          }
        }).then(res => {
            setAllPosts(res.data.results)
            setPostNumber(res.data.count)
            setPrevUrl(res.data.previous)
            setNextUrl(res.data.next)
            console.log("prev je: ",res.data.previous)
            console.log("next je: ", res.data.next)
            // putPageNumbers()
        }).catch(err => console.log(err))
    }

    return (
        <div>
            <div class=" col container">
                {allPostsData &&
                <PostList postData={allPostsData}></PostList>}
                {url && <Pagination
                    postNumber={postNumber}
                    url={url}
                    setUrl={setUrl}
                    prevUrl={prevUrl}
                    nextUrl={nextUrl}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                ></Pagination>}
            </div>
            {/* list of followed categories */}
            {
                localStorage.getItem('token')&&
                <div class="col-3 container ">
                    <MyCategories></MyCategories>
                </div>
            }
        </div>
    )
};

export default LoggedUserPosts;
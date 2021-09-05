import axios from 'axios'
import MyCategories from '../components/MyCategories'
import Pagination from '../components/Pagination'
import PostList from '../components/PostList'
import React, {useEffect, useState} from 'react'

const Home = () => {

    const [allPostsData, setAllPosts] = useState([]);
    const [baseUrl, setBaseUrl] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [nextUrl, setNextUrl] = useState(null);
    const [nuberOfPosts, setNumberOfPosts] = useState(0);
    const [prevUrl, setPrevUrl] = useState(null);
    const [url, setUrl] = useState("");

    useEffect(() => {
        fetchData();
    }, [nuberOfPosts, url]);// wait for number of posts and url

    const fetchData =  () =>{
        // if baseUrl is empty and user is logged 
        // then set url http://127.0.0.1:8000/posts/followedPosts
        if(localStorage.getItem('token') && baseUrl == ""){
            setBaseUrl(`${process.env.REACT_APP_BASE_URL}/posts/followedPosts`)
            setUrl(`${process.env.REACT_APP_BASE_URL}/posts/followedPosts`)
        }
        // if user is not logged and there is no token 
        // set url http://127.0.0.1:8000/posts/
        if(!localStorage.getItem('token') && baseUrl == ""){
            setBaseUrl(`${process.env.REACT_APP_BASE_URL}/posts/`)
            setUrl(`${process.env.REACT_APP_BASE_URL}/posts/`)
        }

        // get user data
        if(localStorage.getItem('token')){
            console.log("Url u home: ", url)
            const token = localStorage.getItem('token')

             axios.get(url,{headers: {
                'Authorization': `Token ${token}`
                }
            }).then(res => {
                setAllPosts(res.data.results)
                setPrevUrl(res.data.previous)
                setNextUrl(res.data.next)
                setNumberOfPosts(res.data.count)
            }).catch(err =>{
                console.log("err: ", err)
            })
        }
        else{
            console.log("Url u home: ", url)
             axios.get(url)
            .then(res => {
                setAllPosts(res.data.results)
                setPrevUrl(res.data.previous)
                setNextUrl(res.data.next)
                setNumberOfPosts(res.data.count)
            }).catch(err =>{
                console.log("Err: ", err)
            })
        }
    }

    return(
        <div class="container">
            <div class="row mt-100">
                <div class="col-9 container">
                    {/* list of all posts */}
                    {
                        allPostsData && 
                        <PostList postData={allPostsData}></PostList>
                    }
                    {/* pagination */}
                    {
                        Number(nuberOfPosts) === 0 ? 
                        null:
                        <Pagination
                            baseUrl={baseUrl}
                            nuberOfPosts={nuberOfPosts}
                            url={url}
                            setUrl={setUrl}
                            prevUrl={prevUrl}
                            nextUrl={nextUrl}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        ></Pagination>  
                    }
                </div>
                {/* list of followed categories */}
                {
                    localStorage.getItem('token')&&
                    <div class="col-3 container ">
                        <MyCategories></MyCategories>
                    </div>
                }
            </div>
        </div>
    )
};

export default Home;
import axios from 'axios'
import CreatePostForm from '../components/CreratePostForm'
import FollowCategory from '../components/FollowCategory'
import PostList from '../components/PostList'
import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'

const Category = (props) => {
 
    const [categoryId, setCategoryId] = useState(0);
    const currentUser = localStorage.getItem('user');
    const [numberOfFollowers, setNumberOfFollowers] = useState(0);
    const [postList, setPostList] = useState([]);
    const [showCreatePostForm, setShowCreatePostForm] = useState(false);
    const { slug } = useParams();
    const [title, setTitle] = useState('');

    useEffect(() => {
        fetchData();
    }, [postList]);

    const fetchData =  () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/categories/${slug}`)
        .then(res=>{
            setTitle(res.data.name)
            setNumberOfFollowers(res.data.followers.length)         
            setPostList(res.data.posts)
            setCategoryId(res.data.id)
        }  )
        .catch(err=> console.log(err))
    }

    const openCreatePostForm = () =>{
        setShowCreatePostForm(!showCreatePostForm)
    }

    return(
        <div className="container mt-100">
            <div className="row">
                <div className="col-lg-10">
                    <article>
                        <header className="mb-4">
                            <h1 className="fw-bolder mb-1">{title}</h1>
                                <div inline className="d-flex me-2">
                                    {/* show number of followers */}
                                    <button type="button" className="btn btn-secondary btn-sm mr-1 disabled mt-2">
                                        Followers: {numberOfFollowers}
                                    </button> 
                                    {/* Follow category*/}
                                    <FollowCategory slug={slug}></FollowCategory>

                                    {/* allow to create new post for registred users */}
                                    {currentUser && 
                                        <button 
                                            type="button" 
                                            onClick={openCreatePostForm} 
                                            className="btn btn-secondary ms-auto btn-sm mt-2 float-right"
                                        >
                                            Create new post +
                                        </button>
                                    }
                                </div>
                            <hr></hr>
                            {/* show create post from if user click on button "Create new post +" */}
                            <CreatePostForm 
                                actionTitle={'Cerate new post'} 
                                acton={"create"} 
                                categoryId={categoryId}
                                showCreatePostForm={showCreatePostForm}
                                setShowCreatePostForm={setShowCreatePostForm}
                            ></CreatePostForm>
                        </header>
                        </article>
                        <div className="container">
                            <PostList postData={postList}></PostList>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Category;
import axios from 'axios'
import CategoryCard from '../components/CategoryCard'
import PostCard from '../components/PostCard'
import ProfileCard from '../components/ProfileCard'
import React, {useEffect, useState} from 'react'
import { useParams} from 'react-router-dom'

const Search = (props) =>{
    
    const [categories, setCategories] = useState(null);
    const [posts, setPosts] = useState(null);
    const [profiles, setProfiles] = useState(null);
    const { query } = useParams();

    useEffect(() => {
        fetchData();
    }, [query]);
    // ovo [query] je tu tako da mi se ucita komponenta svaki put kad se query promjeni


    const fetchData = async () => {

        axios.get(`${process.env.REACT_APP_BASE_URL}/search/${query}/`)
        .then(res=>{
            setProfiles(res.data.accounts)
            setCategories(res.data.categories)
            setPosts(res.data.posts)
        })
        .catch(err=> console.log(err))
    }

    return(
        <div className="mt-100">
            <div className="container mt-100">
                <div className="row ">
                    <div className="col col-lg-10 mr-1">
                    <div className="py-4 px-4">
                            <div className="py-4">
                                {/* navbar */}
                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <a href="" data-target="#profile" data-toggle="tab" className="nav-link ">Profiles</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="" data-target="#categories" data-toggle="tab" className="nav-link">Categories</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="" data-target="#posts" data-toggle="tab" className="nav-link">Posts</a>
                                    </li>
                                </ul>
                                <div className="tab-content py-4">
                                    {/* profiles list */}
                                    <div className="tab-pane active p-4 bg-light rounded shadow-sm" id="profile">
                                        {
                                            profiles &&
                                            (profiles.length == 0?
                                                <div>
                                                    <h5>No content</h5>
                                                </div>:
                                                profiles.map(profile =>(
                                                <ProfileCard 
                                                    key={profile.id} 
                                                    profileImage={profile.profile_image}
                                                    username={profile.username}
                                                    slug={profile.slug}>
                                                </ProfileCard>
                                            )))
                                        }
                                    </div>
                                    {/* categories list */}
                                    <div className="tab-pane p-4 bg-light rounded shadow-sm" id="categories">
                                         {
                                            categories &&
                                            (categories.length == 0?
                                                <div>
                                                    <h5>No content</h5>
                                                </div>:
                                                categories.map(category => (
                                                <CategoryCard slug={category.slug} name={category.name}></CategoryCard>
                                            )))
                                        }
                                    </div>
                                    {/* post list */}
                                    <div className="tab-pane p-4 bg-light rounded shadow-sm " id="posts">
                                        {
                                            posts &&
                                            (posts.length == 0?
                                                <div>
                                                    <h5>No content</h5>
                                                </div>:
                                                posts.map(post => (
                                                <PostCard key={post.slug} post={post}></PostCard>
                                            )))
                                        }
                            
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;
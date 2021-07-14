import axios from 'axios'
import Comment from '../components/Comment'
import CommentForm from '../components/CommentForm'
import DeletePostButton from '../components/DeletePostButton'
import React, { useState, useEffect } from 'react'
import UpdatePost from '../components/UpdatePost'
import { useParams } from 'react-router-dom'
import VoteButtons from '../components/VoteButtons'

// export const VoteContext = React.createContext();

const PostDetail = (props) => {
    
    const [comments, setComments] =useState([]);
    const currentUser = localStorage.getItem('user');
    const [dislikeNumber, setDislikeNumber] = useState(0);
    const [likeNumber, setLikeNumber] =useState(0);
    const [postDetails, setPostDetails] = useState({});
    const [showModal, setShowModal] = useState(false);
    const { slug } = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        axios.get(`http://127.0.0.1:8000/posts/${slug}`)
        .then(res=>{
            setLikeNumber(res.data.likes.length)
            setDislikeNumber(res.data.dislikes.length)
            setComments(res.data.comments)
            setPostDetails(res.data)
        }  )
        .catch(err=> console.log(err))
    }

    const handleUpdateBtnCLick = () => {
        setShowModal(true)
    }

    return(
        <div className="container mt-100">
            <div className="row d-flex justify-content-sm-between">
                <div className="col ">
                    <article className="">
                        <header className="mb-4">
                            <h1 className="fw-bolder mb-1 text-center">{postDetails.title}</h1>
                        </header>
                        {
                            postDetails.image &&
                            <img src={postDetails.image} class="img-fluid mx-auto d-block" alt="Responsive image"></img>
                        }
                        {/* <!-- Post content--> */}
                        <section className="mb-5 mt-5">
                            <p className="fs-5 mb-4">{postDetails.content}</p>
                        </section>
                        <div className="text-muted fst-italic mb-5">
                                Posted on by {postDetails.username}
                            </div>
                    </article>
                </div>
            </div>
            <div className="d-flex flex-row me-2">
                <VoteButtons likeNumber={likeNumber} dislikeNumber={dislikeNumber} postId={postDetails.id}></VoteButtons>
                {
                    currentUser == postDetails.userId && 
                    <DeletePostButton slug={slug}></DeletePostButton>
                }
                {
                    currentUser == postDetails.userId &&
                        <button className="btn btn-secondary btn-sm mr-1 mb-2" onClick={handleUpdateBtnCLick}>
                            Update
                        </button>
                }
                {
                    showModal &&
                    <UpdatePost slug={slug} showModal={showModal} setShowModal={setShowModal} ></UpdatePost>
                }
            </div>
            <hr></hr>
            {/* list of comments */}
            <div className="mt-5">
                <p className="ml-9"><b><i>Comments:</i></b></p>
                {
                    comments.map(comment =>(
                        <Comment
                            content={comment.content}
                            publishDate={comment.publish}
                            author={comment.username}
                            id={comment.id}
                            commentAuthor={comment.authorId}
                            currentUser={currentUser}>
                        </Comment>
                    ))
                }  
                <CommentForm postId={postDetails.id}></CommentForm>
            </div>
        </div>
    );
}

export default PostDetail;
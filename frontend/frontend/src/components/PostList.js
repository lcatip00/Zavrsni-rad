import PostCard from './PostCard'
import React from 'react'

const PostList = (props) => {

    return( 
        <div className="mt-100 row d-flex align-content-start flex-wrap" data-masonry='{"percentPosition": true }'>
                {
                    props.postData.length == 0?
                        <h5 className="text-center"><b><i>There is no content</i></b></h5>
                    :
                    props.postData.map(post => (
                        <PostCard key={post.slug} post={post}></PostCard>
                    ))
                }
        </div>
    );
}

export default PostList;
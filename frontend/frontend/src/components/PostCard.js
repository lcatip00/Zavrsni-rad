import { Link } from "react-router-dom"
import React from 'react'

const PostCard = (props) => {

    const image = props.post.image

    return(
        <div className="col-sm-6 col-lg-4 mb-4 ">
            {/* card-h set same size cards */}
            <div class="card card-h ">
               {image && <img class="card-img-top border" src={props.post.image} />}
               <div className="card-body">
                     <Link to={{pathname: `/post/${props.post.slug}`}} className="link">
                         <h5 className="card-title ellipsis">{props.post.title}</h5>
                     </Link>
                     <p className="card-text ellipsis">{props.post.content}</p>
                     {/* <p className="card-text"><small className="text-muted">Created: {props.post.publish}</small></p> */}
                 </div>
                <div class="card-footer">
                    <small class="text-muted">Created: {props.post.publish}</small>
                </div>
            </div>
        </div>
    )
}

// ----------------card posta s normalnim slikama-----------------------------
// <div className="card">
//                 {/* show image if exists */}
//                 {
//                     image &&
//                     <img
//                         src={props.post.image}
//                         alt="..." 
//                         width="130"
//                         className="rounded mb-2 img-thumbnail photo center-block mw-100 mh-100 card-img-custom mr-auto ml-auto"
//                     />
//                 }
//                 <div className="card-body">
//                     <Link to={{pathname: `/post/${props.post.slug}`}} className="link">
//                         <h5 className="card-title">{props.post.title}</h5>
//                     </Link>
//                     <p className="card-text ellipsis  ">{props.post.content}</p>
//                     <p className="card-text"><small className="text-muted">Created: {props.post.publish}</small></p>
//                 </div>
//             </div>




// // // // // // // -----------------ovo mi je bio prikaz image-------------------
// {image && 
//     <svg 
//         className="bd-placeholder-img d-flex justify-content-center" 
//         width="100%" 
//         height="100%" 
//         xmlns="http://www.w3.org/2000/svg"
//         role="img" 
//         aria-label="Placeholder: Image cap" 
//         preserveAspectRatio="xMidYMid slice" 
//         focusable="false"
//         >
//             {/* originel
//             className=" bd-placeholder-img card-img-top" */}
//             {/* {console.log(image)} */}
//             {/* <title>Placeholder</title> */}
//             {/* <rect width="100%" height="100%" fill="#ffffff"/> */}
//             {/* <text width="100%" height="100%" fill="#dee2e6" dy=".3em">Image cap</text> */}
//             <image className=" mw-100 mh-100 center-block card-img-custom " href={props.post.image}></image>
            
//     </svg>}

export default PostCard;
import DeleteCommentButton from './DeleteCommetnButton'
import React from 'react'

const Comment = (props) => {
    return(
      <div className="d-flex mt-5">
        <div className="ms-3">
          {/* display author and content of comment */}
          <div className="fw-bold">{props.author}</div>
            {props.content}
            <p className="card-text"><small className="text-muted">{props.publishDate}</small></p>
          </div>
          {/* if user is comment owner show delete btn */}
          <div className="float-right mr-2 ms-auto ">
            {
              props.currentUser == props.commentAuthor &&
              <DeleteCommentButton id={props.id}></DeleteCommentButton>
            }
          </div>
      </div>
    );
}

export default Comment;
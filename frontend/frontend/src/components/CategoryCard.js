import React from 'react'
import {Link} from 'react-router-dom'
import {ListGroup} from 'react-bootstrap'

const CategoryCard = (props) => {
    return(
        <div>
            <ListGroup.Item action variant="light">
                <Link to={{pathname: `/category/${props.slug}`}} className="link">{props.name}</Link>
            </ListGroup.Item>
        </div>
    )
}

export default CategoryCard;
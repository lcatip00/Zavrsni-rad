import axios from 'axios'
import {Link} from 'react-router-dom'
import React, {useEffect, useState} from 'react'

const MyCategories = () => {
    const [myCategoriesList, setMyCategoriesList] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData =  () => {
        const token = localStorage.getItem('token');
        axios.get(`${process.env.REACT_APP_BASE_URL}/categories/myCategories`,
        {headers: {
            'Authorization': `Token ${token}`
          }})
        .then(res=>{
            setMyCategoriesList(res.data.results)
        }  )
        .catch(err=> console.log(err))
    }

    return(
        <div className="card mr-2 ml-10 mt-100" >
            <div className="card-header">My Categories</div>
            <div className="card-body">
                <div className="row-md ">
                    <ul className="list-unstyled">
                        {/* show list of followe categories */}
                        {
                            myCategoriesList &&
                            myCategoriesList.map(category  => (
                                <li key={category.slug}>
                                    <Link
                                        to={{pathname: `/category/${category.slug}`}}
                                        key={category.slug}
                                        className="link">{category.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MyCategories;
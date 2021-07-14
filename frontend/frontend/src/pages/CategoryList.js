import axios from 'axios'
import CategoryCard from '../components/CategoryCard'
import {ListGroup} from 'react-bootstrap'
import React, { useState, useEffect } from 'react'

const CategoryList = () => {

    const [categoryList, setCategoryList] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        axios.get(`http://127.0.0.1:8000/categories/list/`)
        .then(res=>{
            console.log(res.data.results)
            setCategoryList(res.data)
        }  )
        .catch(err=> console.log(err))
    }

    return(
        <div className="mt-100">
            {/* Page to show list of all existing categories */}
            <ListGroup >
            {
                categoryList.results && 
                categoryList.results.map(category  => (
                    <CategoryCard key={category.slug} slug={category.slug} name={category.name}></CategoryCard>
                ))
            }
            </ListGroup>
        </div>
    );
}

export default CategoryList;
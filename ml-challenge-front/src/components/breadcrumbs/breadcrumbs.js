import React from 'react';
import './breadcrumbs.scss';


const Breadcrumbs = ({categories}) => {
    return (
        <ul className="list-categories">
            {
                categories.map((category, index)=>{
                    return (
                    <li key={index}>{category}</li>
                    )
                })
            }
        </ul>
    )
    
}

export default Breadcrumbs;
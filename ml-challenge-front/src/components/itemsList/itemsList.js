import React, { useEffect, useState } from 'react';
import './itemsList.scss';
import ItemCard from '../itemCard/itemCard';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'
import { Link, useLocation } from 'react-router-dom';
import Config from '../../Config';

const ItemsList = () => {
    const [dataItems, setdataItems] = useState([]);
    const useLoc = useLocation();

    const getItems = async () => {
        try {
            const res = await fetch(`${Config.BASE_URL}/items${useLoc.search}`);
            const data = await res.json();
            setdataItems(data);
            sessionStorage.setItem('categories', JSON.stringify(data.categories));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(useLoc.search) {getItems()}
    },[useLoc.search])

    return (
        <div>
            {dataItems.categories &&
                <Breadcrumbs
                    categories={dataItems.categories}
                />
            }
            {dataItems.items &&
                dataItems.items.map((item)=>{
                    return (
                        <Link 
                            key = {item.id} 
                            to = {`/items/${item.id}`}>
                            <ItemCard
                                item = {item}
                            />
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default ItemsList;
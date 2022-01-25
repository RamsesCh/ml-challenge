import React, { useEffect, useState } from 'react';
import './itemDetail.scss';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import formatNumber from '../../assets/utils/numberFromatMiles';
import Config from '../../Config';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const ItemDetail = (props) => {
    const [dataItem, setdataItem] = useState();
    const categories = JSON.parse(sessionStorage.getItem('categories'));
    const idParam = props.match.params.id;

    const getDataItem = async () => {
        try {
            const respuesta = await fetch(`${Config.BASE_URL}/items/${idParam}`);
            const data = await respuesta.json();

            setdataItem(data.item);
        } catch(error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getDataItem();
    }, [idParam]);
    
    return (
            <div>
                { categories &&
                    <Breadcrumbs categories={categories} />
                }
                { dataItem &&
                    (<div className="content-item"> 
                        <div className="col-left">
                            <div className="image-item">
                                <Carousel showArrows={false} showIndicators={false} showStatus={false} thumbWidth={100}>
                                    {dataItem.picture.map((item)=>{
                                        return (
                                                <div>
                                                    <img src={item.secure_url} />
                                                </div>
                                            
                                        )
                                    })
                                    }
                                </Carousel>
                            </div>
                            <div className="description-item">
                                <p className="title">Descripción del producto</p>
                                <p className="description">{dataItem.description}</p>
                            </div>
                        </div>
                        <div className="col-right">
                            <p className="condition-item">
                                {dataItem.condition === 'new' ? 'Nuevo': 'Usado'} 
                                {dataItem.sold_quantity !== 0 && ` - ${dataItem.sold_quantity} vendidos`}</p>
                            <p className="title-item">{dataItem.title}</p>
                            <p className="price-title">
                                <span className="price">$ {formatNumber(dataItem.price.amount)}</span><span className="decimals">00</span>
                            </p>
                            <button className="btn-shop">Comprar</button>
                        </div>
                    </div>)
                }
                
            </div>
    )
}

export default ItemDetail;
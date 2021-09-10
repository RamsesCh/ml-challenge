import React from 'react';
import './itemCard.scss';
import freeShippingLogo from '../../assets/img/ic_shipping.png';
import formatNumber from '../../assets/utils/numberFromatMiles';


const ItemCard = ({item}) => {
    
    return (
        <div className="item-card">
            <div className="item-container">
                <div className="item-picture">
                    <img src={item.picture} alt="img"></img>
                </div>
                <div className="data-item">
                    <div className="item-price">
                        <span className="price">$ {formatNumber(item.price.amount)}</span>
                        {
                            item.free_shipping && (<img className="free-shipping" alt="freeshipping" src={freeShippingLogo}></img>)
                            
                        }
                    </div>
                    <span className="item-title">{item.title}</span>
                </div>
            </div>
            <span className="item-location">{item.location}</span>
        </div>
    )
}

export default ItemCard;
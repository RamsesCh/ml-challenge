import React, { useState } from 'react';
import './searchBox.scss';
import MlLogo from '../../assets/img/Logo_ML.png';
import searchLogo from "../../assets/img/ic_Search.png";
import { useHistory } from 'react-router-dom';

const SearchBox = () => {
    const [search, setSearch] = useState();
    const history = useHistory();
    

    const dataChange = (e) => {
        setSearch(e.target.value);
    }

    const dataSubmit = (e) => {
        if(search){
            history.push(`/items?q=${search}`)
        }
        e.preventDefault();
    }

    return (
        <div className="searchbox-container">
            <a href="/">
                <img src={MlLogo} alt="Mercado Libre" className="searchbox-logo-ml" />
            </a>
            <form id="formSearch" className="searchbox-form" onSubmit={dataSubmit} autoComplete="off">
                <input
                    className="searchbox-input"
                    type="search"
                    placeholder="Nunca dejes de buscar"
                    aria-label="Nunca dejes de buscar"
                    onChange = {dataChange}
                />
                <button
                className="searchbox-btn"
                type="submit">
                    <img src={searchLogo} alt="Search logo" />
                </button>
            </form>
        </div>
    )
}

export default SearchBox;
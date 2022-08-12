import { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import dotenv from 'dotenv';

dotenv.config();

function SearchBar () {
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

    let search = "";
    const [searchList, setSearchList] = useState([]);

    async function handleSearch (search) {
        try {
            const { data } = await axios.get(`${REACT_APP_API_URL}/search/${search}`);
            
            setSearchList(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SearchContainer>
            <SearchInput>
                <DebounceInput
                    minLength = {3}
                    debounceTimeout = {300}
                    onChange={e => {
                        handleSearch(e.target.value);
                    }}
                    placeholder = "Search for people"
                    className = "searchBar-input"
                    type = "text"
                />
                <AiOutlineSearch className = "search-icon" />
            </SearchInput>
        </SearchContainer>
    )
}

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    .search-icon {
        width: 21px;
        height: 21px;
        margin-top: 13px;
        margin-right: 17px;
        position: absolute;
        right: 0;
        top: 0;
        color: #C6C6C6;
`

const SearchInput = styled.div`
    width: 563px;
    height: 45px;
    border-radius: 8px;
    background: #FFFFFF;
    position: relative;    
    display: flex;

    .searchBar-input {
        width: 100%;
        padding-left: 26px;
        border: none;
        border-radius: 8px;

        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        
        &::placeholder {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-size: 19px;
            line-height: 23px;
            color: #C6C6C6;
        }
    }
`

export default SearchBar;
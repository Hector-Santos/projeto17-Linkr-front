import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import dotenv from 'dotenv';
import styled from "styled-components";

dotenv.config();

function SearchBar () {
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

    const [searchResults, setSearchResults] = useState([]);

    async function userSearch (name) {
        try {
            const { data } = await axios.get(`${REACT_APP_API_URL}/search/${name}`);
            
            setSearchResults(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    function SearchResult ({ username, pictureUrl }) {
        return (
            <ResultsItem>
                <img src={pictureUrl} alt={'img'} />
                <h2>{username}</h2>
            </ResultsItem>
        )
    }

    return (
        <Container>
            <SearchInput>
                <DebounceInput
                    minLength = {3}
                    debounceTimeout = {300}
                    onChange={e => {
                        if (e.target.value.length) {
                            userSearch(e.target.value);
                        } else {
                            setSearchResults([]);
                        }
                    }}
                    placeholder = "Search for people"
                    className = "searchBar-input"
                    type = "text"
                />
                <AiOutlineSearch className = "search-icon" />
            </SearchInput>
            <ResultsList>
                {searchResults.length > 0 ? (
                    searchResults.map((user, i) => {
                        return <SearchResult
                            pictureUrl={user.pictureUrl}
                            username={user.username}
                            key={i} />
                    })
                ) : ""}
            </ResultsList>
        </Container>
    )
}

const Container = styled.div`    
    display: flex;
    flex-direction: column;
    position: relative;
`;

const ResultsList = styled.div`
    width: 100%;
    max-height: 100vh;
    padding-top: 45px;
    border-radius: 8px;
    background: #E7E7E7;
    position: absolute;
    top: 0;
    left: 0;
`;

const SearchInput = styled.div`
    width: 563px;
    height: 45px;
    border-radius: 8px;
    background: #FFFFFF;
    display: flex;
    position: relative;
    z-index: 1;

    .searchBar-input {
        width: 100%;
        padding-left: 26px;
        border: none;
        border-radius: 8px;

        font-family: 'Lato';
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        
        &::placeholder {
            font-family: 'Lato';
            font-weight: 400;
            font-size: 19px;
            line-height: 23px;
            color: #C6C6C6;
        }
    }

    .search-icon {
        width: 21px;
        height: 21px;
        margin-top: 13px;
        margin-right: 17px;
        color: #C6C6C6;
        position: absolute;
        right: 0;
        top: 0;
    }
`;

const ResultsItem = styled.div`
    padding-bottom: 10px;
    padding-top: 10px;
    display: flex;
    align-items: center;
 
    img {
        width: 39px;
        height: 39px;
        margin-left: 15px;
        border-radius: 50%;
    }
  
    h2 {
        margin-left: 15px;
        font-family: 'Lato';
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #515151;
    }
`;

export default SearchBar;
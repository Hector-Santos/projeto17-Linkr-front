import TrendingHashtag from "./TrendingHashtag";
import styled from "styled-components";

const TrendingDiv = styled.div`
    
    margin-left: 20px;
    background-color: #171717;
    border-radius: 16px;
    width: 50%;
    padding: 20px;
    height: fit-content;
    
    h5 {
        font-family: 'Oswald', sans-serif;   
        font-size: 26px;
    }

    hr {
        border-color: #484848;
    }

    a {
        margin: 10px 0;
        font-weight: bold;
        font-family: 'Oswald', sans-serif;
        font-size: 18px;
        text-decoration: none;
        display: block;
        color: #fff;
    }
`;

export default function TrendingSidebar(){

    return(
        <TrendingDiv>
            <h5><strong>Trending</strong></h5>
            <hr />
            <TrendingHashtag />
            <TrendingHashtag />
            <TrendingHashtag />
            <TrendingHashtag />
            <TrendingHashtag />
            <TrendingHashtag />
        </TrendingDiv>
    );

};
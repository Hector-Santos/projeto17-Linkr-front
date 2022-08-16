import TrendingHashtag from "./TrendingHashtag";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const TrendingDiv = styled.div`
    max-width: 300px;
    margin-top: 65px;
    margin-left: 20px;
    background-color: #171717;
    width: 300px;
    border-radius: 16px;
    width: 65%;
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

    @media only screen and (max-width: 640px) {
        display: none;
    }

`;

export default function TrendingSidebar(){

    const [hashtags, setHashtags] = useState([]);

    function getHashtagsContent(){

        const validHashtags = [...hashtags].filter(hashtag => hashtag !== '');

        validHashtags.sort((a, b) => b.count - a.count);
        return validHashtags.map(hashtag => <TrendingHashtag name={hashtag.name} />)

    }

    useEffect(()=>{

        (async ()=>{

            try {
                
                const { data } = await axios.get(`${REACT_APP_API_URL}/trending-hashtags`);
                setHashtags(data);

            } catch (err) {
                console.log(err);
                alert('Ocorreu um erro ao carregar a lista de trendings.');
            }

        })();

    }, []);

    return(
        <TrendingDiv>
            <h5><strong>Trending</strong></h5>
            <hr />
            {getHashtagsContent()}
        </TrendingDiv>
    );

};
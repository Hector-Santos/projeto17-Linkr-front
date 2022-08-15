import axios from "axios";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import dotenv from 'dotenv';
import { TokenContext } from "../context/TokenContext";
import defaultlink from "../assets/defaultlink.png"
dotenv.config();

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const LinkDiv = styled.div`
    
    border-radius: 11px;
    border: solid 1px #4d4d4d;
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
    
    .metadata {
        padding: 20px;
        align-self: center;
    }

    .metadata h4,
    .metadata a {
        color: #cecece;
        margin-bottom: 5px;
        text-decoration: none;
    }

    .metadata h4 {
        font-size: 15px;
        cursor: pointer;
        margin-bottom: 10px;
    }

    .metadata a,
    .metadata p {
        font-size: 13px;
    }

    .metadata p {
        color: #9B9595;
        margin-bottom: 20px;
    }

    img {
        height: 180px;
        width: 40%;
        border-radius: 0 10px 10px 0;
        cursor: pointer;
        object-fit: cover;
    }

    @media only screen and (max-width: 640px) {

        .metadata {
            padding: 6px;
            align-self: center;
        }
    
        .metadata h4,
        .metadata a {
            margin-bottom: 5px;
        }
    
        .metadata h4 {
            font-size: 12px;
            margin-bottom: 10px;
        }
    
        .metadata a,
        .metadata p {
            font-size: 10px;
        }
    
        .metadata p {
            margin-bottom: 15px;
        }
    
        img {
            height: 100%;
            width: 30%;
            border-radius: 0 10px 10px 0;
            cursor: pointer;
            object-fit: cover;
        }

    }

`;

export default function PostLink({ linkUrl, postId }){

    const [metadata, setMetadata] = useState({});
    const {header} = useContext(TokenContext);

    useEffect(()=>{

        (async ()=>{

            try {
                
                const { data } = await axios.get(`${REACT_APP_API_URL}/get-url-metadata/${postId}`, header);
                setMetadata({...data});

            } catch (err) {
                console.log(err);
                alert('Ocorreu um erro ao buscar os metadados do link da postagem.');
            }

        })();

    }, [header,metadata]);

    return(
        <LinkDiv>
            <div className="metadata">
                <h4>{metadata.title}</h4>
                <p>{metadata.description}</p>
                <a href={linkUrl} target="_blank" rel="noreferrer noopener">
                    {metadata.ogUrl ? metadata.ogUrl : linkUrl}
                </a>
            </div>
            { metadata.image? <img src={metadata.image} alt="Imagem da postagem" /> :  <img src={defaultlink} alt="defaultlink" /> }
        </LinkDiv>
    );

};
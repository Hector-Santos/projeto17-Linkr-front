import axios from "axios";
import { useEffect, useState } from "react";
import dotenv from 'dotenv';
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getPosts } from "./Posts";
import PageTitle from "./PageTitle";

dotenv.config();

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const PostsDiv = styled.div`
    width: 70%;
`;

export default function HashtagPostsList(){

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { hashtagName } = useParams();

    useEffect(()=>{

        (async ()=>{

            try {
                
                const { data } = await axios.get(`${REACT_APP_API_URL}/hashtag/${hashtagName}`);
                setPosts(data);
                setLoading(false);

            } catch (err) {
                console.log(err);
                alert('An error occured while trying to fetch the posts, please refresh the page');
            }

        })();

    }, [hashtagName]);

    return(
        <PostsDiv>
            <PageTitle text={`# ${hashtagName}`} />
            {getPosts(loading, posts)}
        </PostsDiv>
    );

};
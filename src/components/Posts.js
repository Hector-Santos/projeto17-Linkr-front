import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Post from "./Post";
import dotenv from 'dotenv';
import styled from "styled-components";
import ReactLoading from 'react-loading';
import { useParams } from "react-router-dom";
import { TokenContext } from '../context/TokenContext';

dotenv.config();

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const PostsDiv = styled.div`

    width: 100%;

    @media only screen and (max-width: 640px) {
        width: 100%;
    }
    
`;

const CenteredDiv = styled.div`
    text-align: -webkit-center;
    display: flex;
    justify-content: center;
    font-family: 'Oswald', sans-serif;
    font-size: 26px;
    margin: 30px 0;
`;

function getPosts(loading, posts){
    
    if(loading) return (
        <CenteredDiv>
            <ReactLoading type="spin" color="#fff" height="10%" width="10%" />
        </CenteredDiv>
    );

    if(posts.length === 0){

        return (
            <CenteredDiv>
                <p>There are no posts yet :(</p>
            </CenteredDiv>
        );

    } else {

        const postsList = posts.map(post => <Post authorPic={post.author.pictureUrl} authorUsename={post.author.username} postContent={post.content} link={post.link} postId={post.id} likes={post.likes} hashtags={post.hashtags} />);
        return postsList;

    }

}

export default function Posts(){

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {header} = useContext(TokenContext);
    const { id: userId } = useParams();

    useEffect(()=>{

        (async ()=>{

            try {

                if(!header) return;

                const requestUrl = (userId) ? `${REACT_APP_API_URL}/posts/${userId}` : `${REACT_APP_API_URL}/timeline`;

                console.log('requestUrl ----', requestUrl, userId);

                const { data } = await axios.get(requestUrl, header);
                setPosts(data);
                setLoading(false);

            } catch (err) {
                console.log(err);
                alert('An error occured while trying to fetch the posts, please refresh the page');
            }

        })();

    }, [header]);

    return(
        <PostsDiv>
            {getPosts(loading, posts)}
        </PostsDiv>
    );

};

export {
    getPosts
};
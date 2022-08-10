import axios from "axios";
import { useEffect, useState } from "react";
import Post from "./Post";
import dotenv from 'dotenv';
import styled from "styled-components";
import ReactLoading from 'react-loading';

dotenv.config();

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const PostsDiv = styled.div`
    width: 70%;
`;

const CenteredDiv = styled.div`
    text-align: -webkit-center;
    display: flex;
    justify-content: center;
    font-family: 'Oswald', sans-serif;   
    font-size: 26px;
`;

export default function Posts(){

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        (async ()=>{

            try {
                
                const { data } = await axios.get(`${REACT_APP_API_URL}/timeline`);
                console.log('posts ', data);
                setPosts(data);
                setLoading(false);

            } catch (err) {
                console.log(err);
                alert('An error occured while trying to fetch the posts, please refresh the page');
            }

        })();

    }, []);

    function getPosts(){

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

            const postsList = posts.map(post => <Post authorPic={post.author.pictureUrl} authorUsename={post.author.username} postContent={post.content} links={post.links} hashtags={post.hashtags} />);
            return postsList;

        }

    }

    return(
        <PostsDiv>
            {getPosts()}
        </PostsDiv>
    );

};
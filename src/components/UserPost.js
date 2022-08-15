import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Post from "./Post";
import dotenv from 'dotenv';
import styled from "styled-components";
import ReactLoading from 'react-loading';
import { useParams } from "react-router-dom";
import { TokenContext } from '../context/TokenContext';
import Header from "./Header";

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


function getPosts(loading, posts, loggedUser){

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

        const postsList = posts.map(post => <Post authorPic={post.author.pictureUrl} authorId={post.author.id} authorUsename={post.author.username} postContent={post.content} link={post.link} postId={post.id} likes={post.likes} hashtags={post.hashtags} loggedUser={loggedUser} key = {post.id}/>);
        return postsList;

    }

}

export default function Posts(){

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loggedUser, setLoggedUser] = useState("");
    const {header} = useContext(TokenContext);
    const { id: userId } = useParams();

    useEffect(()=>{

        (async ()=>{

            try {

                if(!header) return;

                const requestUrl = (userId) ? `${REACT_APP_API_URL}/user/${userId}` : `${REACT_APP_API_URL}/timeline`;

                console.log('requestUrl ----', requestUrl, userId);
                
                 const { data } =  await axios.get(requestUrl, header) ;
                setPosts(data);
                setLoading(false);

            } catch (err) {
                console.log(err);
                alert('An error occured while trying to fetch the posts, please refresh the page');
            }

        })();

    }, [header]);

    useEffect(() => {
        const REACT_APP_API_URL = process.env.REACT_APP_API_URL; 
        if(!header) return;
        const getId = axios.get(`${REACT_APP_API_URL}/userId`, header);

        getId.then((response)=>{
            console.log(response.data.id);
            setLoggedUser(response.data.id);
            console.log("Logged user: " + loggedUser);
        }).catch((err)=>{
            console.error(err)
        })
    }, [header])

    return(
        <PostsDiv>
            {getPosts(loading, posts, loggedUser)}
        </PostsDiv>
    );

};

export {
    getPosts
};
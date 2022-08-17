import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Post from "./Post";
import {BiRefresh} from "react-icons/bi"
import dotenv from 'dotenv';
import styled from "styled-components";
import ReactLoading from 'react-loading';
import { useParams } from "react-router-dom";
import { TokenContext } from '../context/TokenContext';
import useInterval from 'use-interval';

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

const RefreshButton = styled.div`
display: flex;
align-items: center;
justify-content: center;

height: 61px;
width: 611px;
border-radius: 16px;
background-color: #1877F2;
margin-top: 40px;
margin-bottom: 20px;

h1{
    font-size: 16px;
    margin-right: 10px;
    font-weight: bold;
    font-family: 'Lato', sans-serif;
}

h2{
    margin-top: 5px;
    font-size: 20px;
    color: #ffffff;
}
`
const Spacer = styled.div`
height: 40px;
;
`


// function getPosts(loading, posts, loggedUser, following = null){

//     console.log('following ', following);

//     if(following !== null && following !== undefined){

//         if(following === 0){

//             return (
//                 <CenteredDiv>
//                     <p>You don't follow anyone yet. Search for new friends!</p>
//                 </CenteredDiv>
//             );

//         } else if(posts.length === 0) {

//             return (
//                 <CenteredDiv>
//                     <p>No posts found from your friends</p>
//                 </CenteredDiv>
//             );

//         }

//     }

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
    const [reload, setReload] = useState(1)
    const [newPosts, setNewPosts] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loggedUser, setLoggedUser] = useState("");
    const {header} = useContext(TokenContext);
    const { id: userId } = useParams();
    const [following, setFollowing] = useState(0);

    useEffect(()=>{

        (async ()=>{
          
            try {

                if(!header) return;

                const requestUrl = (userId) ? `${REACT_APP_API_URL}/posts/${userId}` : `${REACT_APP_API_URL}/timeline`;
                
                const { data } =  await axios.get(requestUrl, header);
                const { posts, followingCount } = data;
                setPosts(posts);
                setFollowing(followingCount);
                setLoading(false);

            } catch (err) {
                console.log(err);
                alert('An error occured while trying to fetch the posts, please refresh the page');
            }

        })();

    }, [header, userId, reload]);


    useEffect(() => {
        const REACT_APP_API_URL = process.env.REACT_APP_API_URL; 
        if(!header) return;
        const getId = axios.get(`${REACT_APP_API_URL}/userId`, header);

        getId.then((response)=>{
            setLoggedUser(response.data.id);
        }).catch((err)=>{
            console.error(err)
        })
    }, [header])

    useInterval( async () => {
        try{
        if(posts && !userId && header){
        
        const { data } =  await axios.get(`${REACT_APP_API_URL}/timeline`, header)
       
        if(data[0].id >= posts[0].id) setNewPosts(data[0].id - posts[0].id)
        }
     } catch (err) {
        console.log(err);
        alert('An error occured while trying to fetch the posts, please refresh the page');
    }
      }, 15000);
    function setreload(){
         setReload(reload +1)
         setNewPosts(0) 
    }
    return(
        <>
        {newPosts? 
       <RefreshButton onClick={()=> {setreload()}}>
        <h1>{`${newPosts} new posts, load more!`}</h1>
        <h2>{<BiRefresh/>}</h2>
       </RefreshButton> : <Spacer/>}
        
        <PostsDiv>
            {getPosts(loading, posts, loggedUser, following)}
        </PostsDiv>
        </>
    );  

};

export {
    getPosts
};

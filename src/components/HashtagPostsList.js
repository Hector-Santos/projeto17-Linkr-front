import axios from "axios";
import { useEffect, useState } from "react";
import dotenv from 'dotenv';
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getPosts } from "./Posts";
import Post from "./Post";
import { CenteredDiv } from "./Posts";
import PageTitle from "./PageTitle";
import InfiniteScroll from 'react-infinite-scroller';
import ReactLoading from 'react-loading';

dotenv.config();

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const PostsDiv = styled.div`

    width: 70%;

    @media only screen and (max-width: 640px) {
        width: 100%;
    }

`;

export default function HashtagPostsList(){

    const [posts, setPosts] = useState([]);
    const [offset , setOffset] = useState(0)
    const [postsCount , setPostsCount] = useState()
    const [loggedUser, setLoggedUser] = useState("");
    const [loading, setLoading] = useState(true);
    const [hasMore , setHasMore] = useState(true)
    const { hashtagName } = useParams();

    useEffect(()=>{

        (async ()=>{

            try {
                
                const { data } = await axios.get(`${REACT_APP_API_URL}/hashtag/${hashtagName}/0`);
                setPosts(data);
                setLoading(false);

            } catch (err) {
                console.log(err);
                alert('An error occured while trying to fetch the posts, please refresh the page');
            }

        })();

    }, [hashtagName]);
    useEffect(()=>{
        
        (async ()=>{
          
            try {
                if(!posts) return;
                const { data } =  await axios.get(`${REACT_APP_API_URL}/countpostshashtags/${hashtagName}`);
                
                setPostsCount(data)

            } catch (err) {
                console.log(err);
                alert('An error occured while trying to fetch the posts, please refresh the page');
            }

        })();

    });

    async function fetchposts(){
        try {
            
            const newOffset = offset + 10
            
            const response = await axios.get(`${REACT_APP_API_URL}/hashtag/${hashtagName}/${offset}`)
            

            if (response && response.data) {
                const newposts = [...posts, ...response.data];
                
          
                if (newposts.length >= postsCount) {
                  setHasMore(false);
                }
          
               setPosts(newposts);
          
                setOffset(newOffset);
              }
            
        } catch (err) {
            console.log(err);
            alert('An error occured while trying to fetch the posts, please refresh the page');
        }
    }


    return(
        <PostsDiv>
            <PageTitle text={`# ${hashtagName}`} />
            <PostsDiv>

{ <InfiniteScroll
pageStart={0}
loadMore={()=>fetchposts()}
hasMore={hasMore}
loader={
<CenteredDiv>
<ReactLoading type="spin" color="#fff" height="10%" width="10%" />
</CenteredDiv>
}
>
{posts.map(post => <Post authorPic={post.author.pictureUrl} authorId={post.author.id} authorUsename={post.author.username} postContent={post.content} link={post.link} postId={post.id} likes={post.likes} hashtags={post.hashtags} loggedUser={loggedUser} key = {post.id}/>)}
</InfiniteScroll> }
</PostsDiv>
            
        </PostsDiv>
    );

};
import Header from "./Header";
import styled from "styled-components";
import Posts from "./Posts";
import NewPost from "./NewPost.js";
import TrendingSidebar from "./TrendingSidebar";
import { useEffect,useContext } from "react";
import { TokenContext } from '../context/TokenContext';
import { useNavigate } from "react-router-dom";
import PageTitle from "./PageTitle";


const Wrapper = styled.section`
    
    display: flex;
    border-radius: 16px;
    color: #fff;
    width: 80%;
    margin: 0 auto;
    margin-top: 140px;
    justify-content: center;
    

    div > .title > img{
        border-radius: 50%;
        width: 48px;
        height: 48px;
        margin-right: 30px;
        
       
    }

    div > .title {
        display: flex;
        flex-direction: row;
        margin-bottom: 0px;
        height: 29px;
    }
    @media only screen and (max-width: 640px) {
        width: 95%;
    }

`;

export default function Timeline(){
    
    const {token, setToken} = useContext(TokenContext)
    const navigate = useNavigate();
    useEffect(()=>{
        ( ()=>{
           
            const localStorageToken = window.localStorage.getItem('token')
            if(localStorageToken && !token){
               setToken(localStorageToken)
            }else if(!localStorageToken && !token){
             navigate("/")
            }else if(!localStorageToken && token){
                window.localStorage.setItem('token', token)
            }else if(token && localStorageToken){
                window.localStorage.setItem('token', token)
            }
        })()});

    return (
        <>
            <Header />
            <Wrapper>
                <div>
                    <PageTitle text="timeline" />
                    <NewPost/>
                    <Posts />
                </div>
                <TrendingSidebar />
            </Wrapper>
        </>

    )
};

export {
    Wrapper
};
import Header from "./Header";
import styled from "styled-components";
import Posts from "./Posts";
import NewPost from "./NewPost.js";
import TrendingSidebar from "./TrendingSidebar";
import { useEffect,useContext } from "react";
import { TokenContext } from '../context/TokenContext';
import { useNavigate } from "react-router-dom";



const TimelineSection = styled.section`
    
    display: flex;
    border-radius: 16px;
    color: #fff;
    width: 80%;
    margin: 0 auto;
    margin-top: 140px;
    justify-content: center;

    div{
        display: flex;
        flex-direction: column;
    }

`;

export default function Timeline(){
    
    const {token, setToken} = useContext(TokenContext)
    const navigate = useNavigate();
    useEffect(()=>{
        ( ()=>{
            console.log("useeffect")
                const localStorageToken = window.localStorage.getItem('token')
                if(localStorageToken && !token){
                    console.log("1")
                   setToken(localStorageToken)
                }else if(!localStorageToken && !token){
                    console.log("2")
                 navigate("/")
                }else if(!localStorageToken && token){
                    console.log("3")
                    window.localStorage.setItem('token', token)
                }
        })()});

    return (
        <TimelineSection>
            <div>
            <NewPost/>
            <Posts />
            </div>
             <TrendingSidebar />
        </TimelineSection>
    )
};
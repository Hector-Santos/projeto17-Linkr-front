import Header from "./Header";
import Posts from "./Posts";
import TrendingSidebar from "./TrendingSidebar";
import { useEffect, useContext, useState } from "react";
import { TokenContext } from '../context/TokenContext';
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "./PageTitle";
import { Wrapper } from "./Timeline";
import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export default function UserPosts(){
    
    const {token, setToken} = useContext(TokenContext)
    const navigate = useNavigate();
    const {header} = useContext(TokenContext);

    const { id: userId } = useParams();
    const [username, setUsername] = useState('');

    useEffect(()=>{
        ( ()=>{
           
                const localStorageToken = window.localStorage.getItem('token')
                if(localStorageToken && !token){
                   setToken(localStorageToken)
                }else if(!localStorageToken && !token){
                 navigate("/")
                }else if(!localStorageToken && token){
                    window.localStorage.setItem('token', token)
                }
        })();
    }, []);

    useEffect(()=>{

        (async ()=>{

            try {
                
                const { data } = await axios.get(`${REACT_APP_API_URL}/users/${userId}`, header);
                setUsername(data.username);

            } catch (err) {
                console.log(err);
                alert('An error occured while trying to fetch the user posts, please refresh the page');
            }

        })();

    }, [header]);

    return (
        <>
            <Header />
            <Wrapper >
                <div>
                    <PageTitle text={`${username}'s posts`} />
                    <Posts />
                </div>
                <TrendingSidebar />
            </Wrapper>
        </>

    )
};
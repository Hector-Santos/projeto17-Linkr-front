import Header from "./Header";
import Posts from "./Posts";
import TrendingSidebar from "./TrendingSidebar";
import { useEffect, useContext, useState } from "react";
import { TokenContext } from '../context/TokenContext';
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "./PageTitle";
import { Wrapper } from "./Timeline";
import axios from "axios";
import defaultProfile from '../assets/defaultprofile.png'
import dotenv from 'dotenv';

dotenv.config();
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export default function UserPosts(){
    
    const {token, setToken} = useContext(TokenContext)
    const navigate = useNavigate();
    const {header} = useContext(TokenContext);

    const { id: userId } = useParams();
    const [username, setUsername] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [loggedUser, setLoggedUser] = useState(null);

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
    }, [token]);

    useEffect(() => {

        (async ()=>{

            if(!header) return;

            try {
             
                const response = await axios.get(`${REACT_APP_API_URL}/users`, header);
                setLoggedUser(response.data);

            } catch (err) {
                console.error(err);
                alert('Ocorreu um erro ao buscar suas informações.');
            }

        })();

    }, [header]);

    useEffect(()=>{

        (async ()=>{

            try {
                
                const { data } = await axios.get(`${REACT_APP_API_URL}/users/${userId}`, header);
                setUsername(data.username);
                setProfilePic(data.pictureUrl)

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
                    <div className="title">
                    {profilePic ? <img  src={profilePic} alt="Imagem de perfil do usuário que publicou" /> 
                 : <img src={defaultProfile} alt="default profile" /> }
                    <PageTitle text={`${username}'s posts`} />
                    </div>
                    <Posts />
                </div>
                <TrendingSidebar showButton={true} idFromUserPage={userId} loggedUser={loggedUser} />
            </Wrapper>
        </>

    )
};
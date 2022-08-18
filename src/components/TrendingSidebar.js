import TrendingHashtag from "./TrendingHashtag";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import dotenv from 'dotenv';
import { TokenContext } from "../context/TokenContext";
import { ThreeDots } from 'react-loader-spinner';

dotenv.config();

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const TrendingDiv = styled.div`
    margin-top: 65px;
    background-color: #171717;
    border-radius: 16px;
    padding: 20px;
    height: fit-content;
    
    h5 {
        font-family: 'Oswald', sans-serif;   
        font-size: 26px;
    }

    hr {
        
        border-color: #484848;
    }

    a {
        margin: 10px 0;
        font-weight: bold;
        font-family: 'Oswald', sans-serif;
        font-size: 18px;
        text-decoration: none;
        display: block;
        color: #fff;
    }

    @media only screen and (max-width: 640px) {
        display: none;
    }

`;

const RightSideWrapper = styled.div`

    max-width: 300px;
    margin-left: 20px;
    width: 300px;
    width: 65%;

`;

const FollowButton = styled.button`
    float: right;
    background-color: #1877F2;
    color: #fff;
    width: 112px;
    height: 31px;
    border-radius: 5px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const UnfollowButton = styled.button`
    float: right;
    background-color: #fff;
    color: #1877F2;
    width: 112px;
    height: 31px;
    border-radius: 5px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function TrendingSidebar({ showButton, idFromUserPage, loggedUser }){

    //console.log('showButton ', showButton, idFromUserPage, loggedUser);

    const [hashtags, setHashtags] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const {header} = useContext(TokenContext);

    function getHashtagsContent(){

        const validHashtags = [...hashtags].filter(hashtag => hashtag !== '');

        validHashtags.sort((a, b) => b.count - a.count);
        return validHashtags.map(hashtag => <TrendingHashtag name={hashtag.name} />)

    }

    useEffect(()=>{

        (async ()=>{

            try {
                
                const { data } = await axios.get(`${REACT_APP_API_URL}/trending-hashtags`);
                setHashtags(data);

            } catch (err) {
                console.log(err);
                alert('Ocorreu um erro ao carregar a lista de trendings.');
            }

        })();

    }, []);

    useEffect(()=>{

        (async ()=>{

            if(!idFromUserPage) return;
            if(!header) return;

            try {
                
                const { data } = await axios.get(`${REACT_APP_API_URL}/users/${idFromUserPage}/is-following`, header);
                setIsFollowing(data);

            } catch (err) {
                console.log(err);
                alert('Ocorreu um erro ao carregar a lista de trendings.');
            }


        })();

    }, [header]);

    async function followUser(){

        try {
            
            setLoadingButton(true);
            await axios.post(`${REACT_APP_API_URL}/users/${idFromUserPage}/follow`, {}, header);
            setIsFollowing(true);
            setLoadingButton(false);

        } catch (err) {
            console.log(err);
            alert('Não foi possível seguir o usuário. Tente novamente.');
        }

    }

    async function unfollowUser(){

        try {
            
            setLoadingButton(true);
            await axios.post(`${REACT_APP_API_URL}/users/${idFromUserPage}/unfollow`, {}, header);
            setIsFollowing(false);
            setLoadingButton(false);

        } catch (err) {
            console.log(err);
            alert('Não foi possível deixar de seguir o usuário. Tente novamente.');
        }

    }

    function getButton(){

        if(!showButton) return null;

        if(!idFromUserPage || !loggedUser || loadingButton) return (
            <FollowButton>
                <ThreeDots color="white" height={40} width={40} />
            </FollowButton>
        );

        if((idFromUserPage && loggedUser) && Number(idFromUserPage) === Number(loggedUser.id)) return null;

        console.log('isFollowing ', isFollowing, loadingButton);

        if(isFollowing){

            return (
                <UnfollowButton onClick={unfollowUser}>Unfollow</UnfollowButton>
            );            

        } else {

            return (
                <FollowButton onClick={followUser}>Follow</FollowButton>
            );

        }

    }

    return(
        <RightSideWrapper>
            {getButton()}
            <TrendingDiv>
                <h5><strong>Trending</strong></h5>
                <hr />
                {getHashtagsContent()}
            </TrendingDiv>
        </RightSideWrapper>
    );

};
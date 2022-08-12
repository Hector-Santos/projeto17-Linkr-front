import { useContext, useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import dotenv from 'dotenv';
import onClickOutside from "react-onclickoutside";
import styled from "styled-components";

import { TokenContext } from '../context/TokenContext';

dotenv.config();

function Logout () {
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

    const [showMenu, setShowMenu] = useState(false);
    const [profilePic, setProfilePic] = useState();
    let { header } = useContext(TokenContext);
    const navigate = useNavigate();

    useEffect(()=>{
        ( async ()=>{
           
           const user  = await axios.get(`${REACT_APP_API_URL}/users`,header) 
           setProfilePic(user.data.pictureUrl)
        })()});

    function clearUser () {
        header = "";
        localStorage.clear();
        navigate("/");
    }
    
    const toggle = () => {
        if (showMenu === false) {
            setShowMenu(true);
        } else {
            setShowMenu(false);
        }
    }

    Logout.handleClickOutside = () => setShowMenu(false);

    const IconDown = () => {
        return (
            <AiOutlineDown 
                className={`logout-icon open`}
                onClick={toggle}
            />
        )
    }
    
    const IconUp = () => {
        return (
            <AiOutlineDown 
                className={`logout-icon close`}
                onClick={toggle}
            />
        )
    }

    const Menu = () => {
        return (
            <LogoutContainer>
                <h2 onClick={clearUser}>Logout</h2>
            </LogoutContainer>
        )
    }

    return (
        <Container>
            { showMenu ? <IconDown /> : <IconUp /> }
            <img onClick={toggle} src={profilePic} alt="Imagem de perfil do usuário que publicou" /> 
            { showMenu ? <Menu /> : null }
        </Container>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => Logout.handleClickOutside,
};



const Container =styled.div`
background: #151515;
display: flex;
align-items: center;

img {
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.logout-icon{
    cursor: pointer;
    margin-right: 10px;
}

.open {
    animation: for-up 0.6s forwards;
}

.close {
    animation: for-down 0.6s forwards;
}

@keyframes for-up {
    from{
        transform: rotate(0);
    }
    to {
        transform: rotate(180deg);
    }
}

@keyframes for-down {
    from{
        transform: rotate(180deg);
    }
    to {
        transform: rotate(0);
    }
}
`

const LogoutContainer = styled.div`
    width: 150px;
    height: 47px;
    background: #171717;
    border-radius: 0px 0px 20px 20px;

    position: fixed;
    z-index: 2;
    top: 72px;
    right: -20px;

    display: flex;
    align-items: center;
    justify-content: end;

    h2 {
        cursor: pointer;
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        font-size: 17px;
        color: #FFFFFF;
        margin-right: 56px;
    }
`

export default onClickOutside(Logout, clickOutsideConfig);
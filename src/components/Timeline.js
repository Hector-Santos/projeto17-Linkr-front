import Header from "./Header";
import styled from "styled-components";
import Posts from "./Posts";
import TrendingSidebar from "./TrendingSidebar";
import { useContext } from "react";
import { TokenContext } from '../context/TokenContext';
import Login from "../pages/Login";
import PageTitle from "./PageTitle";

const Wrapper = styled.section`
    
    display: flex;
    border-radius: 16px;
    color: #fff;
    width: 80%;
    margin: 0 auto;
    margin-top: 140px;
    justify-content: center;

    @media only screen and (max-width: 640px) {
        width: 95%;
    }

`;

export default function Timeline(){

    const { token } = useContext(TokenContext);
    if(!token) return <Login />;

    return (
        <>
            <Header />
            <Wrapper>
                <Posts />
                <TrendingSidebar />
            </Wrapper>
        </>
    )
};

export {
    Wrapper
};
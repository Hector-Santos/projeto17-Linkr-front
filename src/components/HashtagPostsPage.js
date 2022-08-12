import HashtagPostsList from "./HashtagPostsList";
import Header from "./Header";
import { Wrapper } from "./Timeline";
import TrendingSidebar from "./TrendingSidebar";
import { useContext } from 'react';
import { TokenContext } from "../context/TokenContext";
import Login from "../pages/Login";

export default function HashtagPosts(){

    const { token } = useContext(TokenContext);
    if(!token) return <Login />;

    return(
        <>
            <Header />
            <Wrapper>
                <HashtagPostsList />
                <TrendingSidebar />
            </Wrapper>
        </>
    );

};
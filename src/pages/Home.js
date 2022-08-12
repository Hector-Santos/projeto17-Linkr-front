import Header from "../components/Header";
import Timeline from "../components/Timeline";
import { TokenContext } from "../context/TokenContext";
import { useContext } from 'react';
import Login from "./Login";

export default function Home(){

    const { token } = useContext(TokenContext);
    if(!token) return <Login />;

    return(
        <>
            <Header />
            <main>
                <Timeline />
            </main>
        </>
    );

};
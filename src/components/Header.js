import styled from 'styled-components';

import Logout from './Logout';
import SearchBar from './SearchBar';

const HeaderEl = styled.header`
    
    position: fixed;
    width: 100%;
    height: 72px;
    left: 0;
    top: 0;
    padding: 0 20px 0 30px;
    box-sizing: border-box;
    background-color: #151515;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    z-index: 1;

    h1 {
        font-family: 'Passion One', cursive;
        font-size: 34px;
    }
`;

export default function Header(){

    return(
        <>
            <HeaderEl>
                <h1>Linkr</h1>
                <SearchBar />
                <Logout />
            </HeaderEl>
        </>
    );

};
import styled from 'styled-components';

const HeaderEl = styled.header`
    
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    padding: 20px;
    box-sizing: border-box;
    background-color: #151515;
    display: flex;
    justify-content: space-between;
    color: #fff;

    h1 {
        font-family: 'Passion One', cursive;
        font-size: 34px;
    }

    .user-info {
        display: flex;
        align-items: center;
    }

    .user-info img {
        border-radius: 50%;
        width: 32px;
        height: 32px;
        margin-left: 10px;
    }
`;

export default function Header(){

    return(
        <>
            <HeaderEl>
                <h1>Linkr</h1>
                <div className="user-info">
                    <span>Icon</span>
                    <img src="https://lh3.googleusercontent.com/ogw/AOh-ky1uDVppF3sSrOm6f55jVSFu569TKb9eMJz4kWWY4Q=s32-c-mo" alt="Imagem de perfil do usuário logado" />
                </div>
            </HeaderEl>
        </>
    );

};
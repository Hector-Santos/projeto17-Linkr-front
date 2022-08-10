import styled from "styled-components";

const PostDiv = styled.div`
    
    display: flex;
    justify-content: flex-start;
    padding: 30px;
    box-sizing: border-box;
    background-color: #171717;
    margin-bottom: 40px;
    border-radius: 16px;

    .left-side > img {
        border-radius: 50%;
        width: 48px;
        height: 48px;
    }

    .left-side {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 30%;
        font-family: 'Lato', sans-serif;
    }

    .left-side > span {
        margin-top: 15px;
    }

    .left-side > p {
        font-size: 14px;
        margin-top: 5px;
    }

    .post-info {
        display: flex;
        flex-direction: column;
        font-family: 'Lato', sans-serif;
        margin-left: 25px;
    }

    .post-info > h3 {
        color: #fff;
        margin-bottom: 12px;
        font-size: 20px;
    }

    .post-info > p {
        color: #b7b7b7;
        margin-bottom: 22px;
        font-size: 16px;
    }

    .post-info .links {
        display: flex;
        flex-direction: column;
    }

    .post-info .links .link {
        border-radius: 11px;
        border: solid 1px #4d4d4d;
        display: flex;
        justify-content: space-around;
    }

    .post-info .links .link .metadata {
        padding: 20px;
        align-self: center;
    }

    .post-info .links .link .metadata h4,
    .post-info .links .link .metadata a {
        color: #cecece;
        margin-bottom: 5px;
        text-decoration: none;
    }

    .post-info .links .link .metadata h4 {
        font-size: 15px;
        cursor: pointer;
        margin-bottom: 10px;
    }

    .post-info .links .link .metadata a,
    .post-info .links .link .metadata p {
        font-size: 13px;
    }

    .post-info .links .link .metadata p {
        color: #9B9595;
        margin-bottom: 20px;
    }

    .post-info .links .link img {
        height: 180px;
        width: 40%;
        border-radius: 0 10px 10px 0;
        cursor: pointer;
        object-fit: cover;
    }
`;

export default function Post(){

    return(
        <PostDiv>

            <div className="left-side">
                <img src="https://lh3.googleusercontent.com/ogw/AOh-ky1uDVppF3sSrOm6f55jVSFu569TKb9eMJz4kWWY4Q=s32-c-mo" alt="Imagem de perfil do usuário que publicou" />
                <span>Icon</span>
                <p>25k Likes</p>
            </div>

            <div className="post-info">

                <h3>Usuário</h3>

                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum molestiae vero doloremque neque et aliquid? Laudantium voluptas in harum. Necessitatibus, dignissimos veritatis. Commodi dolor magnam, adipisci iure minima veniam praesentium.</p>

                <div className="links">
                    <div className="link">
                        <div className="metadata">
                            <h4>TESTE</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur eveniet inventore nulla, reiciendis provident placeat odio commodi, soluta voluptate alias, eos nemo qui? Nisi iure cum quisquam doloremque reiciendis maiores.</p>
                            <a href="#">LINK AQUI</a>
                        </div>
                        <img src="https://blog.soaresdev.com/assets/img/nodejs/nodejs-api-rest.png" alt="Imagem da postagem" />
                    </div>
                </div>

            </div>

        </PostDiv>
    );

};
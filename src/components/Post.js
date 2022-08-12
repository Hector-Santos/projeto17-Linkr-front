import styled from "styled-components";
import PostLink from "./PostLink";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import formatLikes from "../utils/formatLikes";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";

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
        font-size: 34px;
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

    @media only screen and (max-width: 640px) {

        

        padding: 10px;
        max-width: 100%;

        .left-side > img {
            width: 34px;
            height: 34px;
        }

        .left-side {
            text-align: center;
        }

        .left-side > span {
            margin-top: 15px;
            font-size: 26px;
        }

        .left-side > p {
            font-size: 11px;
            margin-top: 5px;
        }

        .post-info {
            margin-left: 6px;
        }

        .post-info > h3 {
            margin-bottom: 6px;
            font-size: 17px;
        }

        .post-info > p {
            margin-bottom: 10px;
            font-size: 12px;
        }

        .post-info .links {
            display: flex;
            flex-direction: column;
        }

    }

`;

export default function Post({ authorPic, authorUsename, postContent, link, likes, hashtags, postId }){

    const navigate = useNavigate();

    function goToHashtag(hashtagName){

        navigate(`/hashtag/${hashtagName.replace(/#/gi, "")}`);

    }

    function formatPostContent(){

        const formattedHashtags = [...hashtags].map(hashtag => `#${hashtag}`);

        return(
            <p>
                {postContent}
                <ReactTagify 
                    colors={"white"}
                    tagClicked={goToHashtag}>
                    <span>
                        {formattedHashtags.join(' ')}
                    </span>
                </ReactTagify>
            </p>
        );

    }

    return(
        <PostDiv>

            <div className="left-side">
                <img src={authorPic} alt="Imagem de perfil do usuário que publicou" />
                <span>
                    <AiOutlineHeart />
                </span>
                <p>{formatLikes(likes)} Likes</p>
            </div>

            <div className="post-info">

                <h3>{authorUsename}</h3>
                {formatPostContent()}

                <div className="links">
                    <PostLink linkUrl={link} postId={postId} />
                </div>

            </div>

        </PostDiv>
    );

};
import styled from "styled-components";

import defaultProfile from '../assets/defaultprofile.png'

export default function Comments({ commentAuthor, commentAuthorPic, content, postAuthor }) {

    console.log({ commentAuthor, commentAuthorPic, content, postAuthor })
    return(
        <CommentContainer>
            <div className="image">
                {commentAuthorPic  
                                ? <img src={commentAuthorPic} alt="Imagem de perfil do usuário que publicou" /> 
                                : <img src={defaultProfile} alt="defultProfile" /> } 
                
            </div>
            <div className="text">
                {postAuthor
                    ? <h3>{commentAuthor} <span>• post's author</span></h3>
                    : <h3>{commentAuthor}</h3>
                }
                <p>{content}</p>
            </div>
        </CommentContainer>
    )    
}

const CommentContainer = styled.div`
    border-bottom: 1px solid #353535;
    padding: 15px 25px;
    display: flex;
    align-items: center;

    img {
        border-radius: 50%;
        width: 48px;
        height: 48px;
        margin-right: 20px;
    }

    h3 {
        margin-bottom: 5px;
        font-family: 'Lato';
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #F3F3F3;
    }

    p {
        font-family: 'Lato';
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #ACACAC;
    }

    span {
        font-family: 'Lato';
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #565656;
    }
`
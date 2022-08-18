import styled from "styled-components";

import defaultProfile from '../assets/defaultprofile.png'

export default function Comments({ commentAuthor, commentAuthorPic, content, postAuthor, currentUser }) {
    
    return(
        <CommentContainer>
            <div className="image">
                {commentAuthorPic  
                                ? <img src={commentAuthorPic} alt="Imagem de perfil do usuário que publicou" /> 
                                : <img src={defaultProfile} alt="defultProfile" /> } 
                
            </div>
            <div>
                <div className="header">
                    <h3>{commentAuthor} </h3>
                    {postAuthor
                        ? <h2>• post's author</h2>
                        : ""
                    }
                </div>
                <p>{content}</p>
            </div>
        </CommentContainer>
    )    
}

const CommentContainer = styled.div`
    border-bottom: 1px solid #353535;
    padding: 15px 0;
    display: flex;
    align-items: center;

    .header {
        display: flex;
    }

    img {
        border-radius: 50%;
        width: 39px;
        height: 39px;
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

    h2 {
        font-family: 'Lato';
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #565656;
    }

    p {
        font-family: 'Lato';
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #ACACAC;
    }
`
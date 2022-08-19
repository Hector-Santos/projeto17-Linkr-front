import styled from "styled-components";
import PostLink from "./PostLink";
import { AiFillHeart, AiOutlineHeart, AiFillDelete, AiFillEdit, AiOutlineComment } from "react-icons/ai";
import { IoPaperPlaneOutline } from "react-icons/io5"
import formatLikes from "../utils/formatLikes";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import Comments from "./Comments";
import { TokenContext } from '../context/TokenContext';
import dotenv from 'dotenv';
import { RotatingLines } from "react-loader-spinner";
import ReactTooltip from "react-tooltip";
import defaultProfile from '../assets/defaultprofile.png'


dotenv.config();
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const PostDiv = styled.div`
    max-width: 610px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    
    box-sizing: border-box;
    background: #1E1E1E;
    margin: auto auto 40px;
    border-radius: 16px;

    .post-proper {
        display: flex;
        background-color: #171717;
        padding: 30px;
        border-radius: 16px;
    }

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

    .post-info > span {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 7px;
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

    .icons {
        width: 40px;
        display: flex;
        justify-content: space-between;
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

const ModalText = styled.h1`
    font-family: 'Lato';
    font-weight: 700;
    font-size: 34px;
    line-height: 41px;
    text-align: center;
    color: #FFFFFF;
`;

const ModalButtons = styled.div`
    display: flex;
    justify-content: center;
    gap: 25px;
`;

const CancelButton = styled.button`
    width: 134px;
    height: 37px;
    background: #FFFFFF;
    border-radius: 5px;
    font-family: 'Lato';
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #1877F2;
    cursor: pointer;
`;

const DeleteButton = styled.button`
    width: 134px;
    height: 37px;
    background: #1877F2;
    border-radius: 5px;
    font-family: 'Lato';
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #FFFFFF;
    cursor: pointer;
`;

const EditContainer = styled.textarea`
    width: 100%;
    height: 44px;    
    background: #FFFFFF;
    border-radius: 7px;
    margin: 10px 0;
    font-family: 'Lato';
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #4C4C4C;
    resize: vertical;
    &:focus {
        box-shadow: 0 0 0 0;
        border: 0 none;
        outline: 0;
    }
`;

const CommentContainer = styled.div`
    background: #1E1E1E;
    border-radius: 0 0 16px 16px;
    margin: 0 5px;
    padding: 0 20px;
    
    form {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin: 19px 0;

        img {
            width: 39px;
            height: 39px;
            border-radius: 50%;
            margin-right: 14px;
        }

        button {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #252525;
            border-radius: 0 8px 8px 0;
            border: none;
        }
    }

    input {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        height: 39px;
        background: #252525;
        border-radius: 8px 0 0 8px;
        border: none;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.05em;
        padding: 0 15px;
        color: #FFFFFF;
        outline: none;

        &::placeholder {
            font-style: italic;
            color: #575757;
        }
    }

`

export default function Post({ authorPic, authorId, authorUsename, postContent, link, likes, hashtags, postId, loggedUser}){

    const navigate = useNavigate();
    const [liked, setLiked] = useState(false)
    const [thisLikes, setThisLikes] = useState(likes)
    const {token,header} = useContext(TokenContext)
    const [modalOpen, setModalOpen] = useState(false);
    const [likesInfo, setLikesInfo] = useState("Ninguém curtiu este post ainda")
    const [enableEdit, setEnableEdit] = useState(false);
    const [loadDelete, setLoadDelete] = useState(false);
    const [loadEdit, setLoadEdit] = useState(false);
    const [newContent, setNewContent] = useState(postContent);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [showComments, setShowComments] = useState(false);
    const [profilePic, setProfilePic] = useState();

    const element = useRef("");

    Modal.setAppElement('*')

    const customStyles = {
        overlay: { zIndex: 3 },
        content: {
            width: '597px',
            height: '262px',
            borderRadius: '50px',
            background: '#333333',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'   
        }
    }

    useEffect(()=>{
        ( async ()=>{
           if(header){
           const user  = await axios.get(`${REACT_APP_API_URL}/users`,header) 
           setProfilePic(user.data.pictureUrl)
           }
        })()
    },[profilePic,REACT_APP_API_URL, header]);

    function refreshPage() {
        window.location.reload(false);
    }

    async function addComment() {
        if (comment === "") return;
        const data = { content: comment };

        try {
            await axios.post(`${REACT_APP_API_URL}/comments/${postId}`, data, header);
        } catch (error) {
            console.log(error);
            alert("Error: cannot add comment.");
            refreshPage();
        }
        setComment("");
        refreshPage();
    }
    
    async function deletePost(e) {
        e.preventDefault();
        setLoadDelete(true);

        try {
            await axios.delete(`${REACT_APP_API_URL}/post/${postId}`, header);
        } catch (error) {
            console.log(error)
            alert("Error: cannot delete post.")
            refreshPage();
        }
        setLoadDelete(false);
        setModalOpen(false);
        refreshPage();
    }

    async function editPost(e) {
        e.preventDefault();
        const data = { content: newContent };
        setLoadEdit(true);
        
        try{
            await axios.put(`${REACT_APP_API_URL}/post/${postId}`, data, header);
        } catch (error) {
            console.log(error);
            alert("Error: cannot edit post.");
            refreshPage();
        }
        setLoadEdit(false);
        setEnableEdit(false);
        refreshPage();
    }

    function EditButtons() {
        if (loggedUser !== authorId) {
            return (
                <></>
            )
        }

        if (loggedUser === authorId) {
            return (
                <div className="icons">
                    <AiFillEdit color='#FFFFFF' onClick={() => setEnableEdit(!enableEdit)}/>
                    <AiFillDelete color='#FFFFFF' onClick={() => setModalOpen(!modalOpen)}/>
                </div>
                
            )
        }
        
    }
    function goToHashtag(hashtagName){

        navigate(`/hashtag/${hashtagName.replace(/#/gi, "")}`);

    }

    useEffect(() => {
        ( async () => {
            if (token) {
                let promise = axios.get(`${REACT_APP_API_URL}/comments/${postId}`, header)
                promise.then((response => {
                    setComments(response.data)
                }))
                promise.catch(error => {
                    console.log(error)
                })
            }
        })()
    }, [header, postId, token])

    function getComments(comments) {
               
        const commentsList = comments.map(comment => 
            <Comments 
                commentAuthor={comment.username} 
                commentAuthorPic={comment.pictureUrl} 
                content={comment.content} 
                postAuthor={comment.postAuthor}
                isFollower={comment.isFollower}
            />);
        return commentsList;
    }

    const toggleComments = () => {
        if (showComments === false) {
            setShowComments(true);
        } else {
            setShowComments(false);
        }
    }
    
    useEffect(()=>{
        ( async ()=>{

            if(token){ 
            let promise = axios.get(`${REACT_APP_API_URL}/likedPosts/${postId}`, header)
            promise.then((response => {
                setLiked(response.data)     
            }))   
            promise.catch(error =>{
                console.log(error)
            })
        }    
        })()},[token,liked, header, postId]);

    function likePost(){

        const body = {
            postId:postId
        }
       
        if(liked){
            if(token){

                console.log(header);
                let promise = axios.delete(`${REACT_APP_API_URL}/likedPosts`,{headers:{Authorization:token},data:{"postId":postId}});

                promise.then(()=>{
                    setLiked(false);
                    setThisLikes(Number(thisLikes) - 1);
                });

                promise.catch(error =>{
                    console.log(error);
                });

                promise = axios.put(`${REACT_APP_API_URL}/posts/subtract`, body , header);
                promise.then();
                promise.catch(error =>{
                    console.log(error);
                });
            }
        } else {

            if(token){

                console.log(body);
                let promise = axios.post(`${REACT_APP_API_URL}/likedPosts`, body , header);

                promise.then(()=>{
                    setLiked(true);
                    setThisLikes(Number(thisLikes) + 1);
                });

                promise.catch(error =>{
                    console.log(error);
                });

                promise = axios.put(`${REACT_APP_API_URL}/posts/add`, body , header);

                promise.then();

                promise.catch(error =>{
                    console.log(error);
                });
            }
        }
        
    }

    function formatPostContent(){

        return(
            <>
                {enableEdit ? (
                    <EditContainer
                        ref={element}
                        type="text"
                        value={newContent}
                        onChange={e => setNewContent(e.target.value)}
                        autoFocus
                        disabled={loadEdit}
                        onKeyDown={(e) => {
                            if (e.key === "Escape") {
                                setEnableEdit(false);
                            } else if (e.key === "Enter") {
                                editPost(e);
                            }
                        }}
                    ></EditContainer>
                ) : (
                    <p>
                        <ReactTagify 
                            colors={"white"}
                            tagClicked={goToHashtag}>
                            {postContent}
                        </ReactTagify>
                    </p>
                )}
            </>
            
        );

    }

    async function updateLikesInfo(){

        if(!header) return;

        try {
            
            const { data: lastLikes } = await axios.get(`${REACT_APP_API_URL}/posts/${postId}/last-likes`, header);
            
            const validLikes = lastLikes.filter(item => item.user.username != null);
            
            if(validLikes.length === 0){

                setLikesInfo('Ninguém curtiu este post ainda');
                return;

            }

            
            const userLiked = validLikes.some(item => (item.user.id === loggedUser));
            const lastItem = validLikes.find(item => (item.user.id && item.user.id !== loggedUser));
            
            if(validLikes.length === 1){

                if(userLiked){

                    const msg = `
                        You liked this post.
                    `;
                    setLikesInfo(msg);

                } else {

                    const msg = `
                        ${validLikes[0].user.username} liked this post.
                    `;
                    setLikesInfo(msg);

                }

                ReactTooltip.rebuild();
                return;

            }
    
            if(userLiked){

                const remaining = Number(thisLikes) - 2;

                const msg = `
                    You, ${lastItem.user.username} ${remaining > 0 ? `and other ${remaining} people` : 'liked this post'}.
                `;
                setLikesInfo(msg);
                ReactTooltip.rebuild();

            } else {

                const remaining = Number(thisLikes) - 2;

                const msg = `
                    ${validLikes[0].user.username}, ${validLikes[1].user.username} ${remaining > 0 ? `and other ${remaining} people` : 'liked this post'}.
                `;

                setLikesInfo(msg);
                ReactTooltip.rebuild();

            }

        } catch (err) {
            console.log(err);
            alert('An error occured while trying to fetch the info of the posts');
        }

    }

    updateLikesInfo();


    async function redirectToUserPage(){
        navigate(`/user/${authorId}`) 
    }

    return(
        <>
            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                style={customStyles}
            >
                {loadDelete === true ? (
                    <RotatingLines strokeColor='white' width={200} />
                ) : (
                    <>
                        <ModalText>
                            Are you sure you want<br />to delete this post?
                        </ModalText>
                        <ModalButtons>
                            <CancelButton onClick={() => setModalOpen(false)}>
                                No, go back
                            </CancelButton>
                            <DeleteButton onClick={(e) => deletePost(e)}>
                                Yes, delete it
                            </DeleteButton>
                        </ModalButtons>
                    </>
                )}
            </Modal>
            <PostDiv>
                <div className="post-proper">
                    <div className="left-side">
                        {authorPic  
                            ? <img src={authorPic} alt="Imagem de perfil do usuário que publicou" /> 
                            : <img src={defaultProfile} alt="defultProfile" /> }
                        <span>
                            {
                                liked ? (
                                    <>
                                        <AiFillHeart onClick={likePost} data-tip={likesInfo}/>
                                        <ReactTooltip place="bottom" type="light" effect="float" />
                                    </>
                                ) : (
                                    <>
                                        <AiOutlineHeart onClick={likePost} data-tip={likesInfo}/>
                                        <ReactTooltip place="bottom" type="light" effect="float" />
                                    </>
                                )
                            }
                        </span>
                        <p>{formatLikes(thisLikes) } Likes</p>

                        <span>
                            <AiOutlineComment cursor="pointer"
                                onClick={() => toggleComments(postId, setComments, token)}
                            />
                        </span>
                        {comments.length === 1
                            ? <p>{comments.length} comment</p>
                            : <p>{comments.length} comments</p>
                        }
                    </div>
                    <div className="post-info">
                        <span>
                            <h3 onClick={redirectToUserPage}>{authorUsename}</h3>
                            
                            <EditButtons />
                        </span>

                        {formatPostContent()}

                        <div className="links">
                            <PostLink linkUrl={link} postId={postId} />
                        </div>

                    </div>
                </div>
                {showComments
                    ? <CommentContainer>
                        {getComments(comments, loggedUser)}
                        <form onSubmit={addComment}>
                            <img src={profilePic} />
                            <input 
                                type="text" 
                                placeholder="write a comment..." 
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button type="submit">
                                <IoPaperPlaneOutline
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        color: "#FFFFFF"
                                    }}
                                />
                            </button>
                        </form>
                    </CommentContainer>
                    : <></>
                }
            </PostDiv>
        </>

    );

};
import styled from 'styled-components'
import { useState, useEffect,useContext} from "react";
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { TokenContext } from '../context/TokenContext';
import dotenv from 'dotenv';
import defaultProfile from '../assets/defaultprofile.png'
dotenv.config();
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;


export default function NewPost(){
    const [link, setLink] = useState("");
	const [content, setContent] = useState("");
    const [disabled, setDisabled] = useState(false)
    const [profilePic, setProfilePic] = useState()
    const [botao, setBotao] = useState("Publish")
    const [colorButton, setColorButton] = useState("#1877F2");
    const [colorInput, setColorInput] = useState("black");
    const {header, token} = useContext(TokenContext)
   

    useEffect(()=>{
        ( async ()=>{
           try{
            if(header){
           const user  = await axios.get(`${REACT_APP_API_URL}/users`,header) 
           setProfilePic(user.data.pictureUrl)
                     }
           }catch(err){
            console.log(err)
           }
        })()},[header, profilePic]);

    function getHashtagsFromContent(str){
        const hashtags = str.match(/#\w+/g);
            if(hashtags){
            return hashtags.map(hashtag => hashtag.slice(1));
        }
        return [];
    }

    
    function submitPost(event) {
        event.preventDefault()
        setDisabled(true)
        setColorButton("#5fa0ef")
        setColorInput("#AFAFAF")
        setBotao(<ThreeDots color="white" height={80} width={80} />)
        let body = {
            link,
            content,
            hashtags: getHashtagsFromContent(content)
        }
        function hashtag(str){
            const hashtags = str.match(/#\w+/g);
              if(hashtags){
                return hashtags.map(hashtag => hashtag.slice(1));
              }
              return [];
          }
        let promise = axios.post(`${REACT_APP_API_URL}/posts`, body, header)
        promise.then((response => {
           
            setColorButton("#1877F2")
            setColorInput("black")
            setDisabled(false)
            setBotao("Publish")
            window.location.reload()


          }))
          promise.catch((error => {
            if(error.response.status === 422){
                alert(`Preencha todos os campos`)
                }else{
                    alert("erro")
                }
          setColorButton("#1877F2")
          setColorInput("black")
          setDisabled(false)
          setBotao("Publish")
          }
          ))
        
    }
    
    
    return (
        
        <Container disabled={disabled} colorInput= {colorInput} colorButton={colorButton}>
      {profilePic ? <img  src={profilePic} alt="Imagem de perfil do usuário que publicou" /> 
             : <img src={defaultProfile} alt="default profile" /> }
        <Form >
            <h1>What are you going to share today?</h1>
        <form onSubmit={submitPost}>
            <input  disabled ={disabled} placeholder = "http://..." type= "url" value={link} onChange={e => setLink(e.target.value)} />
            <input className='content' disabled ={disabled} placeholder = "Awesome article about #javascript" type="text"value={content} onChange={e => setContent(e.target.value)}/>
            <button disabled = {disabled} type="submit">{botao}</button>
        </form>
        </Form>
        
        </Container>
        
    )
}

export const Container = styled.div`
box-sizing: border-box;
display: flex;
font-family: 'Lato', sans-serif;
align-items: center;
justify-content: center;
font-size: 20px;
height: 209px;
width: 611px;
border-radius: 16px;
background-color: white;
position: relative;
button{
display: flex;
align-items: center;
justify-content: center;
height: 31px;
width: 112px;
position: absolute;
border-radius: 5px;
color: white;
font-weight: 600;
background-color: ${props => props.colorButton} ;
border: none;
font-family: 'Lato', sans-serif;
font-size: 14px;
position: absolute;
bottom:10px;
right: 22px;
}
img{
    height: 50px;
    width: 50px;
    border-radius: 25px;
    position: absolute;
    top: 10px;
    left: 15px;
}
input{
height: 30px;
border-radius: 5px;
margin-bottom: 10px;
width: 503px;
color : ${props => props.colorInput };
border: 1px solid #D4D4D4;
font-size: 20px;
background-color: #EFEFEF;
::placeholder{
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    font-weight: 300;
    text-align: left;
    color: #949494;
}
}
h1{
font-family: 'Lato', sans-serif;
font-size: 20px;
font-weight: 300;
color: #707070;
margin-bottom: 10px;


}
@media only screen and (max-width: 640px) {
box-sizing: border-box;
display: flex;
font-family: 'Lato', sans-serif;
align-items: center;
justify-content: center;
font-size: 20px;
height: 165px;
width: 100vw;
border-radius: 0px;
background-color: white;
position: relative;
button{
display: flex;
align-items: center;
justify-content: center;
height: 22px;
width: 112px;
position: absolute;
border-radius: 5px;
color: white;
font-weight: 600;
background-color: ${props => props.colorButton} ;
border: none;
font-family: 'Lato', sans-serif;
font-size: 14px;
position: absolute;
bottom:5px;
right: 22px;
}
img{
   display: none;
}
input{
height: 30px;
border-radius: 5px;
margin-bottom: 10px;
width: 90vw;
color : ${props => props.colorInput };
border: 1px solid #D4D4D4;
font-size: 20px;
background-color: #EFEFEF;
::placeholder{
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    font-weight: 300;
    text-align: left;
    color: #949494;
}
}
h1{
font-family: 'Lato', sans-serif;
font-size: 20px;
font-weight: 300;
color: #707070;
margin-bottom: 10px;
margin-left: 5vw;
}
}
` 
export const Form = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
margin-left: 80px;
padding-bottom: 20px;
.content{
height: 47px;
}

@media only screen and (max-width: 640px){
width: auto;
margin-left: 4vw;

}
`

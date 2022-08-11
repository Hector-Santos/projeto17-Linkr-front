import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { TokenContext } from '../context/TokenContext';
import { ThreeDots } from 'react-loader-spinner';
import dotenv from 'dotenv';
dotenv.config();



export default function Login(){
    const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
    const [disabled, setDisabled] = useState(false)
    const {setToken} = useContext(TokenContext)
    const [botao, setBotao] = useState("Log in")
    const [colorButton, setColorButton] = useState("#1877F2");
    const [colorInput, setColorInput] = useState("black");
    const navigate = useNavigate();
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
 
    function fazerLogin(event) {
        event.preventDefault()
        setDisabled(true)
        setColorButton("#5d99e2")
        setColorInput("#AFAFAF")
        setBotao(<ThreeDots color="white" height={80} width={80} />)
        let body = {
            email:email,
            password:senha
        }
        console.log(body)
<<<<<<< HEAD
       let promise = axios.post(`${REACT_APP_API_URL}/signin `, body)
=======
        let promise = axios.post(`${REACT_APP_API_URL}/signin`, body)
>>>>>>> 13b4b3b3afc6422ac8de153868c3762161e9f22d
        promise.then((response => {
            setToken(response.data)
            console.log("token", response.data)
            navigate("/timeline")  
          }))
          promise.catch((error => {
            if(error.response.status === 401){
                alert(`Usuario ou senha incorretos`)
                }else if(error.response.status === 422){
                alert(`Preencha todos os campos`)
                }else{
                    alert("erro")
                }
          setColorButton("#1877F2")
          setColorInput("black")
          setDisabled(false)
          setBotao("Log in")
          }
          ))
        
    }
    
    
    return (
        
        <Container disabled={disabled} colorInput= {colorInput} colorButton={colorButton}>
        <Logo>
        <h1>linkr</h1>
        <h2>save, share and discover</h2>
        <h2>the best links on the web</h2>
        </Logo>
        <Form >
        <form onSubmit={fazerLogin}>
            <input  disabled ={disabled} placeholder = "e-mail" type= "email" value={email} onChange={e => setEmail(e.target.value)} />
            <input disabled ={disabled} placeholder = "password" type="password"value={senha} onChange={e => setSenha(e.target.value)}/>
            <button disabled = {disabled} type="submit">{botao}</button>
        </form>
        <Link to = "/cadastro">
        <h3>Frist time? Create an account! </h3>
        </Link>
        </Form>
        
        </Container>
        
    )
}

export const Container = styled.div`
box-sizing: border-box;
display: flex;
align-items: center;
justify-content: flex-start;
font-family: 'Raleway', sans-serif;
font-size: 20px;
height: 100vh;
width: 100vw;
padding-bottom: 50px;
position: relative;
button{
display: flex;
align-items: center;
justify-content: center;
height: 45px;
width: 25vw;
margin-left: 7vw;
border-radius: 5px;
color: white;
font-weight: 600;
background-color: ${props => props.colorButton} ;
border: none;
font-family: 'Oswald', sans-serif;
font-size: 20px;
}
img{
    height: auto;
    width: 200px;
}
input{
height: 45px;
border-radius: 5px;
margin-bottom: 10px;
margin-left: 7vw;
width: 25vw;
color : ${props => props.colorInput };
border: 1px solid #D4D4D4;
font-size: 20px;
background-color: #ffffff;
::placeholder{
    font-family: 'Oswald', sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #9F9F9F;
}
}

h1{
    font-family: 'Passion One', cursive;
    font-size: 105px;
    color: #ffffff;
   
}
h2{
    font-family: 'Oswald', sans-serif;
    font-size: 45px;
    color: #ffffff;
    
}
h3{
    font-family: 'Lato', sans-serif;
    font-size: 17px;
    color: #ffffff;
    text-decoration: underline;
    margin-top: 20px;
    margin-left: 7vw;

    
}
@media only screen and (max-width: 640px) {
    
box-sizing: border-box;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
font-family: 'Raleway', sans-serif;
font-size: 20px;
height: 100vh;
width: 100vw;
padding-bottom: 50px;
position: relative;
button{
display: flex;
align-items: center;
justify-content: center;
height: 45px;
width: 86vw;
border-radius: 5px;
margin-left: 7vw;
color: white;
font-weight: 600;
background-color: ${props => props.colorButton} ;
border: none;
font-family: 'Oswald', sans-serif;
font-size: 20px;
}
img{
    height: auto;
    width: 200px;
}
input{
height: 45px;
border-radius: 5px;
margin-bottom: 10px;
margin-left: 7vw;
width: 85vw;
color : ${props => props.colorInput };
border: 1px solid #D4D4D4;
font-size: 20px;
background-color: #ffffff;
::placeholder{
    font-family: 'Oswald', sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #9F9F9F;
}
}

h1{
    font-family: 'Passion One', cursive;
    font-size: 75px;
    color: #ffffff;
   
}
h2{
    font-family: 'Oswald', sans-serif;
    font-size: 25px;
    color: #ffffff;
    
}
h3{
    font-family: 'Lato', sans-serif;
    font-size: 17px;
    color: #ffffff;
    text-decoration: underline;
    margin-top: 20px;
    margin-right: 5vw;
}
}
` 
export const Form = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 30vw;

@media only screen and (max-width: 640px){
width: auto;


}
`
export const Logo = styled.div`

display: flex;
flex-direction: column;
justify-content:center;
text-align: left;
align-items: flex-start;
width: 60vw;
height: 110vh;
background-color: #151515;
box-sizing: border-box;
padding: 5vw;

@media only screen and (max-width: 640px){
display: flex;
flex-direction: column;
justify-content:space-around;
align-items: center;
width: 100vw;
height: 25vh;
background-color: #151515;
position: fixed;
left: 0;
top: 0;
box-sizing: border-box;
padding: 15px;

}

;
`
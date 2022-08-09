import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { TokenContext } from '../context/TokenContext';
import { ThreeDots } from 'react-loader-spinner';
import imglogo from "../assets/imglogo.png"

export default function Login(){
    const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
    const [disabled, setDisabled] = useState(false)
    const {setToken} = useContext(TokenContext)
    const [botao, setBotao] = useState("Entrar")
    const [colorButton, setColorButton] = useState("#003f88");
    const [colorInput, setColorInput] = useState("black");
    const navigate = useNavigate();
    
   
    function fazerLogin(event) {
        event.preventDefault()
        setDisabled(true)
        setColorButton("#4a759e")
        setColorInput("#AFAFAF")
        setBotao(<ThreeDots color="white" height={80} width={80} />)
        let body = {
            email:email,
            password:senha
        }
        console.log(body)
        let promise = axios.post("https://hardstore0.herokuapp.com/sign-in", body)
        promise.then((response => {
            setToken(response.data)
            console.log("token", response.data)
            navigate("/produtos")  
          }))
          promise.catch((response => {
          alert(`Falha no login.Verifique seu usario e senha ${response}`)
          setColorButton("#003f88")
          setColorInput("black")
          setDisabled(false)
          setBotao("Login")
          }
          ))
        
    }
    
    
    return (
        
        <Container disabled={disabled} colorInput= {colorInput} colorButton={colorButton}>
        <Logo>
        <img src={imglogo} alt="logo"/>
        <h1>HardStore</h1>
        </Logo>
        <Form >
        <form onSubmit={fazerLogin}>
            <input  disabled ={disabled} placeholder = "Email" type= "email" value={email} onChange={e => setEmail(e.target.value)} />
            <input disabled ={disabled} placeholder = "Senha" type="password"value={senha} onChange={e => setSenha(e.target.value)}/>
            <button disabled = {disabled} type="submit">{botao}</button>
        </form>
        </Form>
        <Link to = "/cadastro">
        <h2>Não tem conta? Cadastre-se! </h2>
        </Link>
        </Container>
        
    )
}

export const Container = styled.div`
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
width: 85vw;
border-radius: 5px;
color: white;
font-weight: bold;
background-color: ${props => props.colorButton} ;
border: none;
font-family: 'Raleway', sans-serif;
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
width: 85vw;
color : ${props => props.colorInput };
border: 1px solid #D4D4D4;
font-size: 20px;
background-color: #ffffff;
::placeholder{
    font-family: 'Raleway', sans-serif;
    font-size: 20px;
    color: black;
}
}

h1{
    font-family: 'Secular One', sans-serif;
    font-size: 40px;
    color: #003f88;
    margin-bottom: 30px;
}
h2, h3, h4{
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    color: #003f88;
    margin-top: 30px;
    text-decoration: underline;
}
h3{
    font-size: 25px;
    margin-top: 5px;
    text-decoration: none;
}
h4{
    font-size: 20px;
    margin-bottom: 20px;
    text-decoration: none;
}
` 
export const Form = styled.div`
margin-left: 7vw;
`
export const Logo = styled.div`
display: flex;
justify-content: space-around;
align-items: flex-end;
width: 80vw;
height: 100px;
img{
    width:100px;
    height:100px;
    margin-bottom: 40px;
}
`
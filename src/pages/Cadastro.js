import styled from 'styled-components'
import { Container, Form, Logo } from './Login';
import {Link} from 'react-router-dom'
import { useState, useEffect } from "react";
import React from 'react'
import axios from 'axios';
import { useNavigate, } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import dotenv from 'dotenv';
dotenv.config();

export default function Cadastro(){
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [pictureUrl, setPictureUrl] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [botao, setBotao] = useState("Sign Up")
    const [colorButton, setColorButton] = useState("#003f88");
    const [colorInput, setColorInput] = useState("black");
    const navigate = useNavigate();
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

    useEffect(()=>{
        ( ()=>{
                if(window.localStorage.getItem('token'))
                navigate("/timeline")
        })()});

    function fazerCadastro(event) {
        event.preventDefault()
        setDisabled(true)
        setColorButton("#4a759e")
        setColorInput("#AFAFAF")
        setBotao(<ThreeDots color="white" height={80} width={80} />)
        let body = 
            {
                email: email,
                password: password,
                userName: userName,
                pictureUrl: pictureUrl

            }

        let promise = axios.post(`${REACT_APP_API_URL}/signup `, body)
        promise.then((response => {    
            console.log(response)
            navigate("/")
          }))
          promise.catch((error => {
            if(error.response.data === "Conflict"){
                alert(`Email inválido. Um usuário com este email já existe`)
                }else if(error.response.status === 422){
                alert(`Preencha todos os campos`)
                }else if(error.response.data.code === "23505"){
                alert(`UserName indisponível. Um usuário com este UserName já existe`)
                }else{
                    alert("erro")
                }

            setColorButton("#003f88")
            setColorInput("black")
            setDisabled(false)
            setBotao("Sign Up")
            }
            ))
          
        
        }
    return (
        <Container disabled={disabled} colorButton={colorButton} colorInput = {colorInput}>
        <Logo>
        <h1>linkr</h1>
        <h2>save, share and discover</h2>
        <h2>the best links on the web</h2>
        </Logo>
        <Spacer></Spacer>
        <Form>
        <form onSubmit={fazerCadastro}>
            <input disabled={disabled} placeholder = "e-mail" type= "email" value={email} onChange={e => setEmail(e.target.value)} />
            <input disabled={disabled} placeholder = "password" type="password"value={password} onChange={e => setPassword(e.target.value)}/>
            <input disabled={disabled} placeholder = "userName" type="text"value={userName} onChange={e => setUserName(e.target.value)}/>
            <input disabled={disabled} placeholder = "picture url" type="url" value={pictureUrl} onChange={e => setPictureUrl(e.target.value)}/>
            <button type="submit">{botao}</button>
        </form>
        <Link to = "/">
        <h3>Switch back to log in</h3>
        </Link>
        </Form>
        </Container>
    )
}


const Spacer = styled.div`
height: 25vh;
`
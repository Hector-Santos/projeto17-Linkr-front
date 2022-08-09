import { Container, Form, Logo } from './Login';
import {Link} from 'react-router-dom'
import { useState } from "react";
import React from 'react'
import axios from 'axios';
import { useNavigate, } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import imglogo from "../assets/imglogo.png"


export default function Cadastro(){
    const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [confimaSenha, setconfimaSenha] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [botao, setBotao] = useState("Cadastrar")
    const [colorButton, setColorButton] = useState("#003f88");
    const [colorInput, setColorInput] = useState("black");
    const navigate = useNavigate();

    function fazerCadastro(event) {
        event.preventDefault()
        if (senha !== confimaSenha){
          alert("As senhas inseridas são diferentes")
          return;
        }
        setDisabled(true)
        setColorButton("#4a759e")
        setColorInput("#AFAFAF")
        setBotao(<ThreeDots color="white" height={80} width={80} />)
        let body = 
            {
                name: nome,
                email: email,
                password: senha
            }

        let promise = axios.post(
        "https://hardstore0.herokuapp.com/sign-up"
        ,body)
        promise.then((response => {    
            console.log(response)
            navigate("/")
          }))
        
          promise.catch((response => {
            alert(`Algo de errado não está certo
  ${response}`)
            setColorButton("#003f88")
            setColorInput("black")
            setDisabled(false)
            setBotao("Login")
            }
            ))
          
        
        }
    return (
        <Container disabled={disabled} colorButton={colorButton} colorInput = {colorInput}>
        <Logo>
        <img src={imglogo} alt="logo"/>
        <h1>HardStore</h1>
        </Logo>
        <Form>
        <form onSubmit={fazerCadastro}>
            <input disabled={disabled} placeholder = "Nome" type="text"value={nome} onChange={e => setNome(e.target.value)}/>
            <input disabled={disabled} placeholder = "Email" type= "email" value={email} onChange={e => setEmail(e.target.value)} />
            <input disabled={disabled} placeholder = "Senha" type="password"value={senha} onChange={e => setSenha(e.target.value)}/>
            <input disabled={disabled} placeholder = "Confime a senha" type="password" value={confimaSenha} onChange={e => setconfimaSenha(e.target.value)}/>
            <button type="submit">{botao}</button>
        </form>
        </Form>
        <Link to = "/">
        <h2>Já tem uma conta? Faça login!</h2>
        </Link>
        </Container>
    )
}



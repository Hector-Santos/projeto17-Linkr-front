import GlobalStyle from "../styles/global";
import Carrinho from "./carrinho";
import Checkout from "./checkout";
import {Header} from '../components/Header/Header';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TokenProvider from "../context/TokenContext";
import Login from "./Login";
import Cadastro from "./Cadastro";
import Produtos from "./Produtos";
import Finalizar from "./Finalizar";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <TokenProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/carrinho" element={<><Header/><Carrinho /></>} />
          <Route path="/finalizar" element={<Finalizar />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/checkout" element={<><Header/><Checkout /></>} />
          <Route path="/produtos" element={<Produtos />} />
        </Routes>
      </TokenProvider>
    </BrowserRouter>
  );
}

export default App;

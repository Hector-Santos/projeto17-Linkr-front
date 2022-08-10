import GlobalStyle from "../styles/global.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TokenProvider from "../context/TokenContext";
import Home from "./Home.js";
import Login from "./Login.js"
import Cadastro from "./Cadastro.js";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <TokenProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </TokenProvider>
    </BrowserRouter>
  );
}

export default App;

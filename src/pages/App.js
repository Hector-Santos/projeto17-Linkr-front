import GlobalStyle from "../styles/global.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TokenProvider from "../context/TokenContext";
import Home from "./Home.js";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <TokenProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </TokenProvider>
    </BrowserRouter>
  );
}

export default App;

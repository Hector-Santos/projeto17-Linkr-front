import GlobalStyle from "../styles/global.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TokenProvider from "../context/TokenContext";
import Home from "./Home.js";
import Login from "./Login.js"
import Cadastro from "./Cadastro.js";
import Timeline from "../components/Timeline.js";
import HashtagPostsPage from "../components/HashtagPostsPage.js";
import UserPost from "../components/UserPosts.js";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <TokenProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/hashtag/:hashtagName" element={<HashtagPostsPage />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/user/:id" element={<UserPost />} />
        </Routes>
      </TokenProvider>
    </BrowserRouter>
  );
}

export default App;

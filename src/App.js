import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ArticleList from "./pages/ArticleList";
import "./styles/_base.scss";
import NewArticle from "./pages/NewArticle";
import SingleArticle from "./pages/SingleArticle";
import MyArticles from "./pages/MyArticles";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles/:id" element={<SingleArticle />} />
          <Route path="login" element={<Login />} />
          <Route path="/newarticle" element={<NewArticle />} />
          <Route path="/myarticles" element={<MyArticles />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

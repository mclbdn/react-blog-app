import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ArticleList from "./pages/ArticleList";
import "./styles/_base.scss";
import NewArticle from "./pages/NewArticle";
import SingleArticle from "./pages/SingleArticle";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles/:id" element={<SingleArticle />} />
          <Route path="login" element={<Login />} />
          <Route path="/newarticle" element={<NewArticle />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

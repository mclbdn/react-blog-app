import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ArticleList from "./pages/ArticleList";
import "./styles/_base.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

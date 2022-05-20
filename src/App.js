import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import "./styles/_base.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<MainPage />} /> */}
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

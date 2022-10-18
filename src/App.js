import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import "./App.css";

import Detail from "./page/Detail";
import Edit from "./page/Edit";
import Main from "./page/Main";

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Main />} />
          <Route path={"/:id"} element={<Detail />} />
          <Route path={"/edit"} element={<Edit />} />
          <Route path={"/edit/:id"} element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;

const Container = styled.div`
  background-color: #eee;
  width: 100%;
  max-width: 500px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 50px;
  box-sizing: border-box;
`;

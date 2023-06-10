import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cabecalho from "./componentes/Cabecalho";
import Rodape from "./componentes/Rodape";
import TemaProvider from "./contexts/TemaContext";
import Home from "./paginas/Home/index";
import SearchPage from "./paginas/Search/index";
import ChartsPage from "./paginas/Dados/ChartsPage";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    window.location.pathname === "/" && window.location.replace("/home");
  }, []);

  return (
    <>
      <TemaProvider>
        <BrowserRouter>
          <Cabecalho />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/charts" element={<ChartsPage />} />
            <Route path="/busca" element={<SearchPage />} />
          </Routes>
          <Rodape />
        </BrowserRouter>
      </TemaProvider>
    </>
  );
};

export default App;

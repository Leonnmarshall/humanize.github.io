import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TemaContext } from "../contexts/TemaContext";

const Rodape = () => {
  const { tema } = useContext(TemaContext);

  return (
    <div className={`container-fluid bg-${tema}`} data-bs-theme={tema}>
      <footer className="p-5">
        <div className="row">
          <div className="col-6 col-md-2 mb-3">
            <h5>MAPA DO SITE</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/" className="nav-link p-0 text-muted">
                  INICIO
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/busca" className="nav-link p-0 text-muted">
                  PESQUISA
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/charts" className="nav-link p-0 text-muted">
                  MÉTRICAS
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <p className="text-white">
            &copy; 2023 Plataforma Humanize, Direitos Reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Rodape;

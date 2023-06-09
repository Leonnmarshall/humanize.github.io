import React, { useState, useRef } from 'react';
import data from '../../componentes/data.json';
import '../../App.css';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas/dist/html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showBackButton, setShowBackButton] = useState(false);
  const selectedDocumentRef = useRef(null);
  const [showSearchInstructions, setShowSearchInstructions] = useState(true);
  const [showNoResults, setShowNoResults] = useState(false);

  const handleSearch = () => {
    setCurrentPage(1);
    setShowBackButton(false);
    setSelectedDocument(null);
    setShowSearchInstructions(false);

    const filtered = data.filter(
      item =>
        item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.grandeArea.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setShowNoResults(filtered.length === 0);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setShowBackButton(true);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
    if (currentPage === 2) {
      setShowBackButton(false);
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSelectDocument = document => {
    setSelectedDocument(document);
    selectedDocumentRef.current = document;
  };

  const normalizeReference = document => {
    const { titulo, autor, Periódico, ano } = document;

    const normalizedTitle = titulo.toLowerCase().trim();

    const authors = autor.split(',');
    const normalizedAuthors = authors.map(author => {
      const nameParts = author.trim().split(' ');
      const lastName = nameParts[nameParts.length - 1].toUpperCase();
      const initials = nameParts
        .slice(0, nameParts.length - 1)
        .map(part => part[0].toUpperCase())
        .join('.');
      return `${lastName}, ${initials}`;
    });
    const normalizedAuthor = normalizedAuthors.join('; ');

    const normalizedPublicationYear = `(${ano})`;

    const reference = `${normalizedAuthor}. ${normalizedTitle}. ${Periódico}. ${normalizedPublicationYear}.`;

    return reference;
  };

  const indexOfLastResult = currentPage * 10;
  const indexOfFirstResult = indexOfLastResult - 10;
  const displayedData = filteredData.slice(indexOfFirstResult, indexOfLastResult);

  const handleSaveAsPDF = () => {
    if (!selectedDocumentRef.current) return;

    const doc = new jsPDF();
    const element = selectedDocumentRef.current;

    const watermarkText = 'Plataforma Humanize, direitos reservados';
    const watermarkX = doc.internal.pageSize.getWidth() / 2;
    const watermarkY = doc.internal.pageSize.getHeight() / -10;
    const watermarkSize = 40;
    const watermarkRotation = 40;

    doc.setFontSize(watermarkSize);
    doc.setTextColor(200);
    doc.setFont('helvetica', 'italic');
    doc.text(watermarkText, watermarkX, watermarkY, {
      align: 'center',
      angle: watermarkRotation,
    });

    const handleRenderComplete = () => {
      html2canvas(element, { useCORS: true })
        .then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          doc.addImage(imgData, 'PNG', 10, 10, 190, 0);
          doc.save('artigo_plataforma_humanize.pdf');
        })
        .catch(error => {
          console.error('Erro ao renderizar o conteúdo para PDF:', error);
        });
    };

    const tempWindow = window.open('', '', 'width=600,height=800');
    tempWindow.document.body.innerHTML = element.outerHTML;

    tempWindow.document.fonts.ready.then(() => {
      setTimeout(() => {
        handleRenderComplete();
        tempWindow.close();
      }, 100);
    });
  };

  return (
    <div className="search-page">
      <h1 className="title">PLATAFORMA REFERENCIAL EM PESQUISAS DE HUMANIDADES</h1>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="search-icon" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {showSearchInstructions && (
        <div className="search-instructions">
          <p>
            Para utilizar a plataforma Humanize, basta utilizar a barra de busca para procurar por palavras-chave, autores, instituições, periódicos e outros critérios que sejam relevantes para sua pesquisa. Os resultados da busca são apresentados de forma clara e intuitiva, podendo consultar as visualizações de dados a respeito das publicações indexadas, visando facilitar a compreensão e interpretação das informações.
          </p>
        </div>
      )}
      {selectedDocument && (
        <div>
          <div className="selected-document" ref={selectedDocumentRef}>
            <div className="card-info">
              <p>
                <strong>Título:</strong> {selectedDocument.titulo}
              </p>
              <p>
                <strong>Autor:</strong> {selectedDocument.autor}
              </p>
              <p>
                <strong>Resumo:</strong> {selectedDocument.Resumo}
              </p>
              <p>
                <strong>Palavras-chave:</strong> {selectedDocument.palavraChave}
              </p>
              <p>
                <strong>Referência Bibliográfica:</strong>{' '}
                {normalizeReference(selectedDocument)}
              </p>
            </div>
          </div>
          <button className="save-pdf-button" onClick={handleSaveAsPDF}>
            Salvar como PDF
          </button>
        </div>
      )}
      {filteredData.length > 0 ? (
        <div>
          <h2 className="subtitle">Resultados:</h2>
          <p className="total-results">
            Total de arquivos recuperados: {filteredData.length}
          </p>
          <ul className="results-list">
            {displayedData.map(item => (
              <li key={item.idWos} className="result-item">
                <div className="result-card">
                  <strong className="result-title">
                    <Link to="#" onClick={() => handleSelectDocument(item)}>
                      {item.titulo}
                    </Link>
                  </strong>
                  <br />
                  <strong className="result-author">Autor: </strong>
                  {item.autor}
                </div>
              </li>
            ))}
          </ul>
          {showBackButton && (
            <button className="nav-button" onClick={handlePrevPage}>
              Voltar
            </button>
          )}
          {filteredData.length > 10 && (
            <button className="nav-button" onClick={handleNextPage}>
              Avançar
            </button>
          )}
        </div>
      ) : (
        <p className="no-results">Nenhum resultado encontrado.</p>
      )}
    </div>
  );
};

export default SearchPage;

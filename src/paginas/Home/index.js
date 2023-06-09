import React from 'react';
import '../../App.css';
import logo from '../../assets/logo.png'

const Home = () => {
    return (
        <div>
            {/* First Container */}
            <div className='img'><img src={logo} alt="um logotipo da empresa, Tomando a palavra HUMANIZE como corpo principal, a letra H é deformada para conectar P, futurista, sentido tecnológico, destacando atributos sociais" className="img-responsive img-circle margin" width="250" height="250" /></div>
            <div className="sobre">

                <p><h5>A Plataforma Humanize é uma aplicação de inovação que visa aprimorar a análise da produção científica na área de humanidades no Brasil, oferecendo uma alternativa viável para a realização de pesquisas bibliométricas nesse campo, utilizando uma base de dados referencial.</h5></p>
            </div>

            {/* Second Container */}
            <div className="uso">
                <h3 className="margin">Como utilizar?</h3>
                <p>
                    <h5>Para utilizar a plataforma Humanize, basta utilizar a barra de busca para procurar por palavras-chave, autores, instituições, periódicos e outros critérios que sejam relevantes para sua pesquisa. A plataforma permite realizar buscas simples e avançadas, além de oferecer a personalização dos resultados de busca de acordo com as suas preferências. Os resultados da busca são apresentados de forma clara e intuitiva, utilizando gráficos, tabelas e outras ferramentas para facilitar a compreensão e interpretação das informações.</h5>
                </p>
            </div>

            {/* Third Container */}
            <div className="seguranca">
                <h3 className="margin">ORIGEM E CONFIABILIDADE DA INFORMAÇÃO?</h3><br />
                <div>
                    <p>
                        <h5>Utiliza-se de dados coletados da Web of Science, que é uma das maiores bases de dados científicas do mundo. Foram coletados registros de artigos publicados entre 2007 e 2019 que tinham pelo menos um autor brasileiro. Esses registros foram processados para garantir que os dados estejam corretos e organizados em uma base de dados segura. Isso significa que você pode confiar nos dados da plataforma Humanize porque eles usaram uma fonte confiável e processaram os dados para garantir a qualidade.</h5>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;

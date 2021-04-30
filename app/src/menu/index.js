import React, { useState } from 'react';

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

import { isAuthenticated, setToken ,logout, getUser, isTokenExpired } from '../auth'

import { Role } from '../services/role';

const Menu = (props) => {

    
    const [user] = useState(getUser());

    if (user !== null){
        window.login = user.name;
    }

    // saida do sistema.
    function logoutFunction() {
        logout();
        window.location.href = '/'
    }

    var username = React.createRef();

    // token expered.
    if (isTokenExpired()) {
       logout();
    } else {
       // set new time
       setToken()
    }
    
    return (


        <>
            {isAuthenticated() ?
                    <div className="responsive">                  
                            <div>                  
                                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                                <Navbar.Brand href="/">Home</Navbar.Brand>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="mr-auto" >
                                        <Nav.Link href="/indexFavorecido" >Favorecido</Nav.Link>
                                        <Nav.Link href="/indexOrcamento">Orcamento</Nav.Link>
                                        <Nav.Link href="/indexNad">Autorização</Nav.Link>
                                        <Nav.Link href="/indexNdc">Descentralização</Nav.Link>
                                        <NavDropdown title="Planejamento" id="collasible-nav-dropdown">
                                            <NavDropdown.Item href="/indexBasePes">Base anual Pes</NavDropdown.Item>
                                            <NavDropdown.Item href="/indexDiretriz">Diretriz Pes</NavDropdown.Item>
                                            <NavDropdown.Item href="/indexObjetivo">Objetivo Pes</NavDropdown.Item>
                                            <NavDropdown.Item href="/indexMeta">Meta Pes</NavDropdown.Item>
                                            <NavDropdown.Item href="/indexAcao">Elaboração Pes</NavDropdown.Item>

                                            <NavDropdown.Item href="/indexTableCode/unidMedida/Medida">Medida</NavDropdown.Item>
                                            <NavDropdown.Item href="/indexMacroAcao">Macro Ação</NavDropdown.Item>

                                        </NavDropdown>
                                        <NavDropdown title="Cadastros" id="collasible-nav-dropdown">
                                            <NavDropdown.Item href="/indexTableCode/naturezadespesa/Natureza de Despesa" style={{ backgroundcolor: '#e3f2fd' }}>Natureza de Despesa</NavDropdown.Item>
                                            <NavDropdown.Item href="/indexTableCode/progtrabalho/Programa de Trabalho">Programa de Trabalho</NavDropdown.Item>
                                            <NavDropdown.Item href="/indexTableCode/fonterecurso/Fonte de Recurso">Fonte de Recurso</NavDropdown.Item>
                                            <NavDropdown.Item href="/indexResponsavel">Responsável Legal</NavDropdown.Item>  
                                        </NavDropdown>
                                        <NavDropdown title="Financeiro" id="collasible-nav-dropdown">
                                            <NavDropdown.Item href="/indexTableCode/categoria/Categoria">Categoria</NavDropdown.Item>
                                            <NavDropdown.Item href="/indexClassificador">Classificador</NavDropdown.Item>
                                            <NavDropdown.Item href="/indexGestor">Gestor</NavDropdown.Item>
                                            <NavDropdown.Item href="/indexTableCode/operacao/Operação">Operação</NavDropdown.Item>
                                            <NavDropdown.Item href="/indexLancamento">Lancamento</NavDropdown.Item>
                                        </NavDropdown>
                                        {user.role === Role.Admin &&
                                            <NavDropdown title="Manutenção" id="collasible-nav-dropdown">
                                                <NavDropdown.Item href="/indexTableCode/eventonad/Evento da Nad">Evento da Nad</NavDropdown.Item>
                                                <NavDropdown.Item href="/indexTableCode/eventondc/Evento da Ndc">Evento da Ndc</NavDropdown.Item>
                                                <NavDropdown.Item href="/indexTableCode/eventoorc/Evento da Orçamento">Evento do Orçamento</NavDropdown.Item>
                                                <NavDropdown.Item href="/indexTableCode/tipocredito/Tipo de Crédito">Tipo de Credito</NavDropdown.Item>
                                                <NavDropdown.Item href="/indexTableCode/grupodespesa/Grupo de Despesa">Grupo de Despesa</NavDropdown.Item>
                                                <NavDropdown.Item href="/indexTableCode/tipoempenho/Tipo de Empenho">Tipo de Empenho</NavDropdown.Item>
                                                <NavDropdown.Item href="/indexTableCode/tipolicitacao/Tipo de Licitação">Tipo de Licitação</NavDropdown.Item>
                                                <NavDropdown.Item href="/indexTableCode/tiporesponsavel/Tipo de Responsável">Tipo de Responsável</NavDropdown.Item>  
                                                <NavDropdown.Item href="/indexSecretaria">Secretaria Executora</NavDropdown.Item>  
                                                <NavDropdown.Item href="/indexSequencial">Sequencial das Tabelas</NavDropdown.Item>  
                                                <NavDropdown.Item href="/indexTableCode/unidgestora/Unidade Gestora">Unidade Gestora</NavDropdown.Item>
                                                <NavDropdown.Item href="/indexTableCode/unidorcamentaria/Unidade Orçamentária">Unidade Orçamentaria</NavDropdown.Item>  
                                                <NavDropdown.Item href="/indexUser">Usuário do Sistema</NavDropdown.Item> 
                                            </NavDropdown>
                                        }
                                    </Nav>
                                    <Nav>
                                        <input id="username" type="text" value={user.name} hidden/>
                                        <NavDropdown title={user.name} ref={username} id='username'>  
                                            <NavDropdown.Item href={"/profileUser/"+user._id}>Profile</NavDropdown.Item>
                                            <NavDropdown.Item onClick={() => { logoutFunction() }}>Sair</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>
                                </Navbar>
                        </div>
                    </div>
               :
                <></>
            }
        </>
    )
};

export default Menu;

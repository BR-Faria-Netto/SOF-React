import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import PrivateRoute from './private';
import AdminRoute from './admin';

import Home from "../views/Home";
import Menu from '../menu/index';
import Login from "../views/Login";

import IndexFavorecido from "../views/Favorecido/index.favorecido";
import CreateFavorecido from "../views/Favorecido/create.favorecido";
import EditFavorecido from "../views/Favorecido/edit.favorecido";
import CloneFavorecido from "../views/Favorecido/clone.favorecido";

import IndexResponsavel from "../views/Responsavel/index.responsavel";
import CreateResponsavel from "../views/Responsavel/create.responsavel";
import EditResponsavel from "../views/Responsavel/edit.responsavel";

import IndexGestor from "../views/Gestor/index.gestor";
import CreateGestor from "../views/Gestor/create.gestor";
import EditGestor from "../views/Gestor/edit.gestor";

import IndexClassificador from "../views/Classificador/index.classificador";
import CreateClassificador from "../views/Classificador/create.classificador";
import EditClassificador from "../views/Classificador/edit.classificador";

import IndexLancamento from "../views/Lancamento/index.lancamento";
import CreateLancamento from "../views/Lancamento/create.lancamento";
import EditLancamento from "../views/Lancamento/edit.lancamento";

import IndexBasePes from "../views/Planejamento/BasePes/index.basepes";
import CreateBasePes from "../views/Planejamento/BasePes/create.basepes";
import EditBasePes from "../views/Planejamento/BasePes/edit.basepes";

import IndexDiretriz from "../views/Planejamento/Diretriz/index.diretriz";
import CreateDiretriz from "../views/Planejamento/Diretriz/create.diretriz";
import EditDiretriz from "../views/Planejamento/Diretriz/edit.diretriz";

import IndexObjetivo from "../views/Planejamento/Objetivo/index.objetivo";
import CreateObjetivo from "../views/Planejamento/Objetivo/create.objetivo";
import EditObjetivo from "../views/Planejamento/Objetivo/edit.objetivo";

import IndexMeta from "../views/Planejamento/Meta/index";
import CreateMeta from "../views/Planejamento/Meta/create";
import EditMeta from "../views/Planejamento/Meta/edit";


import IndexOrcamento from "../views/Orcamento/index.orcamento";
import CreateOrcamento from "../views/Orcamento/create.orcamento";
import EditOrcamento from "../views/Orcamento/edit.orcamento";
import CloneOrcamento from "../views/Orcamento/clone.orcamento";

import IndexNad from "../views/Nad/index.nad";
import CreateNad from "../views/Nad/create.nad";
import EditNad from "../views/Nad/edit.nad";
import CloneNad from "../views/Nad/clone.nad";
import PrintNad from "../views/Nad/print.nad";

import IndexNdc from "../views/Ndc/index.ndc";
import CreateNdc from "../views/Ndc/create.ndc";
import EditNdc from "../views/Ndc/edit.ndc";
import CloneNdc from "../views/Ndc/clone.ndc";
import PrintNdc from "../views/Ndc/print.ndc";

import IndexTableCode from "../views/TableCode/index.tablecode";
import CreateTableCode from "../views/TableCode/create.tablecode";
import EditTableCode from "../views/TableCode/edit.tablecode";

import IndexSecretaria from "../views/Secretaria/index.secretaria";
import CreateSecretaria from "../views/Secretaria/create.secretaria";
import EditSecretaria from "../views/Secretaria/edit.secretaria";

import IndexSequencial from "../views/Sequencial/index.sequencial";
import CreateSequencial from "../views/Sequencial/create.sequencial";
import EditSequencial from "../views/Sequencial/edit.sequencial";

import IndexUser from "../views/User/index.user";
import CreateUser from "../views/User/create.user";
import EditUser from "../views/User/edit.user";
import KeyUser from "../views/User/key.user";
import ProfileUser from "../views/User/profile.user";

import Register from "../views/Register";
import ConfirmCode from "../views/ConfirmCode";
import RecoverPassword from "../views/RecoverPassword";

const routes = () => (

  <BrowserRouter>
    <Menu />
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
    <Switch>
  
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/recover-password" component={RecoverPassword} />
      <Route exact path="/confirmCode" component={ConfirmCode} />

      <PrivateRoute exact path="/home" component={Home} />
      <PrivateRoute exact path="/indexFavorecido" component={IndexFavorecido} />
      <PrivateRoute exact path="/createFavorecido" component={CreateFavorecido} />
      <PrivateRoute exact path="/editFavorecido/:id" component={EditFavorecido} />
      <PrivateRoute exact path="/cloneFavorecido/:id" component={CloneFavorecido} />

      <PrivateRoute exact path="/indexResponsavel" component={IndexResponsavel} />
      <PrivateRoute exact path="/createResponsavel" component={CreateResponsavel} />
      <PrivateRoute exact path="/editResponsavel/:id" component={EditResponsavel} />

      <PrivateRoute exact path="/indexGestor" component={IndexGestor} />
      <PrivateRoute exact path="/createGestor" component={CreateGestor} />
      <PrivateRoute exact path="/editGestor/:id" component={EditGestor} />

      <PrivateRoute exact path="/indexClassificador" component={IndexClassificador} />
      <PrivateRoute exact path="/createClassificador" component={CreateClassificador} />
      <PrivateRoute exact path="/editClassificador/:id" component={EditClassificador} />

      <PrivateRoute exact path="/indexLancamento" component={IndexLancamento} />
      <PrivateRoute exact path="/createLancamento" component={CreateLancamento} />
      <PrivateRoute exact path="/editLancamento/:id" component={EditLancamento} />

      <PrivateRoute exact path="/indexBasePes" component={IndexBasePes} />
      <PrivateRoute exact path="/createBasePes" component={CreateBasePes} />
      <PrivateRoute exact path="/editBasePes/:id" component={EditBasePes} /> 

      <PrivateRoute exact path="/indexDiretriz" component={IndexDiretriz} />
      <PrivateRoute exact path="/createDiretriz" component={CreateDiretriz} />
      <PrivateRoute exact path="/editDiretriz/:id" component={EditDiretriz} /> 

      <PrivateRoute exact path="/indexObjetivo" component={IndexObjetivo} />
      <PrivateRoute exact path="/createObjetivo" component={CreateObjetivo} />
      <PrivateRoute exact path="/editObjetivo/:id" component={EditObjetivo} /> 

      <PrivateRoute exact path="/indexMeta" component={IndexMeta} />
      <PrivateRoute exact path="/createMeta" component={CreateMeta} />
      <PrivateRoute exact path="/editMeta/:id" component={EditMeta} />

      <PrivateRoute exact path="/indexOrcamento" component={IndexOrcamento} />
      <PrivateRoute exact path="/createOrcamento" component={CreateOrcamento} />
      <PrivateRoute exact path="/editOrcamento/:id" component={EditOrcamento} />
      <PrivateRoute exact path="/cloneOrcamento/:id" component={CloneOrcamento} />  

      <PrivateRoute exact path="/indexNad" component={IndexNad} />
      <PrivateRoute exact path="/createNad" component={CreateNad} />
      <PrivateRoute exact path="/editNad/:id" component={EditNad} />  
      <PrivateRoute exact path="/cloneNad/:id" component={CloneNad} />  
      <PrivateRoute exact path="/printNad/:data" component={PrintNad} />  
      
      <PrivateRoute exact path="/indexNdc" component={IndexNdc} />
      <PrivateRoute exact path="/createNdc" component={CreateNdc} />
      <PrivateRoute exact path="/editNdc/:id" component={EditNdc} />  
      <PrivateRoute exact path="/cloneNdc/:id" component={CloneNdc} />  
      <PrivateRoute exact path="/printNdc/:id" component={PrintNdc} /> 

      <AdminRoute exact path='/indexTableCode/:dbTable/:pgTitle' component={ IndexTableCode } />
      <AdminRoute exact path='/createTableCode/:dbTable/:pgTitle' component={ CreateTableCode } />
      <AdminRoute exact path='/editTableCode/:dbTable/:id/:pgTitle' component={ EditTableCode } /> 

      <PrivateRoute exact path="/indexSecretaria" component={IndexSecretaria} />
      <PrivateRoute exact path="/createSecretaria" component={CreateSecretaria} />
      <PrivateRoute exact path="/editSecretaria/:id" component={EditSecretaria} />

      <PrivateRoute exact path="/indexSequencial" component={IndexSequencial} />
      <PrivateRoute exact path="/createSequencial" component={CreateSequencial} />
      <PrivateRoute exact path="/editSequencial/:id" component={EditSequencial} />

      <PrivateRoute exact path="/profileUser/:id" component={ProfileUser} />
      <AdminRoute exact path="/indexUser" component={IndexUser} />
      <AdminRoute exact path="/createUser" component={CreateUser} />
      <AdminRoute exact path="/editUser/:id" component={EditUser} />
      <AdminRoute exact path="/keyUser/:id" component={KeyUser} />
      

    </Switch>
  </BrowserRouter>
);

export default routes;

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import PrivateRoute from './private';
import AdminRoute from './admin';

import Home from "../views/Home";
import Menu from '../menu/index';
import Login from "../views/Login";

import IndexFavorecido from "../views/Favorecido";
import CreateFavorecido from "../views/Favorecido/create";
import EditFavorecido from "../views/Favorecido/edit";
import CloneFavorecido from "../views/Favorecido/clone";

import IndexResponsavel from "../views/Responsavel";
import CreateResponsavel from "../views/Responsavel/create";
import EditResponsavel from "../views/Responsavel/edit";

import IndexGestor from "../views/Gestor";
import CreateGestor from "../views/Gestor/create";
import EditGestor from "../views/Gestor/edit";

import IndexClassificador from "../views/Classificador";
import CreateClassificador from "../views/Classificador/create";
import EditClassificador from "../views/Classificador/edit";

import IndexLancamento from "../views/Lancamento";
import CreateLancamento from "../views/Lancamento/create";
import EditLancamento from "../views/Lancamento/edit";

import IndexBasePes from "../views/Planejamento/BasePes";
import CreateBasePes from "../views/Planejamento/BasePes/create";
import EditBasePes from "../views/Planejamento/BasePes/edit";

import IndexDiretriz from "../views/Planejamento/Diretriz";
import CreateDiretriz from "../views/Planejamento/Diretriz/create";
import EditDiretriz from "../views/Planejamento/Diretriz/edit";

import IndexObjetivo from "../views/Planejamento/Objetivo";
import CreateObjetivo from "../views/Planejamento/Objetivo/create";
import EditObjetivo from "../views/Planejamento/Objetivo/edit";

import IndexMeta from "../views/Planejamento/Meta/index";
import CreateMeta from "../views/Planejamento/Meta/create";
import EditMeta from "../views/Planejamento/Meta/edit";

import IndexAcao from "../views/Planejamento/Acao/index";
import CreateAcao from "../views/Planejamento/Acao/create";
import EditAcao from "../views/Planejamento/Acao/edit";

import IndexMacroAcao from "../views/Planejamento/MacroAcao/index";
import CreateMacroAcao from "../views/Planejamento/MacroAcao/create";
import EditMacroAcao from "../views/Planejamento/MacroAcao/edit";

import IndexOrcamento from "../views/Orcamento/index";
import CreateOrcamento from "../views/Orcamento/create";
import EditOrcamento from "../views/Orcamento/edit";
import CloneOrcamento from "../views/Orcamento/clone";

import IndexNad from "../views/Nad";
import CreateNad from "../views/Nad/create";
import EditNad from "../views/Nad/edit";
import CloneNad from "../views/Nad/clone";
import PrintNad from "../views/Nad/print";

import IndexNdc from "../views/Ndc";
import CreateNdc from "../views/Ndc/create";
import EditNdc from "../views/Ndc/edit";
import CloneNdc from "../views/Ndc/clone";
import PrintNdc from "../views/Ndc/print";

import IndexTableCode from "../views/TableCode";
import CreateTableCode from "../views/TableCode/create";
import EditTableCode from "../views/TableCode/edit";

import IndexSecretaria from "../views/Secretaria";
import CreateSecretaria from "../views/Secretaria/create";
import EditSecretaria from "../views/Secretaria/edit";

import IndexSequencial from "../views/Sequencial";
import CreateSequencial from "../views/Sequencial/create";
import EditSequencial from "../views/Sequencial/edit";

import IndexUser from "../views/User";
import CreateUser from "../views/User/create";
import EditUser from "../views/User/edit";
import KeyUser from "../views/User/key";
import ProfileUser from "../views/User/profile";

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

      <PrivateRoute exact path="/indexAcao" component={IndexAcao} />
      <PrivateRoute exact path="/createAcao" component={CreateAcao} />
      <PrivateRoute exact path="/editAcao/:id" component={EditAcao} />


      <PrivateRoute exact path="/indexMacroAcao" component={IndexMacroAcao} />
      <PrivateRoute exact path="/createMacroAcao" component={CreateMacroAcao} />
      <PrivateRoute exact path="/editMacroAcao/:id" component={EditMacroAcao} />

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

      <PrivateRoute exact path='/indexTableCode/:dbTable/:pgTitle' component={ IndexTableCode } />
      <PrivateRoute exact path='/createTableCode/:dbTable/:pgTitle' component={ CreateTableCode } />
      <PrivateRoute exact path='/editTableCode/:dbTable/:id/:pgTitle' component={ EditTableCode } /> 

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

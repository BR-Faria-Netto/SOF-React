import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import api from "../../../services/api"
import { Role } from '../../../services/role';
import { getUser } from '../../../auth';

import moment from "moment";

let anoInicio = '2020';
let anoFim = '2021';

let ano1 = anoInicio;
let ano2 = parseInt(anoInicio) + 1;
let ano3 = parseInt(anoInicio) + 2;
let ano4 = anoFim;

export default class Index extends Component {

isShow = (getUser().role !== Role.Admin);


constructor(props) {
      super(props);
      this.state = {registros:[],
        err: null,
        isLoading: true
      }
      this.getDataAll();
}

 componentDidMount() {
    this.getDataAll();
 }

 getDataAll() {
   api.get('/meta').then(res => 
       this.setState({
          registros: res,
          isLoading: false
       })
    )
    .catch(err => 
      this.setState({
        err,
        isLoading: false
    }));
   
}

deleteRow = (row) => {
  confirmAlert({
    title: 'Confirma excluir? ',
    buttons: [
      {
        label: 'Sim',
        onClick: () => {
          api.get('/objetivo/delete/'+row._id).then( res => 
            toast.warning("Registro foi excluido com successo")
          )
          .catch(err => {
            toast.error("Ocorrou erro ao excluir o registro");
          })
          this.getDataAll();
        }
      },
      {
        label: 'Não',
      }
    ]
  })
}

getColection(row){

   var texto = '';
   for (let [linha] of row.entries()) {
     if (linha._id === row._id) {
       texto = texto+row[linha].descricao;
     }
   }
   return texto
}

render() {

      let { err, isLoading} = this.state;
      if (err) {
         return (
            <div className="container alert alert-danger" style={{ marginTop: 20, marginBotton: 20, width:'100%', height: '100%', maxWidth: '100%', minheight: '100%'}}> Tivemos problemas no servidor de Dados...</div>
         )
      }
      if(isLoading) {
        return (
          <div className="container alert alert-success" style={{ marginTop: 20, marginBotton: 20, width:'100%', height: '100%', maxWidth: '100%', minheight: '100%'}}> Aguarde carregando os dados...</div>
        )
      }
      const columns = [
        {
          dataField: 'basePes',
          text: 'Base do Pes',
          sort: true
        },
        {
          dataField: 'diretriz',
          text: 'Diretriz',
          sort: true
        },
        {
          dataField: 'objetivo',
          text: 'Objetivo',
          sort: true
        },
        {
          dataField: 'numero',
          text: 'Ordem',
          sort: true
        },
        {
          dataField: 'descricao',
          text: 'Meta'
        },
        {
          dataField: 'estrategias',
          text: 'Estrategias',
          formatter: (row) => (
            <ul>
              {row.map((estrategias,index) =>
                  <li>{estrategias.descricao}</li>
              )}
            </ul>
          ),
        },
        {
          dataField: 'createdAt',
          text: 'Criação',
          formatter: (row) => (
            `${moment(row).format("DD/MM/YYYY") ? moment(row).format("DD/MM/YYYY HH:mm:ss") : moment(row).format("DD/MM/YYYY HH:mm:ss")}`
          ),
          hidden: this.isShow
        }
        ,
        {
          dataField: 'createdUp',
          text: 'Alteração',
          formatter: (row) => (
            `${moment(row).format("DD/MM/YYYY") ? moment(row).format("DD/MM/YYYY HH:mm:ss") : moment(row).format("DD/MM/YYYY HH:mm:ss")}`
          ),
          hidden: this.isShow
        },
        {
          dataField: 'login',
          text: 'Usuário',
          hidden: this.isShow
        },
        {
          text: 
            <div className="form-row">
                <div className="col-sm-3">
                  Ação
                </div> 
                <div className="col-sm-3">
                  <Link to={'/createMeta'} className="btn btn-sm btn-outline-success"><Icon.PlusSquareFill/></Link>
                </div> 
            </div>
          ,
          formatter: (cellContent, row) => (
            <div className="form-row">
                <div className="col-sm-3">
                <Link to={"/editMeta/"+row._id} className="btn btn-sm btn-outline-primary"><Icon.PencilSquare/></Link>
                </div> 
                <div className="col-sm-3">
                    <Link to={`#`} className="btn btn-sm btn-outline-danger" onClick={() => { this.deleteRow(row)} }><Icon.TrashFill/></Link>
                </div> 
            </div>
          ),
          style:{
             width: '9%'
          }

        }
      ];

      const options = {
        paginationSize: 3,
        pageStartIndex: 1,
        sizePerPageList: [
             {
               text: '8', value: 8
             },
             {
               text: '16', value: 16
             },
             {
               text: '32', value: 32
             },
             {
               text: '64', value: 64
             }
         ] 
   
     };
   
      const MySearch = (props) => {
        let input;
        const handleClick = () => {
          props.onSearch(input.value);
        };
        return (
          <div>
              <br></br>
              <div className="form-row" style={{ marginLeft:'195px'}}>
                   <label>Pesquisar:</label>  
                    <div className="col-sm-4">
                        <input className="form-control form-control-sm"  ref={ n => input = n } type="text" />
                    </div>
                   <div className="col-sm-2">
                      <button onClick={ handleClick }  className="btn btn-sm btn-outline-warning"><Icon.Search/></button>
                   </div>

               </div>
          </div>
        );
      };

      const columnsSub = [
        {
          dataField: 'numero',
          text: 'Ordem',
        },
        {
          dataField: 'descricao',
          text: 'Meta',
        },
        {
          text:
            <div className="form-row">
              <div className="col-sm-3">
                Ação
                  </div>
              <div className="col-sm-3">
                <button type="button" onClick={() => this.AddRow()} className="btn btn-sm btn-outline-success"><Icon.PlusSquareFill /></button>
              </div>
            </div>
          ,
          formatter: (cellContent, row) => (
            <div className="form-row">
                <div className="col-sm-3">
                <Link to={"/editMeta/"+row._id} className="btn btn-sm btn-outline-primary"><Icon.PencilSquare/></Link>
                </div> 
                <div className="col-sm-3">
                    <Link to={`#`} className="btn btn-sm btn-outline-danger" onClick={() => { this.deleteRow(row)} }><Icon.TrashFill/></Link>
                </div> 
            </div>
          ),
          style: {
            width: '2%'
          }
        }
      ];

      const expandRow = {

        renderer: row => (
          //this.getColection(row.estrategias)
          < div className = "form-row" >
              <div className="col-sm-8" style={{ marginLeft: '7px', marginRight: '7px', marginTop: '10px' }}>
                <BootstrapTable
                  keyField='_id'
                  data={this.state.registros}
                  columns={columnsSub}
                  hover
                />
              </div>
          </div >
        ),
        showExpandColumn: true
      };

      return (

        <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
             <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
                  <h5>Relação de Metas</h5>  
             </div>
             <div style={{ marginLeft:'5px', marginRight:'5px', marginTop:'15px' }}>
                <ToastContainer />
                <ToolkitProvider 
                    keyField='_id'
                     data={this.state.registros}
                    columns={columns}
                    search
                  >
                    {
                      props => (
                        <div>
                            <MySearch { ...props.searchProps } />
                            <br></br>
                            <div>
                                <BootstrapTable
                                  { ...props.baseProps }
                                    bootstrap4
                                    keyField="_id"
                                    pagination={ paginationFactory(options) }
                                    wrapperClasses="table-responsive"
                                    headerClasses="header-class"
                                    //hover
                                    condensed
                                    bordered={ true }
                                    expandRow={expandRow}
                                />
                            </div>
                        </div>
                      )
                    }
                  </ToolkitProvider>
             </div>
        </div>
      );
    }
  }
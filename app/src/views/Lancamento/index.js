import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as Icon from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import api from "../../services/api"

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

export default class Index extends Component {

constructor(props) {
      super(props);
  this.state = { lancamentos: [],
      err: null,
      isLoading: true
    }
    this.getDataAll();
}

 componentDidMount() {
    this.getDataAll();
 }

 getDataAll() {
    api.get('/lancamento').then(res => 
       this.setState({
          lancamentos: res,
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
          api.get('/lancamento/delete/'+row._id).then( res => 
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


render() {
      let { err, isLoading} = this.state;
      if (err) {
         return (
            <div className="container alert alert-danger" style={{ marginTop: 20, marginBotton: 20, width:'100%', height: '100%', maxWidth: '100%', minheight: '100%'}}> Tivemos problemas no servidor de Dados... </div>
         )
      }
      if(isLoading) {
        return (
          <div className="container alert alert-success" style={{ marginTop: 20, marginBotton: 20, width:'100%', height: '100%', maxWidth: '100%', minheight: '100%'}}> Aguarde carregando os dados...</div>
        )
      }
      const columns = [
        {
          dataField: 'classificador',
          text: 'Classificador'
        },
        {
          dataField: 'categoria',
          text: 'Categoria'
        },
        {
          dataField: 'operacao',
          text: 'Operação'
        },
        {
          dataField: 'descricao',
          text: 'Descriçao'
        },
        {
          dataField: 'documento',
          text: 'Documento'
        },
        {
          dataField: 'valor',
          text: 'Valor',
          headerAlign: 'right',
          attrs: { align: 'right' }
        },
        {
          dataField: 'data',
          text: 'Data Vencimento'
        },
        {
          dataField: 'favorecido',
          text: 'Favorecido'
        },
        {
          dataField: 'periodicidade',
          text: 'Periodicidade'
        },
        {
          dataField: 'repeticao',
          text: 'Repetição'
        },
        {
          dataField: 'gestor',
          text: 'Gestor'
        },
        {
          dataField: 'status',
          text: 'Situação'
        },
        {
          text: 
            <div className="form-row">
                <div className="col-sm-3">
                  Ação
                </div> 
                <div className="col-sm-3">
                <Link to={'/createLancamento'} className="btn btn-sm btn-outline-success"><Icon.PlusSquareFill/></Link>
                </div> 
            </div>
          ,
          formatter: (cellContent, row) => (
            <div className="form-row">
                <div className="col-sm-3">
                <Link to={"/editLancamento/"+row._id} className="btn btn-sm btn-outline-primary"><Icon.PencilSquare/></Link>
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

      return (

        <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
             <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
                  <h5>Relação de Lançamento</h5>  
             </div>
             <div style={{ marginLeft:'5px', marginRight:'5px', marginTop:'15px' }}>
                <ToastContainer />
                <ToolkitProvider 
                    keyField='_id'
                    data={this.state.lancamentos }
                    columns={ columns }
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
                                    hover
                                    condensed
                                    bordered={ true }
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
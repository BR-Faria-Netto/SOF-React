import React, { useState, useEffect, useMemo, Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

import * as Icon from 'react-bootstrap-icons';

import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import urlapi from "../../services/urlapi"
import PrintSecretaria from './print.secretaria'

import Logo from '../../images/index';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

export default class Index extends Component {
    render() {
        return (<div><SecretariaList/></div>);
    }
}

export const SecretariaList = () => {

    const [rowData, setRowData] = useState([]);
    const [dataPrint,setDataPrint] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [isErr, setIsErr] = useState(false); 
    const [isRefresh, setIsRefresh] = useState(true);

    const [pageNumber, setPageNumber] = useState(1);
    
    useEffect(() => {
      getDataAll();
    }, []);

    const getDataAll = () => {
        const fetSecretaria = async () => {
          try {
              const response = await axios.get(urlapi+'secretaria', {timeout: 5000});
              setRowData(response.data);
              setIsLoading(false);
          } catch (e) {
              setIsErr(true);
              setIsLoading(false);
          }
        };
        fetSecretaria();
    }
  
    const [rowSelect, setrowSelect] = useState([]);
        
    const selectRow = useMemo(
      () => ({
        mode: "checkbox",
        clickToSelect: false,
        classes: "selection-row",
        bgColor: '#00BFFF',
        onSelect: (row, isSelect, rowIndex, e) => {
          setrowSelect((rowData) =>
            isSelect
              ? [...rowData, row]
              : rowData.filter(
                  ({ nomesec, cnpj  }) => row.nomesec !== nomesec && row.cnpj !== cnpj
                )
          );
        },
        onSelectAll: (isSelect, rows, e) => {
          if (isSelect === true) {
            setrowSelect(rows);
          } else setrowSelect([]);
        }
      }),
      []
    );
 
    const Printer = () => {
  
      if (rowSelect.length < 1) return;
  
      setIsVisible(!isVisible);
      setDataPrint(rowSelect);

      setrowSelect([]);
  
    };

    const deleteRow = (row) => {
      confirmAlert({
        title: 'Confirma excluir? ',
        buttons: [
          {
            label: 'Sim',
            onClick: () => {
                  axios.get(urlapi+'secretaria/delete/'+row._id)
                  .then(
                    toast.warning("Registro foi excluido com successo")
                  )
                  .catch(error => {
                    toast.error("Ocorrou erro ao excluir o registro");
                  })
        
                  getDataAll();
                  setIsRefresh(true);
            }
          },
          {
            label: 'Não',
          }
        ]
      })
    }

    const setPage = (page) => {

      setPageNumber(page);
      //localStorage.setItem("pageNumber", page);

    }

  
    const columns = [
      {
        dataField: 'nomesec',
        text: 'Secretaria',
        filter: textFilter()
      },
      {
        dataField: 'cnpj',
        text: 'Cnpj/Cpf',
        filter: textFilter()
  
      },
      {
        dataField: 'ender',
        text: 'Endereço',
        filter: textFilter()
  
      },
      {
        dataField: 'bai', 
        text: 'Bairro',
        filter: textFilter()
  
      },
      {
        dataField: 'cid',
        text: 'Cidade',
        filter: textFilter()
      
      },
      {
        text: 
          <div>
              <div className="form-row">
                  <div className="col-sm-3">
                    Ação
                  </div> 
              </div>
              <div className="form-row">
                  <div className="col-sm-3">
                    <Link to={'/createSecretaria'} className="btn btn-sm btn-outline-success"><Icon.PlusSquareFill/></Link>
                  </div> 
                  <div className="col-sm-3">
                      {rowData.length > 0 && (<button onClick={ Printer } className="btn btn-sm btn-outline-secondary"><Icon.Printer/></button>)} 
                  </div> 
              </div>
          </div>
        ,
        formatter: (cellContent, row, isSelected, currentDisplayAndSelectedData) => (
          <div className="form-row">
              <div className="col-sm-3">
                  <Link to={"/editSecretaria/"+row._id} className="btn btn-sm btn-outline-primary"><Icon.PencilSquare/></Link>
              </div> 
              <div className="col-sm-3">
                  <Link to={`#`} className="btn btn-sm btn-outline-danger" onClick={() => { deleteRow(row)}}><Icon.TrashFill/></Link>
              </div> 
          </div>
        ),
        style:{
          width: '9%'
        }
  
      }
    ];

    const options = {
       onPageChange: (page) => {
         setPage(page);
       },
       page: pageNumber,
       paginationSize: 3,
       pageStartIndex: 1,
       sizePerPage: 8,
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

    if (isErr) {
        return (
            <div className="container alert alert-danger" style={{ marginTop: 20, marginBotton: 20, width:'100%', height: '100%', maxWidth: '100%', minheight: '100%'}}> Tivemos problemas no servidor de Dados... </div>
       )
    }

    if (isLoading) {
        return (
            <div className="container alert alert-success" style={{ marginTop: 20, marginBotton: 20, width:'100%', height: '100%', maxWidth: '100%', minheight: '100%'}}> Aguarde carregando os dados... </div>
        )
    }

    if (isRefresh) {
       getDataAll();
       setIsRefresh(false);
    }

    return (


      <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
      
          {!isVisible ? 
              <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
                  <h5>Relação de Secretarias</h5>  
              </div> : null
          }

          {isVisible ?
                <div>
                  <Logo />
                  <hr></hr>
                  <div className="form-row">
                      <div className="col-sm-2">
                        <label>Secretaria</label>  
                      </div>
                      <div className="col-sm-3">
                        <label>Endereço</label>  
                      </div>
                      <div className="col-sm-1">
                        <label>Bairro</label>  
                      </div>
                      <div className="col-sm-1">
                        <label>Cidade</label>  
                      </div>
                      <div className="col-sm-1">
                        <label>Cep</label>  
                      </div>
                      <div className="col-sm-1">
                        <label>Estado</label>  
                      </div>
                  </div>
                  <hr></hr>
                </div>
           : null }

           {isVisible ? dataPrint.map(item => <PrintSecretaria data={item}/>)  : 
              <ToolkitProvider 
                  keyField='_id'
                  data={rowData}
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
                                  data={rowData}
                                  columns={columns}
                                  selectRow={selectRow}
                                  pagination={ paginationFactory(options) }
                                  filter={ filterFactory() }
                                  wrapperClasses="table-responsive"
                                  headerClasses="header-class"
                                  hover
                                  bordered={ true }
                              />
                        </div>
                      </div>
                    )
                  }
                </ToolkitProvider>
              }
          <ToastContainer />
          {isVisible ?
                <div>
                  <br></br>
                  <br></br>
                </div>
          : null }
      </div>
    );

  }
import React, { useState, useEffect, useMemo, Component } from "react";
import { Link } from 'react-router-dom';

import * as Icon from 'react-bootstrap-icons';

import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from "../../services/api"
import PrintNad from './print.nad'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import moment from "moment";

export default class Index extends Component {
    render() {
        return (<div><NadList /> </div>);
    }
}

const NadList = () => {

    const [rowData, setRowData] = useState([]);
    const [dataPrint,setDataPrint] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [isErr, setIsErr] = useState(false); 
    const [isRefresh, setIsRefresh] = useState(true);

    const [dataIni, setDataIni] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [diferenca, setDiferenca] = useState('');

    useEffect(() => {
       getDataAll(1);
    }, []);

    function timeDiff(d1, d2) {
      var d1 = new Date(d1).getTime();
      var d2 = d2 || new Date().getTime();
      var df = Math.abs(d1 - d2);
      var td = {
        d: Math.round(df / (24 * 60 * 60 * 1000)), //dias
        h: Math.round(df / (60 * 60 * 1000)), //horas
        m: Math.abs(Math.round(df / (60 * 1000)) - (60 * 1000)), //minutos
        s: Math.abs(Math.round(df / 1000) - 1000)
      };
      var result = '';
      td.d > 0 ? result += td.d + ' dias ' : '';
      td.h > 0 ? result += ('0' + td.h).slice(-2) + ':' : '00:';
      td.m > 0 ? result += ('0' + td.m).slice(-2) + ':' : '00:';
      td.s > 0 ? result += ('0' + td.s).slice(-2) : '00';
      return result;
    }

    const getDataAll = (page) => {
      setIsRefresh(true);
      api.get('nad/'+page)
          .then(res => {
            setRowData(res);
            setIsLoading(false);
          })
          .catch(err => {
            setIsErr(true);
            setIsLoading(false);
      })
    };
  
    const [rowSelect, setrowSelect] = useState([]);
  
    const selectRow = useMemo(
      () => ({
        text: "Selecione",
        mode: "checkbox",
        clickToSelect: false,
        classes: "selection-row",
        bgColor: '#00BFFF',
        onSelect: (row, isSelect, rowIndex, e) => {
          setrowSelect((rowData) =>
            isSelect
              ? [...rowData, row]
              : rowData.filter(
                  ({ _id  }) => row._id !== _id 
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

                  api.get('nad/delete/'+row._id)
                  .then(
                    toast.warning("Registro foi excluido com successo")
                  )
                  .catch(error => {
                    toast.error("Ocorrou erro ao excluir o registro");
                  })
                  getDataAll(1);
                  setIsRefresh(true);
            }
          },
          {
            label: 'Não',
          }
        ]
      })
      
    }

  
    const columns = [
      {
        dataField: 'numnad',
        text: 'Número',
        filter: textFilter(),
      }, 
      {
        dataField: 'procnad',
        text: 'Processo',
        filter: textFilter(),
      },
      {
        dataField: 'datanad',
        text: 'Data',
        filter: textFilter(),
      },
      {
        dataField: 'nomefav',
        text: 'Favorecido',
        filter: textFilter(),
      },
      {
        dataField: 'valor',
        text: 'Valor',
        filter: textFilter(),
        headerAlign: 'right',
        attrs: { align: 'right' }
      },
      {
        dataField: 'evenad',
        text: 'Evento',
        filter: textFilter(),
      },
      {
        dataField: 'unigest', 
        text: 'Unidade',
        filter: textFilter(),
      },
      {
        dataField: 'progtrab',
        text: 'Programa',
        filter: textFilter(),
      },
      {
        dataField: 'natdesp',
        text: 'Natureza',
        filter: textFilter(),
      },
      {
        dataField: 'fontrec',
        text: 'Fonte',
        filter: textFilter(false),
  
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
                          <Link to={'/createNad'} className="btn btn-sm btn-outline-success"><Icon.PlusSquareFill/></Link>
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
                  <Link to={"/editNad/"+row._id} className="btn btn-sm btn-outline-primary"><Icon.PencilSquare/></Link>
              </div> 
              <div className="col-sm-3">
                  <Link to={"/cloneNad/"+row._id} className="btn btn-sm btn-outline-warning"><Icon.CloudPlus/></Link>
              </div> 
              <div className="col-sm-3">
                  <Link to={`#`} className="btn btn-sm btn-outline-danger" onClick={() => { deleteRow(row)}}><Icon.TrashFill/></Link>
              </div> 
          </div>
        ),
        style:{
          width: '6%'
        }
  
      }
    ];
  
    const sizePerPageRenderer = ({
      options,
      currSizePerPage,
      onSizePerPageChange
    }) => {
      return (
        options.map(option => (
          <button
            key={option.text}
            type="button"
            onClick={() => onSizePerPageChange(option.page)}
            className={`btn ${currSizePerPage === `${option.page}` ? 'btn btn-sm btn-secondary' : 'btn btn-sm btn-warning'}`}
          >
            {option.text}
          </button>
        ))
      )
    };

    const pageButtonRenderer = ({
      page,
      active,
      onPageChange
    }) => {
      const pageClick = (page) => {

        getDataAll(page);
        onPageChange(page);

      };
      let styleClass = '';
      if (active) {
        styleClass = 'btn btn-sm btn-secondary';
      }
      else {
        styleClass = 'btn btn-sm btn-warning';
      }
      if (typeof page === 'string') {
        styleClass = 'btn btn-sm btn-warning';
      }
      return (
        <button
          key={page}
          type='button'
          className={styleClass}
          style={{ float: 'right' }}
          onClick={() => pageClick(page)}
        >
          {page}
        </button>
      );
    };

    const options = ({
      pageButtonRenderer,
      sizePerPageRenderer,
      page: 1,
      sizePerPageList: [
        {
          text: '10', value: 10
        },
        {
          text: '20', value: 20
        },
        {
          text: '40', value: 40
        },
        {
          text: '80', value: 80
        }
      ]
    });

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
 
    const tableRowEvents = {
        onClick: (e, row, rowIndex) => {
          console.log(`clicked on row with index: ${rowIndex}`);
        },
        onMouseEnter: (e, row, rowIndex) => {
          console.log(`enter on row with index: ${rowIndex}`);
        }
    }

    if (isErr) {
        return (
            <div className="container alert alert-danger" style={{ marginTop: 20, marginBotton: 20, width:'100%', height: '100%', maxWidth: '100%', minheight: '100%'}}> Tivemos problemas no servidor de Dados...  </div>
      )
    }

    if (isLoading) {
      return (
        <div className="container alert alert-success" style={{ marginTop: 20, marginBotton: 20, width: '100%', height: '100%', maxWidth: '100%', minheight: '100%' }}> Aguarde carregando os dados... </div>
      )
    }

    if (isRefresh) {
      getDataAll(1);
      setIsRefresh(false);
    }

    var styleDiv
    if(!isVisible)
        styleDiv="marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7'" 
    else
        styleDiv="marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'" 

    return (
       <div className="responsive bg-dim full-bg-size" style={{styleDiv}}>       
           {!isVisible ? 
              <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
                  <h5>Autorização de Despesa {diferenca} </h5>
              </div> : null
           }
           {isVisible ? dataPrint.map(item => <PrintNad data={item} />) : 
              <ToolkitProvider 
                  keyField='_id'
                  data={ rowData }
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
                                  data={ rowData }
                                  columns={ columns }
                                  selectRow={ selectRow }
                                  rowEvents={ tableRowEvents }
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
      </div>
    );
}
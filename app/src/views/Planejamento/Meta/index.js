import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';

import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import api from "../../../services/api"

import Print from '../Meta/print'


const Index = () => {
  const [customers, setCustomers] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [rows, setRows] = useState([]);

  const cols = [
    { field: 'numero', header: 'Ordem' },
    { field: 'objetivo', header: 'Objetivo' },
    { field: 'descricao', header: 'Descricao' },
    { field: 'status', header: 'Status' }
  ];

  const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));
  const dt = useRef(null);

  useEffect(() => {
    getDataAll();
  }, []);
  
 const getDataAll = () =>{
    api.get('/meta').then(res => {
      setCustomers(res);
      setExpandedRows(res);
      setRows(40);
    }
    )
  }

  const estrategiaBodyTemplate = (rowData) => {
    return (
         <React.Fragment>
            {rowData.estrategias.map((estrat, index) =>
              <ul>
                <li>
                  {estrat.descricao}
                </li>
              </ul>
            )}
         </React.Fragment>
    )
  }

  const indicadorBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {rowData.estrategias.map((estrat, index) =>
          <ul>
            <li>
              {estrat.indicador}
            </li>
          </ul>
        )}
      </React.Fragment>
    )
  }


  const anualBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <DataTable value={rowData.estrategias}>
          <Column field="meta1"></Column>
          <Column field="meta2"></Column>          
          <Column field="meta3"></Column>
          <Column field="meta4"></Column>

        </DataTable>
        {/* {rowData.estrategias.map((estrat, index) =>
          <div style={{width:'10px'}}>
            {estrat.meta1}
          </div>
        )} */}
      </React.Fragment>
    )
  }

  const calculateCustomerTotal = (name) => {
    let total = 0;
    if (customers) {
      for (let customer of customers) {
        if (customer.objetivo === name) {
          total++;
        }
      }
    }
    return total;
  }

  const headerTemplate = (data) => {
    return (
      <React.Fragment>
        <td colSpan="5">
          <td colSpan="1" style={{ textAlign: 'left' }}>Matriz: {data.basePes}</td>
          <td colSpan="2" style={{ textAlign: 'left' }}>Diretriz: {data.diretriz}</td>
          <td colSpan="3" style={{ textAlign: 'left' }}>Objetivo: {data.objetivo}</td>
        </td>
      </React.Fragment>
    );
  }

  const footerTemplate = (data) => {
    return (
      <React.Fragment>
        <td colSpan="6" style={{ textAlign: 'left' }}>Total Metas: {calculateCustomerTotal(data.objetivo)}</td>
      </React.Fragment>
    );
  }

  const actionTemplate = (data) => {
    
    return (
      <React.Fragment>
        <div className="form-row">
          <div className="col-sm-2">
            <Link to={"/editMeta/" + data._id} className="btn btn-sm btn-outline-primary"><Icon.PencilSquare /></Link>
          </div>
          <div className="col-sm-2">
            <Link to={`#`} className="btn btn-sm btn-outline-danger" onClick={() => { deleteRow(data) }}><Icon.TrashFill /></Link>
          </div>
        </div>
      </React.Fragment>
    );
  }

  const deleteRow = (row) => {
    confirmAlert({
      title: 'Confirma excluir? ',
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            api.get('/meta/delete/' + row._id).then(res =>
              toast.warning("Registro foi excluido com successo")
            )
              .catch(err => {
                toast.error("Ocorrou erro ao excluir o registro");
              })
            getDataAll();
          }
        },
        {
          label: 'Não',
        }
      ]
    })
  }

  const templatePaginator = {
    layout: "RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ",
    'FirstPageLink': (options) => {
      if (!options.disabled){
        return (
          <button type="button" className='btn btn-sm btn-warning' onClick={options.onClick} disabled={options.disabled}>
            <span className="p-p-3">&lt;&lt;</span>
          </button>
        )
      } else {
        return null;
      }
    },
    'PrevPageLink': (options) => {
      if (!options.disabled) {
        return (
          <button type="button" className='btn btn-sm btn-warning' onClick={options.onClick} disabled={options.disabled}>
            <span className="p-p-3">&lt;</span>
          </button>
        )
      } else {
        return null;
      }
    },
    'NextPageLink': (options) => {
      if (!options.disabled) {
        return (
          <button type="button" className='btn btn-sm btn-warning' onClick={options.onClick} disabled={options.disabled}>
            <span className="p-p-3">&gt;</span>
          </button>
        )
      } else {
        return null;
      }
    },
    'LastPageLink': (options) => {
      if (!options.disabled) {
        return (
          <button type="button" className='btn btn-sm btn-warning' onClick={options.onClick} disabled={options.disabled}>
            <span className="p-p-3">&gt;&gt;</span>
          </button>
        )
      } else {
        return null;
      }
    },
    'PageLinks': (options, currentPage) => {
       const pageClick = (e) => {
        //  if (e.target.className === 'btn btn-sm btn-warning') {
        //    e.target.className = 'btn btn-sm btn-secondary';
        //  }else {
        //    e.target.className = 'btn btn-sm btn-warning';
        //  }
         options.onClick(e);
       };

       if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
         const className = classNames(options.className, { 'p-disabled': true });
         return <span className={className} style={{ userSelect: 'none' }}>...</span>;
       }
      return (
        <button type="button" className={'btn btn-sm btn-warning'} value={options.page + 1} onClick={(e) => pageClick(e)}>
             {options.page + 1}
        </button>
      )
    },
    'RowsPerPageDropdown': (options) => {
       const dropdownOptions = [
          { label: 10, value: 10 },
          { label: 20, value: 20 },
          { label: 40, value: 40 },
          { label: 80, value: 80 }
        ];
        // const sizeClick = (e) => {
        //   options.onChange(e.target.value);
        // };
      return (
        <div style={{ left: '3px', position: 'absolute'}}>
            {/* {dropdownOptions.map((options, index) => (
              <button type="button" className={'btn btn-sm btn-warning'} options={dropdownOptions} value={options.value}  onClick={ (e) => sizeClick(e)} appendTo={document.body}>
                {options.value}
             </button>
            ))}  */}
          <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} appendTo={document.body} />
        </div>
      );
    },
  };
 
   //return (
   //  <div>
   //      <Print data={customers}/>
   //  </div>
   //)

  const exportCSV = (selectionOnly)=> {
    dt.current.exportCSV({ selectionOnly });
  }

  const exportPdf = () => {
    import('jspdf').then(jsPDF => {
      import('jspdf-autotable').then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportColumns, customers);
        doc.save('metas.pdf');
      })
    })
  }

  const exportExcel = () => {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(customers);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      saveAsExcelFile(excelBuffer, 'metas');
    });
  }

  const saveAsExcelFile = (buffer, fileName) =>{
    import('file-saver').then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  const header = (
    <div className="p-d-flex p-ai-center export-buttons">
      <Button type="button" icon="pi pi-file-o" onClick={() => exportCSV(false)} className="p-mr-2" data-pr-tooltip="CSV" />
      <Button type="button" icon="pi pi-file-excel" onClick={() => exportExcel()} className="p-button-success p-mr-2" data-pr-tooltip="XLS" />
      <Button type="button" icon="pi pi-file-pdf" onClick={() => exportPdf()} className="p-button-warning p-mr-2" data-pr-tooltip="PDF" />
    </div>
  );

  return (
    
    //<div>
    //    <Print data={customers}/>
    //</div>
    

         <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
              <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
                   <h5>Relação de Metas do Pes</h5>  
              </div>

              <div style={{ marginLeft:'5px', marginRight:'5px', marginTop:'15px' }}>

                   <ToastContainer />

                  <DataTable value={customers} ref={dt} header={header} rowGroupMode="subheader" groupField="objetivo" className="p-datatable-gridlines"
                       expandableRowGroups expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                       selectionMode="single" sortField="objetivo" sortOrder={1} rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate}
                       paginator paginatorTemplate={templatePaginator} rows={rows} rowsPerPageOptions={[10, 20, 40, 80]}> 

                        <Column field="numero" header="Ordem"></Column>
                        <Column field="descricao" header="Meta"></Column>
                        <Column header="Estrategia" body={estrategiaBodyTemplate}></Column>
                        <Column header="Indicador" body={indicadorBodyTemplate}></Column>
                        <Column header="Metas Anuais" body={anualBodyTemplate}></Column>
                        <Column body={actionTemplate} header={<label>Ação<Link to={'/createMeta'} className='btn btn-sm btn-outline-success'><Icon.PlusSquareFill /></Link></label>}></Column> 

                   </DataTable> 

                 <br></br>

             </div>
         </div>

  );
}

export default Index;

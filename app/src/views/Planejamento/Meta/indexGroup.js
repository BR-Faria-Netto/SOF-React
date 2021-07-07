import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';

import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import api from "../../../services/api"


const Index = () => {
  const [customers, setCustomers] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const toast = useRef(null);
  
  useEffect(() => {
    api.get('/meta').then(res =>
      setCustomers(res)
    )
  }, []);
 // eslint-disable-line react-hooks/exhaustive-deps
  
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
        {data.objetivo}
      </React.Fragment>
    );
  }

  const footerTemplate = (data) => {
    return (
      <React.Fragment>
        <td colSpan="5" style={{ textAlign: 'left' }}>Total Metas: {calculateCustomerTotal(data.objetivo)}</td>
      </React.Fragment>
    );
  }

  const actionTemplate = (data) => {
    
    return (
      <React.Fragment>
        <Link to={"/editMeta/" + data._id} className="btn btn-sm btn-outline-primary"><Icon.PencilSquare /></Link>
        <Link to={`#`} className="btn btn-sm btn-outline-danger" onClick={() => { this.deleteRow(data) }}><Icon.TrashFill /></Link>
      </React.Fragment>
    );
  }

  const createTemplate = (data) => {
    return (
      <React.Fragment>
        <Link to={'/createMeta'} className="btn btn-sm btn-outline-success"><Icon.PlusSquareFill /></Link>
      </React.Fragment>
    );
  }

  const template1 = {
    layout: "RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ",
    'FirstPageLink': (options) => {
      return (
        <button type="button" className='btn btn-sm btn-warning' onClick={options.onClick} disabled={options.disabled}>
          <span className="p-p-3">&lt;&lt;</span>
        </button>
      )
    },
    'PrevPageLink': (options) => {
      return (
        <button type="button" className='btn btn-sm btn-warning' onClick={options.onClick} disabled={options.disabled}>
          <span className="p-p-3">&lt;</span>
        </button>
      )
    },
    'NextPageLink': (options) => {
      return (
        <button type="button" className='btn btn-sm btn-warning' onClick={options.onClick} disabled={options.disabled}>
          <span className="p-p-3">&gt;</span>
        </button>
      )
    },
    'LastPageLink': (options) => {
      return (
        <button type="button" className='btn btn-sm btn-warning' onClick={options.onClick} disabled={options.disabled}>
          <span className="p-p-3">&gt;&gt;</span>
        </button>
      )
    },
    'PageLinks': (options) => {
      if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
        const className = classNames(options.className, { 'p-disabled': true });

        return <span className={className} style={{ userSelect: 'none' }}>...</span>;
      }

      return (
        <button type="button" className='btn btn-sm btn-warning' onClick={options.onClick}>
          {options.page + 1}
        </button>
      )
    },
    'RowsPerPageDropdown': (options) => {
      const dropdownOptions = [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 }
      ];

      return (
          <Dropdown style={{ backgroundColor:'green', addingRight: '220px;' }} className="p-button-text" value={options.value} options={dropdownOptions} onChange={options.onChange} appendTo={document.body} />
      );
    },
  };

  const template2 = {
    layout: "RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ",
    'RowsPerPageDropdown': (options) => {
      const dropdownOptions = [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 }
      ];

      return (
        <>
          <span className="p-mx-1" style={{ color: 'var(--text-color)', userSelect: 'none' }}>Items per page: </span>
          <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} appendTo={document.body} />
        </>
      );
    }
  };

  return (
    
        <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
             <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
                  <h5>Relação de Metas</h5>  
             </div>
             <div style={{ marginLeft:'5px', marginRight:'5px', marginTop:'15px' }}>
                  <Toast ref={toast}></Toast>
                  <DataTable value={customers} rowGroupMode="subheader" groupField="objetivo" className="p-datatable-gridlines" 
                      expandableRowGroups expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                      selectionMode="single" sortField="objetivo" sortOrder={1} rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate} 

                      paginator paginatorTemplate={template1} rows={5} rowsPerPageOptions={[10, 20, 50]}>

                      <Column field="numero" header="Ordem" style={{with:'2px;'}}></Column>
                      <Column field="descricao" header="Meta"></Column>
                      <Column field="status" header="Status"></Column>
                      <Column header="Estrategia" body={estrategiaBodyTemplate}></Column>
                      <Column body={actionTemplate} header={<label>Ação<Link to={'/createMeta'} className='btn btn-sm btn-outline-success'><Icon.PlusSquareFill /></Link></label>}></Column>
            
                  </DataTable>
                  <br></br>
             </div>
        </div>

  );
}

export default Index;

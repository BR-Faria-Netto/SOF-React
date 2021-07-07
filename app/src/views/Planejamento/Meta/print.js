import React, { Component } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import api from "../../../services/api"

export default class Print extends Component {
  render() {
    class Cabec extends React.Component {
      render() {
        if (cab !== this.props.data.objetivo){
          cab = this.props.data.objetivo;
          return (
            <React.Fragment>
              <div className="form-row">
                <div className="col-sm-12">
                  <label>Matriz:{this.props.data.basePes}</label>
                </div>
                <div className="col-sm-12">
                  <label>Diretriz:{this.props.data.diretriz}</label>
                </div>
                <div className="col-sm-12">
                  <label>Objetivo:{this.props.data.objetivo}</label>
                </div>
              </div>
            </React.Fragment>
          )
        }
        else if (cab === this.props.data.objetivo) {

          const it = {
            numero: this.props.data.numero ,
            descricao: this.props.data.descricao,
            estrategias: this.props.data.estrategias          
          };
          itens.push(it);
          return null;
        }

      }
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
            }
          },
          {
            label: 'Não',
          }
        ]
      })
    }


    var cab=''
    var itens=[];
    return (
      this.props.data.map(item => 
          <div>
            <Cabec data={item} cab={cab} />
            <DataTable value={itens} sortField="item.objetivo" sortOrder={1}>
                <Column field="numero" header="Ordem"></Column>
                <Column field="descricao" header="Meta"></Column>
                <Column header="Estrategia" body={estrategiaBodyTemplate}></Column>
                <Column header="Indicador" body={indicadorBodyTemplate}></Column>
                <Column body={actionTemplate} header={<label>Ação<Link to={'/createMeta'} className='btn btn-sm btn-outline-success'><Icon.PlusSquareFill /></Link></label>}></Column>
            </DataTable> 
          </div>
    ))
  }
}

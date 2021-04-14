import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from "../../services/api";

import * as Icon from 'react-bootstrap-icons';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import cellEditFactory from 'react-bootstrap-table2-editor';

var optionsStatus = [];
optionsStatus.push({ value: ('Ativo', 'Ativo'), label: ('Ativo', 'Ativo') });
optionsStatus.push({ value: ('Inativo', 'Inativo'), label: ('Inativo', 'Inativo') });

export default class Edit extends Component {

  constructor(props) {
    super(props);
    this.onChangeCodigo = this.onChangeCodigo.bind(this);
    this.onChangeDescricao = this.onChangeDescricao.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      codigo: '',
      descricao: '',
      classificadores: []

    }
  }
  componentDidMount() {
      api.get('tipolancamento/edit/'+this.props.match.params.id)
         .then(response => {
              this.setState({ 
                codigo: response.codigo,
                descricao: response.descricao,
                classificadores: response.classificadores
              });
          })
          .catch(function (error) {
              console.log(error);
          })

  }
  onChangeCodigo(e) {
    this.setState({
      codigo: e.target.value
    });
  }
  onChangeDescricao(e) {
    this.setState({
      descricao: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();
      const obj = {
        codigo: this.state.codigo,
        descricao: this.state.descricao,
        classificadores: this.state.classificadores,
        login: window.login
      };
      api.post('tipolancamento/update/'+this.props.match.params.id, obj)
      .then(res => {
        toast.success("Registro foi salvo com successo");
      })
      .catch(error => {
        toast.error("Ocorrou erro ao salvar o registro");
      })
      this.props.history.push('/indexTipoLancamento');
  }
  AddRow = () => {
    const item = {
      codigo: "",
      descricao: ""
    };
    this.setState({ classificadores: [...this.state.classificadores, item] });
  };
  RemoveRow = (row) => {
    const classificadores = this.state.classificadores;
    for (let [i, classificador] of classificadores.entries()) {
      if (classificador._id === row._id) {
        classificadores.splice(i, 1);
      }
    }
    this.setState({ classificadores })
  }

  render() {
   
    const columns = [
      {
        dataField: 'codigo',
        text: 'Item'
      },
      {
        dataField: 'descricao',
        text: 'Descrição'
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
              <Link to={`#`} className="btn btn-sm btn-outline-danger" onClick={() => { if (window.confirm('Você confirma a exclusão?')) { this.RemoveRow(row) }; }}><Icon.TrashFill /></Link>
            </div>
          </div>
        ),
        style: {
          width: '9%'
        }
      }
    ];

    return (
      <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
          <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
              <h5>Alteração do Tipo de Lançamento</h5>  
          </div>
          <div style={{ marginLeft: '5px', marginRight: '5px', marginTop: '5px', border: '1px solid #ccc' }}>
            <form onSubmit={this.onSubmit} style={{ marginLeft: '15px', marginRight: '15px', marginTop: '15px' }}>
              <div className="form-row">
                <div className="col-sm-1">
                  <label>Código:  </label>
                  <input type="text" className="form-control" value={this.state.codigo} onChange={this.onChangeCodigo} />
                </div>
              </div>
              <div className="form-row">
                <div className="col-sm-6">
                  <label>Descrição: </label>
                  <input type="text" className="form-control" value={this.state.descricao} onChange={this.onChangeDescricao} />
                </div>
              </div>
              <div className="form-row">
                <div style={{ marginLeft: '7px', marginRight: '7px', marginTop: '10px' }}>
                  <BootstrapTable
                    keyField='_id'
                    data={this.state.classificadores}
                    columns={columns}
                    cellEdit={cellEditFactory({ mode: 'dbclick', blurToSave: true })}
                    hover
                  />
                </div>
              </div>  
              <br></br>
              <div className="form-row">
                <ToastContainer />
                <div className="col-sm-1">
                  <input type="submit" value="Salvar" className="btn btn-sm btn btn-primary" />
                  &nbsp;&nbsp;
                  <Link to={'/indexTipoLancamento'} className="btn btn-sm btn-success">Cancelar</Link>
                </div>
              </div>
              <br></br>
            </form>
          </div>
      </div>
    )
  }
  
}

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import api from "../../services/api";
import urlapi from "../../services/urlapi"

import SelectInput from '../../components/SelectInput';

var optionstipogestor = [];
optionstipogestor.push({ value: '', label: 'Selecione a opção...', id: 0 });
axios.get(urlapi + 'tablecode/tipogestor').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionstipogestor.push({ value: (key, value.descricao), label: (key, value.descricao) });
  });
});

var optionsStatus = [];
optionsStatus.push({ value: ('Ativo', 'Ativo'), label: ('Ativo', 'Ativo') });
optionsStatus.push({ value: ('Inativo', 'Inativo'), label: ('Inativo', 'Inativo') });

export default class Edit extends Component {

  constructor(props) {
    super(props);
    this.onChangeTipoGestor = this.onChangeTipoGestor.bind(this);
    this.onChangeNomeGestor = this.onChangeNomeGestor.bind(this);
    this.onChangeSituacao = this.onChangeSituacao.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      tipoGestor: optionstipogestor[0].label,
      nomeGestor: '',
      situacao: optionsStatus[0].label,
    }
  }
  
  componentDidMount() {
      api.get('gestor/edit/'+this.props.match.params.id)
         .then(response => {
              this.setState({ 
                tipoGestor  : response.tipoGestor,
                nomeGestor : response.nomeGestor,
                situacao : response.situacao
              });
          })
          .catch(function (error) {
              console.log(error);
          })

    }

  onChangeTipoGestor(e) {
    this.setState({
      tipoGestor: e.value
    });
  }
  onChangeNomeGestor(e) {
    this.setState({
      nomeGestor: e.target.value
    })
  }
  onChangeSituacao(e) {
    this.setState({
      situacao: e.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      tipoGestor: this.state.tipoGestor,
      nomeGestor: this.state.nomeGestor,
      situacao: this.state.situacao
    };
  
      api.post('gestor/update/'+this.props.match.params.id, obj)
      .then(res => {
        toast.success("Registro foi salvo com successo");
      })
      .catch(error => {
        toast.error("Ocorrou erro ao salvar o registro");
      })

      this.props.history.push('/indexGestor');
  
  }

  render() {
   
    return (
      <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
          <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
              <h5>Alteração de Gestores</h5>  
          </div>
          <div style={{ marginLeft: '5px', marginRight: '5px', marginTop: '5px', border: '1px solid #ccc' }}>
            <form onSubmit={this.onSubmit} style={{ marginLeft: '15px', marginRight: '15px', marginTop: '15px' }}>
              <div className="form-row">
                <div className="col-sm-3">
                  <label>Tipo de Gestor</label>
                  <SelectInput id="tipoGestor" className="sm" options={optionstipogestor} linkValue='/createTableCode/tipogestor/Gestor' onChange={this.onChangeTipoGestor} selectedValue={this.state.tipoGestor} />
                </div>
              </div>
              <div className="form-row">
                <div className="col-sm-3">
                  <label>Nome da Gestor </label>
                  <input type="text" id="nomeGestor" className="form-control form-control-sm" value={this.state.nomeGestor} onChange={this.onChangeNomeGestor} />
                </div>
              </div>
              <div className="form-row">
                <div className="col-sm-2">
                  <label>Situação</label>
                  <SelectInput id="situacao" className="sm" options={optionsStatus} onChange={this.onChangeSituacao} selectedValue={this.state.situacao} />
                </div>
              </div>
              <br></br>
              <div className="form-row">
                <ToastContainer />
                <div className="col-sm-1">
                  <input type="submit" value="Salvar" className="btn btn-sm btn btn-primary" />
                  &nbsp;&nbsp;
                  <Link to={'/indexConta'} className="btn btn-sm btn-success">Cancelar</Link>
                </div>
              </div>
              <br></br>
            </form>
          </div>
      </div>
    )
  }
  
}


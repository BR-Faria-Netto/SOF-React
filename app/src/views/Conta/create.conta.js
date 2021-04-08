import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from "../../services/api";
import urlapi from "../../services/urlapi"

import SelectInput from '../../components/SelectInput';

var optionstipoconta = [];
optionstipoconta.push({ value:  '', label: 'Selecione a opção...', id: 0});
axios.get(urlapi+'tablecode/tipoconta').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionstipoconta.push({ value: (key, value.descricao), label: (key, value.descricao )});
  });
});

var optionsStatus = [];
optionsStatus.push({ value: ('Ativo', 'Ativo'), label: ('Ativo', 'Ativo' )});
optionsStatus.push({ value: ('Inativo', 'Inativo'), label: ('Inativo', 'Inativo' )});

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeTipoConta = this.onChangeTipoConta.bind(this);  
    this.onChangeNomeConta = this.onChangeNomeConta.bind(this);  
    this.onChangeSituacao = this.onChangeSituacao.bind(this);  
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      tipoConta  : optionstipoconta[0].label,
      nomeConta : '',
      situacao : optionsStatus[0].label,
    }
  }
  onChangeTipoConta(e) {
    this.setState({
      tipoConta: e.value
    });
  }
  onChangeNomeConta(e) {
    this.setState({
      nomeConta: e.target.value
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
      tipoConta : this.state.tipoConta,
      nomeConta : this.state.nomeConta,
      situacao : this.state.situacao
    };

    api.post('conta/add',obj)
    .then(res => {
      toast.success("Registro foi salvo com successo");
    })
    .catch(error => {
      toast.error("Ocorrou erro ao salvar o registro");
    })

    this.props.history.push('/indexConta');

  }
 
  render() {

    return (

      <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
           <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
                <h5>Inclusão de Conta</h5>  
           </div>
           <div style={{ marginLeft:'5px', marginRight:'5px', marginTop:'5px' , border: '1px solid #ccc' }}>
                <form onSubmit={this.onSubmit} style={{ marginLeft:'15px', marginRight:'15px', marginTop:'15px'}}>
                    <div className="form-row">
                         <div className="col-sm-3">
                             <label>Tipo de Conta</label>  
                             <SelectInput id="tipoConta" className="sm" options={optionstipoconta} onChange={this.onChangeTipoConta} selectedValue={this.state.tipoConta}/> 
                         </div>
                    </div>
                    <div className="form-row">
                      <div className="col-sm-3">
                        <label>Nome da Conta </label>
                        <input type="text" id="nomeConta" className="form-control form-control-sm" value={this.state.nomeConta} onChange={this.onChangeNomeConta} />
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
                            <input type="submit" value="Salvar" className="btn btn-sm btn btn-primary"/>
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

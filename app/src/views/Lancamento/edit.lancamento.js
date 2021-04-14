import React, { Component } from "react";

import axios from 'axios';
import { Link } from 'react-router-dom';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import api from "../../services/api";
import urlapi from "../../services/urlapi"

import SelectInput from '../../components/SelectInput';

import CurrencyInput from '../../components/CurrencyInput';
import InputMask from 'react-input-mask';

var optionstipolancamento = [];
var optionstipooperacao = [];
var optionscontaproprietaria = [];
var optionsStatus = [];
var optionsClassificadores = [];

optionstipolancamento.push({ value: 'Selecione a opção...', label: 'Selecione a opção...', id: 0 });
api.get('tipolancamento').then(resp => {
  Object.entries(resp).forEach(entry => {
    const [key, value] = entry;
    optionstipolancamento.push({ value: (key, value.descricao), label: (key, value.descricao), classificadores: (key, value.classificadores), id: (key, value._id) });
  });
});

optionstipooperacao.push({ value: 'Selecione a opção...', label: 'Selecione a opção...', id: 0 });
axios.get(urlapi + 'tablecode/tipooperacao').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionstipooperacao.push({ value: (key, value.descricao), label: (key, value.descricao) });
  });
});

optionscontaproprietaria.push({ value: 'Selecione a opção...', label: 'Selecione a opção...', id: 0 });
api.get('conta').then(resp => {
  Object.entries(resp).forEach(entry => {
    const [key, value] = entry;
    optionscontaproprietaria.push({ value: (key, value.nomeConta), label: (key, value.nomeConta), id: (key, value._id) });
  });
});

optionsStatus.push({ value: ('Ativo', 'Ativo'), label: ('Ativo', 'Ativo') });
optionsStatus.push({ value: ('Inativo', 'Inativo'), label: ('Inativo', 'Inativo') });

export default class Edit extends Component {

  constructor(props) {
    super(props);
    this.onChangeTipoLancamento = this.onChangeTipoLancamento.bind(this);
    this.onChangeClassificador = this.onChangeClassificador.bind(this);
    this.onChangeTipoOperacao = this.onChangeTipoOperacao.bind(this);
    this.onChangeContaProprietaria = this.onChangeContaProprietaria.bind(this);
    this.onChangeDescricao = this.onChangeDescricao.bind(this);
    this.onChangeValor = this.onChangeValor.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      tipoLancamento: '',
      classificador: '', 
      descricao: '',
      data:'',
      tipoOperacao: '',
      contaProprietaria: '',
      valor: '0,0',
      status: ''

    }
  }

  getClassificador( tipoLancamento ) {
    if (tipoLancamento) {
      optionsClassificadores = [];
      optionsClassificadores.push({ value: 'Selecione a opção...', label: 'Selecione a opção...', id: 0 });
      let object = optionstipolancamento.find(tipo => tipo.label === tipoLancamento);
      if (typeof object !== 'undefined' && typeof object.classificadores !== 'undefined' && object.classificadores.length !== 0) {
        for (let i = 0; i < object.classificadores.length; i = i + 1) {
          optionsClassificadores.push({ value: (object.classificadores[i].descricao), label: (object.classificadores[i].descricao), id: (object.classificadores[i]._id) });
        }
      }
    }
    return optionsClassificadores;
  }

  componentDidMount() {

    api.get('lancamento/edit/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          tipoLancamento: response.tipoLancamento,
          classificador: response.classificador,
          descricao: response.descricao,
          data: response.data,
          tipoOperacao: response.tipoOperacao,
          contaProprietaria: response.contaProprietaria,
          valor: response.valor,
          status: response.status
        });
      });
  }

  onChangeTipoLancamento(e) {
    this.setState({
      tipoLancamento: e.value
    });
  }
  onChangeClassificador(e) {
    this.setState({
      classificador: e.value
    });
  }
  onChangeTipoOperacao(e) {
    this.setState({
      tipoOperacao: e.value
    });
  }
  onChangeContaProprietaria(e) {
    this.setState({
      contaProprietaria: e.value
    });
  }
  onChangeDescricao(e) {
    this.setState({
      descricao: e.target.value
    })
  }
  onChangeValor(e) {
    this.setState({
      valor: e.target.value
    })
  }
  onChangeData(e) {
    this.setState({
      data: e.target.value
    })
  }
  onChangeStatus(e) {
    this.setState({
      status: e.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      tipoLancamento: this.state.tipoLancamento,
      classificador: this.state.classificador,
      descricao: this.state.descricao,
      data: this.state.data,
      tipoOperacao: this.state.tipoOperacao,
      contaProprietaria: this.state.contaProprietaria,
      valor: this.state.valor,
      status: this.state.status
    };
  
    api.post('lancamento/update/'+this.props.match.params.id, obj)
    .then(res => {
      toast.success("Registro foi salvo com successo");
    })
    .catch(error => {
      toast.error("Ocorrou erro ao salvar o registro");
    })

    this.props.history.push('/indexLancamento');
  
  }


  render() {

    optionsClassificadores = this.getClassificador(this.state.tipoLancamento);    
    
    return (
      <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
          <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
            <h5>Alteração de Lançamento </h5> 
          </div>
          <div style={{ marginLeft: '5px', marginRight: '5px', marginTop: '5px', border: '1px solid #ccc' }}>
            <form onSubmit={this.onSubmit} style={{ marginLeft: '15px', marginRight: '15px', marginTop: '15px' }}>
              <div className="form-row">
                <div className="col-sm-3">
                  <label>Lançamento</label>
                  <SelectInput id="tipoLancamento" className="sm" options={optionstipolancamento} onChange={this.onChangeTipoLancamento} selectedValue={this.state.tipoLancamento} />
                </div>
                <div className="col-sm-3">
                  <label>Classificador</label>
                  <SelectInput id="xx" className="sm" options={optionsClassificadores} onChange={this.onChangeClassificador} selectedValue={this.state.classificador} /> 
                  {/* <SelectInput id="xx" placeholder={this.state.classificador} className="sm" options={optionsClassificadores} onChange={this.onChangeClassificador} selectedValue={this.state.classificador} />  */}
                </div>
              </div>
             <div className="form-row">
                <div className="col-sm-3">
                  <label>Descrição</label>
                  <input type="text" id="descricao" className="form-control form-control-sm" value={this.state.descricao} onChange={this.onChangeDescricao} />
                </div>
                <div className="col-sm-3">
                  <label>Operação</label>
                  <SelectInput id="tipoOperacao" className="sm" options={optionstipooperacao} onChange={this.onChangeTipoOperacao} selectedValue={this.state.tipoOperacao} />
                </div>
              </div>
              <div className="form-row">
                <div className="col-sm-3" style={{ textAlign: 'right' }}>
                  <label>Valor</label>
                  <CurrencyInput placeholder="0,00" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.state.valor} onChange={this.onChangeValor} />
                </div>
                <div className="col-sm-2">
                  <label>Data Vencimento</label>
                  <InputMask mask='99/99/9999' slotChar='mm/dd/yyyy' type="text" id="data" className="form-control form-control-sm" value={this.state.data} onChange={this.onChangeData} />
                </div>
              </div>
              <div className="form-row">
                <div className="col-sm-3">
                  <label>Conta Proprietaria</label>
                  <SelectInput id="contaProprietaria" className="sm" options={optionscontaproprietaria} onChange={this.onChangeContaProprietaria} selectedValue={this.state.contaProprietaria} />
                </div>
                <div className="col-sm-2">
                  <label>Situação</label>
                  <SelectInput id="situacao" className="sm" options={optionsStatus} onChange={this.onChangeStatus} selectedValue={this.state.status} />
                </div>
              </div>
              <br></br>
              <div className="form-row">
                <ToastContainer />
                <div className="col-sm-1">
                  <input type="submit" value="Salvar" className="btn btn-sm btn btn-primary" />
                  &nbsp;&nbsp;
                  <Link to={'/indexLancamento'} className="btn btn-sm btn-success">Cancelar</Link>
                </div>
              </div>
              <br></br>
            </form>
          </div>
      </div>
    )
  }
  
}


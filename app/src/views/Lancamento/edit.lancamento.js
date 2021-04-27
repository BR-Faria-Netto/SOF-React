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

var optionsClassificador = [];
var optionsOperacao = [];
var optionsGestor = [];
var optionsStatus = [];
var optionsPeriodicidade = [];
var optionsFavorecido = [];
var optionsCategoria = [];

optionsClassificador.push({ value: 'Selecione a opção...', label: 'Selecione a opção...', id: 0 });
api.get('classificador').then(resp => {
  Object.entries(resp).forEach(entry => {
    const [key, value] = entry;
    optionsClassificador.push({ value: (key, value.descricao), label: (key, value.descricao), categorias: (key, value.categorias), id: (key, value._id) });
  });
});

optionsOperacao.push({ value: 'Selecione a opção...', label: 'Selecione a opção...', id: 0 });
axios.get(urlapi + 'tablecode/operacao').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionsOperacao.push({ value: (key, value.descricao), label: (key, value.descricao) });
  });
});

optionsGestor.push({ value: 'Selecione a opção...', label: 'Selecione a opção...', id: 0 });
api.get('/gestor').then(resp => {
  Object.entries(resp).forEach(entry => {
    const [key, value] = entry;
    optionsGestor.push({ value: (key, value.nomeGestor), label: (key, value.nomeGestor), id: (key, value._id) });
  });
});

optionsFavorecido = [];
optionsFavorecido.push({ value: 'Selecione a opção...', label: 'Selecione a opção...', id: 0 });
axios.get(urlapi + 'favorecido').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionsFavorecido.push({ value: (key, value.nomefav), label: (key, value.nomefav), id: (key, value._id) });
  });
});

optionsStatus.push({ value: 'Ativo', label: 'Ativo' });
optionsStatus.push({ value: 'Inativo', label: 'Inativo' });

optionsPeriodicidade.push({ value: 'Única', label: 'Única', fator : 0 });
optionsPeriodicidade.push({ value: 'Diária', label: 'Diária', fator: 1 });
optionsPeriodicidade.push({ value: 'Semanal', label: 'Semanal', fator: 7 });
optionsPeriodicidade.push({ value: 'Mensal', label: 'Mensal', fator: 30 });
optionsPeriodicidade.push({ value: 'Bimestral', label: 'Bimestral', fator: 60 });
optionsPeriodicidade.push({ value: 'Trimestral', label: 'Trimestral', fator: 90 });
optionsPeriodicidade.push({ value: 'Semestral', label: 'Semestral', fator: 120 });
optionsPeriodicidade.push({ value: 'Anual', label: 'Anual', fator: 365.25 });

export default class Edit extends Component {

  constructor(props) {
    super(props);
    this.onChangeClassificador = this.onChangeClassificador.bind(this);
    this.onChangeCategoria = this.onChangeCategoria.bind(this);
    this.onChangeOperacao = this.onChangeOperacao.bind(this);
    this.onChangeDescricao = this.onChangeDescricao.bind(this);
    
    this.onChangeFavorecido = this.onChangeFavorecido.bind(this);

    this.onChangeDocumento = this.onChangeDocumento.bind(this);
    this.onChangeCategoria = this.onChangeCategoria.bind(this);
    this.onChangePeriodicidade = this.onChangePeriodicidade.bind(this);
    this.onChangeRepeticao = this.onChangeRepeticao.bind(this);
    this.onChangeGestor = this.onChangeGestor.bind(this);
    this.onChangeValor = this.onChangeValor.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      classificador: '', 
      categoria: '',
      descricao: '',
      data:'',
      operacao: '',
      favorecido: '',
      documento: '',
      periodicidade: '',
      repeticao: 1,
      gestor: '',
      valor: '0,0',
      status: '',
      readOnly:false
    }
  }

  getCategoria( classificador ) {
    if (classificador) {
      optionsCategoria = [];
      optionsCategoria.push({ value: 'Selecione a opção...', label: 'Selecione a opção...', id: 0 });
      let object = optionsClassificador.find(tipo => tipo.label === classificador);
      if (typeof object !== 'undefined' && typeof object.categorias !== 'undefined' && object.categorias.length !== 0) {
        for (let i = 0; i < object.categorias.length; i = i + 1) {
          optionsCategoria.push({ value: (object.categorias[i].descricao), label: (object.categorias[i].descricao), id: (object.categorias[i]._id) });
        }
      }
    }
    return optionsCategoria;
  }

  componentDidMount() {
    api.get('lancamento/edit/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          classificador: response.classificador,
          categoria: response.categoria,
          descricao: response.descricao,
          data: response.data,
          operacao: response.operacao,
          periodicidade: response.periodicidade,
          repeticao: response.repeticao,
          favorecido: response.favorecido,
          documento: response.documento,
          gestor: response.gestor,
          valor: response.valor,
          status: response.status
        });
        if (this.state.periodicidade === 'Única') {
          this.setState({
            readOnly: true,
            repeticao: 1
          })
        }
      });
  }

  onChangeClassificador(e) {
    this.setState({
      classificador: e.value
    });
  }
  onChangeCategoria(e) {
    this.setState({
      categoria: e.value
    });
  }
  onChangeOperacao(e) {
    this.setState({
      operacao: e.value
    });
  }
  onChangeFavorecido(e) {
    this.setState({
      favorecido: e.value
    })
  }
  onChangeDocumento(e) {
    this.setState({
      documento: e.target.value
    })
  }
  onChangePeriodicidade(e){
    this.setState({
      periodicidade: e.value,
      readOnly: false,
      repeticao: 2
    })
    if (e.value === 'Única') {
      this.setState({
        readOnly: true,
        repeticao: 1
      })
    }
  } 
  onChangeRepeticao(e){
    this.setState({
      repeticao: e.target.value
    })

  } 
  onChangeGestor(e) {
    this.setState({
      gestor: e.value
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
      classificador: this.state.classificador,
      categoria: this.state.categoria,
      descricao: this.state.descricao,
      data: this.state.data,
      operacao: this.state.operacao,
      periodicidade: this.state.periodicidade,
      repeticao: this.state.repeticao,
      favorecido: this.state.favorecido,
      documento: this.state.documento,
      gestor: this.state.gestor,
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

    optionsCategoria = this.getCategoria(this.state.classificador);    

    return (
      <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
          <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
            <h5>Alteração de Lançamento </h5> 
          </div>
          <div style={{ marginLeft: '5px', marginRight: '5px', marginTop: '5px', border: '1px solid #ccc' }}>
            <form onSubmit={this.onSubmit} style={{ marginLeft: '15px', marginRight: '15px', marginTop: '15px' }}>
              <div className="form-row">
                <div className="col-sm-3">
                  <label>Classificador</label>
                  <SelectInput id="classificador" className="sm" options={optionsClassificador} onChange={this.onChangeClassificador} selectedValue={this.state.classificador} />
                </div>
                <div className="col-sm-3">
                  <label>Categoria</label>
                  <SelectInput id="categoria" className="sm" options={optionsCategoria} onChange={this.onChangeCategoria} selectedValue={this.state.categoria} />
                </div>
              </div>
             <div className="form-row">
                <div className="col-sm-3">
                  <label>Descrição</label>
                  <input type="text" id="descricao" className="form-control form-control-sm" value={this.state.descricao} onChange={this.onChangeDescricao} />
                </div>
                <div className="col-sm-3">
                  <label>Operação</label>
                  <SelectInput id="operacao" className="sm" options={optionsOperacao} linkValue='/createTableCode/operacao/Operação' onChange={this.onChangeOperacao} selectedValue={this.state.operacao} />
                </div>
              </div>
              <div className="form-row">
                <div className="col-sm-3" style={{ textAlign: 'right' }}>
                  <label>Valor</label>
                  <CurrencyInput placeholder="0,00" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.state.valor} onChange={this.onChangeValor} />
                </div>
                <div className="col-sm-1">
                  <label>Data Vencimento</label>
                  <InputMask mask='99/99/9999' slotChar='mm/dd/yyyy' type="text" id="data" className="form-control form-control-sm" value={this.state.data} onChange={this.onChangeData} />
                </div>
              </div>
              <div className="form-row">
                <div className="col-sm-3">
                  <label>Favorecido</label>
                  <SelectInput id="favorecido" className="sm" options={optionsFavorecido} onChange={this.onChangeFavorecido} selectedValue={this.state.favorecido} />
                  
                </div>
                <div className="col-sm-1">
                  <label>Documento</label>
                  <input type="text" id="documento" className="form-control form-control-sm" value={this.state.documento} onChange={this.onChangeDocumento} />
                </div>
              </div>
              <div className="form-row">
                <div className="col-sm-3">
                  <label>Periodicidade</label>
                  <SelectInput id="Periodicidade" className="sm" options={optionsPeriodicidade} onChange={this.onChangePeriodicidade} selectedValue={this.state.periodicidade} />
                </div>
                <div className="col-sm-1" style={{ textAlign: 'right' }}>
                <label>Repetição</label>
                <CurrencyInput placeholder="0" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.state.repeticao} onChange={this.onChangeRepeticao} readOnly={this.state.readOnly} />
                </div>
              </div>
              <div className="form-row">
                <div className="col-sm-3">
                  <label>Gestor</label>
                  <SelectInput id="gestor" className="sm" options={optionsGestor} onChange={this.onChangeGestor} selectedValue={this.state.gestor} />
                </div>
                <div className="col-sm-1">
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
          <br></br>
      </div>
    )
  }
}


import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SelectInput from '../../../components/SelectInput';

import api from "../../../services/api";


var optionsBasePes = [];
optionsBasePes.push({ value: 'Selecione a opção...', label: 'Selecione a opção...', id: 0 });
api.get('basePes').then(resp => {
  Object.entries(resp).forEach(entry => {
    const [key, value] = entry;
    optionsBasePes.push({ value: (key, value.descricao), label: (key, value.descricao), anoInicio: (key, value.anoInicio), anoFim: (key, value.anoFim), id: (key, value._id) });
  });
});

var optionsDiretriz = [];
optionsDiretriz.push({ value: 'Selecione a opção...', label: 'Selecione a opção...', id: 0 });
api.get('diretriz').then(resp => {
  Object.entries(resp).forEach(entry => {
    const [key, value] = entry;
    optionsDiretriz.push({ value: (key, value.descricao), label: (key, value.descricao), id: (key, value._id) });
  });
});

var optionsObjetivo = [];
optionsObjetivo.push({ value: 'Selecione a opção...', label: 'Selecione a opção...', id: 0 });
api.get('objetivo').then(resp => {
  Object.entries(resp).forEach(entry => {
    const [key, value] = entry;
    optionsObjetivo.push({ value: (key, value.descricao), label: (key, value.descricao), id: (key, value._id) });
  });
});

var optionsMeta = [];
optionsMeta.push({ value: 'Selecione a opção...', label: 'Selecione a opção...', id: 0 });
api.get('objetivo').then(resp => {
  Object.entries(resp).forEach(entry => {
    const [key, value] = entry;
    optionsMeta.push({ value: (key, value.descricao), label: (key, value.descricao), id: (key, value._id) });
  });
});

var optionsStatus = [];
optionsStatus.push({ value: ('Ativo', 'Ativo'), label: ('Ativo', 'Ativo') });
optionsStatus.push({ value: ('Inativo', 'Inativo'), label: ('Inativo', 'Inativo') });

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeBasePes = this.onChangeBasePes.bind(this);
    this.onChangeDiretriz = this.onChangeDiretriz.bind(this);
    this.onChangeObjetivo = this.onChangeObjetivo.bind(this);
    this.onChangeMeta = this.onChangeMeta.bind(this);
    this.onChangeNumero = this.onChangeNumero.bind(this);
    this.onChangeDescricao = this.onChangeDescricao.bind(this);
    this.onChangeIndicador = this.onChangeIndicador.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      basePes: '',
      diretriz: '',
      objetivo: '',
      meta: '',
      numero: '',
      descricao: '',
      indicador: '',
      status: '',
      estrategias: []
    }
  }
  onChangeBasePes(e) {
    this.setState({
      basePes: e.value
    });
  }
  onChangeDiretriz(e) {
    this.setState({
      diretriz: e.value
    });
  }
  onChangeObjetivo(e) {
    this.setState({
      objetivo: e.value
    });
  }
  onChangeMeta(e) {
    this.setState({
      meta: e.value
    });
  }
  onChangeNumero(e) {
    this.setState({
      numero: e.target.value
    });
  }
  onChangeDescricao(e) {
    this.setState({
      descricao: e.target.value
    })
  }
  onChangeIndicador(e) {
    this.setState({
      indicador: e.target.value
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
      basePes: this.state.basePes,
      diretriz: this.state.diretriz,
      objetivo: this.state.objetivo,
      meta: this.state.meta,
      numero: this.state.numero,
      descricao: this.state.descricao,
      indicador: this.state.indicador,
      status: this.state.status,
      estrategias: this.state.estrategias,
      login: window.login
    };
    api.post('acao/add',obj)
    .then(res => {
      toast.success("Registro foi salvo com successo");
    })
    .catch(error => {
      toast.error("Ocorrou erro ao salvar o registro");
    })

    this.props.history.push('/indexMeta');

  }

  render() {

    return (

      <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
           <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
                <h5>Inclusão da Meta</h5>  
           </div>
           <div style={{ marginLeft:'5px', marginRight:'5px', marginTop:'5px' , border: '1px solid #ccc' }}>
                <form onSubmit={this.onSubmit} style={{ marginLeft:'15px', marginRight:'15px', marginTop:'15px'}}>
                    <div className="form-row">
                      <div className="col-sm-2">
                        <label>Ano Base</label>
                        <SelectInput id="basePes" className="sm" options={optionsBasePes} onChange={this.onChangeBasePes} selectedValue={this.state.basePes} />
                      </div>
                      <div className="col-sm-1">
                        <label>Ordem</label>
                        <input type="text" className="form-control" value={this.state.numero} onChange={this.onChangeNumero} />
                      </div>
                      <div className="col-sm-2">
                        <label>Situação</label>
                        <SelectInput id="situacao" className="sm" options={optionsStatus} onChange={this.onChangeStatus} selectedValue={this.state.status} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-sm-2">
                        <label>Diretriz</label>
                        <SelectInput id="diretriz" className="sm" options={optionsDiretriz} onChange={this.onChangeDiretriz} selectedValue={this.state.diretriz} />
                      </div>
                      <div className="col-sm-2">
                        <label>Objetivo</label>
                        <SelectInput id="objetivo" className="sm" options={optionsObjetivo} onChange={this.onChangeObjetivo} selectedValue={this.state.objetivo} />
                      </div>
                      <div className="col-sm-2">
                        <label>Meta</label>
                        <SelectInput id="meta" className="sm" options={optionsMeta} onChange={this.onChangeMeta} selectedValue={this.state.meta} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-sm-3">
                        <label>Acão</label>
                        <textarea id="desc" name="desc" rows="4" className="form-control form-control-sm" type="text" value={this.state.descricao} onChange={this.onChangeDescricao} />
                      </div>
                      <div className="col-sm-3">
                        <label>Indicador</label>
                        <textarea id="ind" name="ind" rows="4" className="form-control form-control-sm" type="text" value={this.state.indicador} onChange={this.onChangeIndicador} />
                      </div>
                    </div>
                    <br></br>
                    <div className="form-row">
                        <ToastContainer />
                        <div className="col-sm-1">
                            <input type="submit" value="Salvar" className="btn btn-sm btn btn-primary"/>
                            &nbsp;&nbsp;
                            <Link to={'/indexMeta'} className="btn btn-sm btn-success">Cancelar</Link>
                        </div>
                    </div>
                    <br></br>
              </form>
          </div>
      </div>
      )
  }
}

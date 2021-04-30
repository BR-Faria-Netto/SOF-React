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

var optionsStatus = [];
optionsStatus.push({ value: ('Ativo', 'Ativo'), label: ('Ativo', 'Ativo') });
optionsStatus.push({ value: ('Inativo', 'Inativo'), label: ('Inativo', 'Inativo') });

export default class Edit extends Component {

  constructor(props) {
    super(props);
    this.onChangeNumero = this.onChangeNumero.bind(this);
    this.onChangeBasePes = this.onChangeBasePes.bind(this);
    this.onChangeDescricao = this.onChangeDescricao.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      numero: '',
      basePes: '',
      descricao: '',
      status: ''
    }
  }
  componentDidMount() {
    api.get('diretriz/edit/'+this.props.match.params.id)
         .then(response => {
              this.setState({ 
                numero: response.numero,
                basePes: response.basePes,
                descricao: response.descricao,
                status: response.status
              });
          })
          .catch(function (error) {
              console.log(error);
          })

  }
  onChangeNumero(e) {
    this.setState({
      numero: e.target.value
    });
  }
  onChangeBasePes(e) {
    this.setState({
      basePes: e.value
    });
  }
  onChangeDescricao(e) {
    this.setState({
      descricao: e.target.value
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
      numero: this.state.numero,
      basePes: this.state.basePes,
      descricao: this.state.descricao,
      status: this.state.status,
      login: window.login

    };
    api.post('diretriz/update/'+this.props.match.params.id, obj)
    .then(res => {
      toast.success("Registro foi salvo com successo");
    })
    .catch(error => {
      toast.error("Ocorrou erro ao salvar o registro");
    })
    this.props.history.push('/indexDiretriz');
  }

  render() {

    return (
      <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
          <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
              <h5>Alteração da Diretriz</h5>  
          </div>
          <div style={{ marginLeft: '5px', marginRight: '5px', marginTop: '5px', border: '1px solid #ccc' }}>
            <form onSubmit={this.onSubmit} style={{ marginLeft: '15px', marginRight: '15px', marginTop: '15px' }}>
              <div className="form-row">
                <div className="col-sm-3">
                  <label>Base do Pes</label>
                  <SelectInput id="basePes" className="sm" options={optionsBasePes} onChange={this.onChangeBasePes} selectedValue={this.state.basePes} />
                </div>
                <div className="col-sm-3">
                  <label>Situação</label>
                  <SelectInput id="situacao" className="sm" options={optionsStatus} onChange={this.onChangeStatus} selectedValue={this.state.status} />
                </div>
              </div>
              <div className="form-row">
                <div className="col-sm-1">
                  <label>Ordem</label>
                  <input type="text" className="form-control" value={this.state.numero} onChange={this.onChangeNumero} />
                </div>
                <div className="col-sm-5">
                  <label>Diretriz</label>
                  <textarea id="desc" name="desc" rows="6" className="form-control form-control-sm" type="text" value={this.state.descricao} onChange={this.onChangeDescricao} />
                </div>
              </div>
              <br></br>
              <div className="form-row">
                <ToastContainer />
                <div className="col-sm-1">
                  <input type="submit" value="Salvar" className="btn btn-sm btn btn-primary" />
                  &nbsp;&nbsp;
                  <Link to={'/indexDiretriz'} className="btn btn-sm btn-success">Cancelar</Link>
                </div>
              </div>
              <br></br>
            </form>
          </div>
      </div>
    )
  }
  
}


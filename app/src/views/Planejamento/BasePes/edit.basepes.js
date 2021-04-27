import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SelectInput from '../../../components/SelectInput';

import api from "../../../services/api";

var optionsStatus = [];
optionsStatus.push({ value: ('Ativo', 'Ativo'), label: ('Ativo', 'Ativo') });
optionsStatus.push({ value: ('Inativo', 'Inativo'), label: ('Inativo', 'Inativo') });

export default class Edit extends Component {

  constructor(props) {
    super(props);
    this.onChangeAnoInicio = this.onChangeAnoInicio.bind(this);
    this.onChangeAnoFim = this.onChangeAnoFim.bind(this);
    this.onChangeDescricao = this.onChangeDescricao.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      anoInicio: '',
      anoFim: '',
      descricao: '',
      status: ''
    }
  }
  componentDidMount() {
    api.get('basePes/edit/'+this.props.match.params.id)
         .then(response => {
              this.setState({ 
                anoInicio: response.anoInicio,
                anoFim: response.anoFim,
                descricao: response.descricao,
                status: response.status
              });
          })
          .catch(function (error) {
              console.log(error);
          })

  }
  onChangeAnoInicio(e) {
    this.setState({
      anoInicio: e.target.value
    });
  }
  onChangeAnoFim(e) {
    this.setState({
      anoFim: e.target.value
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
      anoInicio: this.state.anoInicio,
      anoFim: this.state.anoFim,
      descricao: this.state.descricao,
      status: this.state.status,
      login: window.login

    };
    api.post('basePes/update/'+this.props.match.params.id, obj)
    .then(res => {
      toast.success("Registro foi salvo com successo");
    })
    .catch(error => {
      toast.error("Ocorrou erro ao salvar o registro");
    })
    this.props.history.push('/indexBasePes');
  }

  render() {

    return (
      <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
          <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
              <h5>Alteração do Ano Base do Pes</h5>  
          </div>
          <div style={{ marginLeft: '5px', marginRight: '5px', marginTop: '5px', border: '1px solid #ccc' }}>
            <form onSubmit={this.onSubmit} style={{ marginLeft: '15px', marginRight: '15px', marginTop: '15px' }}>
              <div className="form-row">
                <div className="col-sm-1">
                  <label>Ano Inicio  </label>
                  <input type="text" className="form-control" value={this.state.anoInicio} onChange={this.onChangeAnoInicio} />
                </div>
                <div className="col-sm-1">
                  <label>Ano Fim:  </label>
                  <input type="text" className="form-control" value={this.state.anoFim} onChange={this.onChangeAnoFim} />
                </div>
              </div>
              <div className="form-row">
                <div className="col-sm-6">
                  <label>Descrição: </label>
                  <input type="text" className="form-control" value={this.state.descricao} onChange={this.onChangeDescricao} />
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
                  <Link to={'/indexBasePes'} className="btn btn-sm btn-success">Cancelar</Link>
                </div>
              </div>
              <br></br>
            </form>
          </div>
      </div>
    )
  }
  
}


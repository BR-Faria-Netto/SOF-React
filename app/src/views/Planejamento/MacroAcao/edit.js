import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SelectInput from '../../../components/SelectInput';

import api from "../../../services/api";
import urlapi from "../../../services/urlapi"

var optionsUniMedida = [];
optionsUniMedida.push({ value: 'Selecione a opção...', label: 'Selecione a opção...', id: 0 });
axios.get(urlapi + 'tablecode/unidMedida').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionsUniMedida.push({ value: (key, value.descricao), label: (key, value.descricao) });
  });
});

var optionsAcaoOrcamentaria = [];
optionsAcaoOrcamentaria.push({ value: 'Selecione a opção...', label: 'Selecione a opção...', id: 0 });
api.get('orcamento').then(resp => {
  Object.entries(resp).forEach(entry => {
    const [key, value] = entry;
    optionsAcaoOrcamentaria.push({ value: (key, value.progtrab), label: (key, value.progtrab), id: (key, value._id) });
  });
});

var optionsStatus = [];
optionsStatus.push({ value: ('Ativo', 'Ativo'), label: ('Ativo', 'Ativo') });
optionsStatus.push({ value: ('Inativo', 'Inativo'), label: ('Inativo', 'Inativo') });

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeCodigo = this.onChangeCodigo.bind(this);
    this.onChangeDescricao = this.onChangeDescricao.bind(this);
    this.onChangeUnidMedida = this.onChangeUnidMedida.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      codigo: '',
      descricao: '',
      unidMedida: '',
      status: ''
    }
  }
  componentDidMount() {
    api.get('macroacao/edit/'+this.props.match.params.id)
         .then(response => {
              this.setState({ 
                codigo: response.codigo,
                descricao: response.descricao,
                unidMedida: response.unidMedida,
                status: response.status,
                estrategias: response.estrategias
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
  onChangeUnidMedida(e) {
    this.setState({
      unidMedida: e.value
    });
  }
  onChangeStatus(e) {
    this.setState({
      status: e.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      codigo: this.state.codigo,
      descricao: this.state.descricao,
      unidMedida: this.state.unidMedida,
      status: this.state.status,
      login: window.login
    };
    api.post('macroacao/update/'+this.props.match.params.id, obj)
    .then(res => {
      toast.success("Registro foi salvo com successo");
    })
    .catch(error => {
      toast.error("Ocorrou erro ao salvar o registro");
    })
    this.props.history.push('/indexMacroAcao');
  }

  AddRow = () => {
    const item = {
      codigo: "",
      descricao: ""
    };
    this.setState({ estrategias: [...this.state.estrategias, item] });
  };

  RemoveRow = (row) => {
    const estrategias = this.state.estrategias;
    for (let [i, estrategia] of estrategias.entries()) {
      if (estrategia._id === row._id) {
        estrategias.splice(i, 1);
      }
    }
    this.setState({ estrategias })
  }



  render() {

    return (
      <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
          <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
              <h5>Alteração de Meta</h5>  
          </div>
          <div style={{ marginLeft: '5px', marginRight: '5px', marginTop: '5px', border: '1px solid #ccc' }}>
            <form onSubmit={this.onSubmit} style={{ marginLeft: '15px', marginRight: '15px', marginTop: '15px' }}>
                <div className="form-row">
                  <div className="col-sm-2">
                    <label>Código</label>
                    <input type="text" className="form-control" value={this.state.codigo} onChange={this.onChangeCodigo} />
                  </div>
                  <div className="col-sm-2">
                    <label>Unid Medida</label>
                    <SelectInput id="unidMedida" className="sm" options={optionsUniMedida} onChange={this.onChangeUnidMedida} selectedValue={this.state.unidMedida} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-sm-6">
                    <label>Macro Ação</label>
                    <textarea id="desc" name="desc" rows="4" className="form-control form-control-sm" type="text" value={this.state.descricao} onChange={this.onChangeDescricao} />
                  </div>
                </div>
                <br></br>
                <div className="form-row">
                  <ToastContainer />
                  <div className="col-sm-1">
                    <input type="submit" value="Salvar" className="btn btn-sm btn btn-primary" />
                    &nbsp;&nbsp;
                    <Link to={'/indexMacroAcao'} className="btn btn-sm btn-success">Cancelar</Link>
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


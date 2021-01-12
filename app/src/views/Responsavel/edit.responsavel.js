import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import api from "../../services/api";
import urlapi from "../../services/urlapi"

import SelectInput from '../../components/SelectInput';

var optionstiporesponsavel = [];
optionstiporesponsavel.push({ value:  '', label: 'Selecione a opção...', id: 0});
axios.get(urlapi+'tablecode/tiporesponsavel').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionstiporesponsavel.push({ value: (key, value.descricao), label: (key, value.descricao )});
  });
});

var optionsStatus = [];
optionsStatus.push({ value: ('Ativo', 'Ativo'), label: ('Ativo', 'Ativo' )});
optionsStatus.push({ value: ('Inativo', 'Inativo'), label: ('Inativo', 'Inativo' )});

export default class Edit extends Component {

  constructor(props) {
    super(props);
    
    this.onChangeTipoResponsavel = this.onChangeTipoResponsavel.bind(this);  
    this.onChangeNome = this.onChangeNome.bind(this);  
    this.onChangeCargo = this.onChangeCargo.bind(this);  
    this.onChangeIdFuncional = this.onChangeIdFuncional.bind(this);  
    this.onChangeDelegacao = this.onChangeDelegacao.bind(this);  
    this.onChangeSituacao = this.onChangeSituacao.bind(this);  
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      tipoResponsavel  : optionstiporesponsavel[0].label,
      nome : '',
      cargo: '',
      idfuncional : '',
      delegacao : '',
      situacao : optionsStatus[0].label,
     }

  }
  
  componentDidMount() {
      api.get('responsavel/edit/'+this.props.match.params.id)
         .then(response => {
              this.setState({ 
                tipoResponsavel  : response.tipoResponsavel,
                nome : response.nome,
                cargo: response.cargo,
                idfuncional : response.idfuncional,
                delegacao : response.delegacao,
                situacao : response.situacao
              });
          })
          .catch(function (error) {
              console.log(error);
          })

    }

    onChangeTipoResponsavel(e) {
      this.setState({
        tipoResponsavel: e.value
      });
    }
  
    onChangeNome(e) {
      this.setState({
        nome: e.target.value
      })  
    }

    onChangeCargo(e) {
      this.setState({
        cargo: e.target.value
      })  
    }

    onChangeIdFuncional(e) {
      this.setState({
        idfuncional: e.target.value
      })  
    }
  
    onChangeDelegacao(e) { 
      this.setState({
        delegacao: e.target.value
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
        tipoResponsavel : this.state.tipoResponsavel,
        nome : this.state.nome,
        cargo : this.state.cargo,
        idfuncional : this.state.idfuncional,
        delegacao  :  this.state.delegacao,
        situacao : this.state.situacao
      };
  
      api.post('responsavel/update/'+this.props.match.params.id, obj)
      .then(res => {
        toast.success("Registro foi salvo com successo");
      })
      .catch(error => {
        toast.error("Ocorrou erro ao salvar o registro");
      })

      this.props.history.push('/indexResponsavel');
  
  }

  render() {
   
    return (
      <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
           <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
                <h5>Alteração de Responsável Legal</h5>  
           </div>
           <div style={{ marginLeft:'5px', marginRight:'5px', marginTop:'5px' , border: '1px solid #ccc' }}>
                <form onSubmit={this.onSubmit} style={{ marginLeft:'15px', marginRight:'15px', marginTop:'15px'}}>
                    <div className="form-row">
                         <div className="col-sm-2">
                             <label>Responsável</label>  
                             <SelectInput id="tipoResponsavel" className="sm" options={optionstiporesponsavel} onChange={this.onChangeTipoResponsavel} selectedValue={this.state.tipoResponsavel}/> 
                         </div>
                         <div className="col-sm-3">
                             <label>Nome</label>  
                             <input type="text" id="nome" className="form-control form-control-sm" value={this.state.nome} onChange={this.onChangeNome}/>
                         </div>
                         <div className="col-sm-3">
                             <label>Nome</label>  
                             <input type="text" id="cargo" className="form-control form-control-sm" value={this.state.cargo} onChange={this.onChangeCargo}/>
                         </div>
                    </div>
                    <div className="form-row">
                          <div className="col-sm-2">
                              <label>Id Funcional</label>  
                              <input type="text" id="idfuncional" className="form-control form-control-sm" value={this.state.idfuncional} onChange={this.onChangeIdFuncional}/>
                          </div>
                          <div className="col-sm-3">
                              <label>Delegação</label>  
                              <input type="text" id="delegacao" className="form-control form-control-sm" value={this.state.delegacao} onChange={this.onChangeDelegacao}/>
                         </div>
                         <div className="col-sm-2">
                             <label>Situação</label>  
                             <SelectInput id="situacao" className="sm" options={optionsStatus} onChange={this.onChangeSituacao} selectedValue={this.state.situacao}/> 
                         </div>
                    </div>
    
                    <br></br>
                    <div className="form-row">
                        <ToastContainer />
                        <div className="col-sm-1">
                            <input type="submit" value="Salvar" className="btn btn-sm btn btn-primary"/>
                            &nbsp;&nbsp;
                            <Link to={'/indexResponsavel'} className="btn btn-sm btn-success">Cancelar</Link>
                        </div>
                    </div>
                    <br></br>
              </form>
          </div>
      </div>
    )
  }
  
}


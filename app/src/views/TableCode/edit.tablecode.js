import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import urlapi from "../../services/urlapi"

export default class Edit extends Component {
       constructor(props) {
          super(props);
          this.onChangeCodigo = this.onChangeCodigo.bind(this);
          this.onChangeDescricao = this.onChangeDescricao.bind(this);
          this.onSubmit = this.onSubmit.bind(this);
          this.state = {
               codigo: '',
               descricao: ''
          }
       }

componentDidMount() {
      axios.get(urlapi+'tablecode/edit/'+this.props.match.params.dbTable+'/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                codigo: response.data.codigo, 
                descricao: response.data.descricao });
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
      login: window.login
    };
    axios.post(urlapi+'tablecode/update/'+this.props.match.params.dbTable+'/'+this.props.match.params.id, obj)
    .then(res => {
      toast.success("Registro foi salvo com successo");
    })
    .catch(error => {
      toast.error("Ocorrou erro ao salvar o registro");
    })
    this.props.history.push('/indexTableCode/'+this.props.match.params.dbTable+'/'+this.props.match.params.pgTitle);
}
 
render() {
    return (
        <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
            <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
                <h5>Alteração de {this.props.match.params.pgTitle}</h5>  
            </div>
            <div style={{ marginLeft:'5px', marginRight:'5px', marginTop:'5px' , border: '1px solid #ccc' }}>
                <form onSubmit={this.onSubmit} style={{ marginLeft:'15px', marginRight:'15px', marginTop:'15px'}}>
                      <div className="form-row">
                            <div className="col-sm-1">
                              <label>Codigo:  </label>
                              <input type="text" className="form-control" value={this.state.codigo} onChange={this.onChangeCodigo}/>
                            </div>
                      </div>
                      <div className="form-row">
                            <div className="col-sm-6">
                            <label>Descrição: </label>
                              <input type="text" className="form-control" value={this.state.descricao} onChange={this.onChangeDescricao}/>
                            </div>
                      </div>
                      <br></br>
                      <div className="form-row">
                           <ToastContainer />
                           <div className="col-sm-1">
                                <input type="submit" value="Salvar" className="btn btn-sm btn btn-primary"/>
                                &nbsp;&nbsp;
                                <Link to={'/indexTableCode/'+this.props.match.params.dbTable+'/'+this.props.match.params.pgTitle} className="btn btn-sm btn-success">Cancelar</Link>
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
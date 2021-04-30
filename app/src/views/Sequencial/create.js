import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import urlapi from "../../services/urlapi"

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeAno = this.onChangeAno.bind(this); 
    this.onChangeTabela = this.onChangeTabela.bind(this); 
    this.onChangeSequencia = this.onChangeSequencia.bind(this); 
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      ano : '',
      tabela : '',
      sequencia : 0
    }
  }

  onChangeAno(e) {
    this.setState({
      ano: e.target.value
    })  
  }

  onChangeTabela(e) {
    this.setState({
      tabela: e.target.value
    })  
  }

  onChangeSequencia(e) {
    this.setState({
      sequencia: e.target.value
    })  
  }


  onSubmit(e) {
    e.preventDefault();
    const obj = {
      ano : this.state.ano,
      tabela : this.state.tabela,
      sequencia : this.state.sequencia
    };

    axios.post(urlapi+'sequencial/add', obj)
    .then(res => {
      toast.success("Registro foi salvo com successo");
    })
    .catch(error => {
      toast.error( "Ocorrou erro ao salvar o registro");
    })
    this.props.history.push('/indexSequencial');
    
  }

  render() {
    return (
      <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
          <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
              <h5>Inclusão do Sequencial das Tabelas</h5>  
          </div>
          <div style={{ marginLeft:'5px', marginRight:'5px', marginTop:'5px' , border: '1px solid #ccc' }}>
              <form onSubmit={this.onSubmit} style={{ marginLeft:'15px', marginRight:'15px', marginTop:'15px'}}>

                 <div className="form-row">
                    <div className="col-sm-2">
                      <label>Exercicio</label>  
                      <input id="ano" name="ano" className="form-control form-control-sm" required="" type="text" value={this.state.ano} onChange={this.onChangeAno} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col-sm-2">
                      <label>Nome da Tabela</label>  
                      <input id="tabela" name="tabela" className="form-control form-control-sm" required="" type="text" value={this.state.tabela} onChange={this.onChangeTabela} />
                    </div>
                  </div>

                  <div className="form-row">
                     <div className="col-sm-0">
                        <label>Sequencial</label>  
                        <input id="sequencia" name="sequencia" className="form-control form-control-sm" required="" type="text" value={this.state.sequencia} onChange={this.onChangeSequencia}/>
                      </div>
                  </div>

                  <br></br>

                  <div className="form-row">
                       <ToastContainer />
                       <div className="col-sm-1">
                           <input type="submit" value="Salvar" className="btn btn-sm btn btn-primary"/>
                           &nbsp;&nbsp;
                           <Link to={'/indexSequencial'} className="btn btn-sm btn-success">Cancelar</Link>
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

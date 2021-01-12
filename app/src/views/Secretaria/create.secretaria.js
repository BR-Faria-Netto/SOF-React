import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as Icon from 'react-bootstrap-icons';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import cellEditFactory from 'react-bootstrap-table2-editor';

import urlapi from "../../services/urlapi"

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeNomesec = this.onChangeNomesec.bind(this); 
    this.onChangeBai = this.onChangeBai.bind(this); 
    this.onChangeEnder = this.onChangeEnder.bind(this);
    this.onChangeCid = this.onChangeCid.bind(this); 
    this.onChangeCep = this.onChangeCep.bind(this); 
    this.onChangeUf = this.onChangeUf.bind(this); 
    this.onChangeCnpj = this.onChangeCnpj.bind(this); 
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nomesec : '',
      bai : '',
      ender : '',
      cid : '',
      cep : '',
      uf : '',
      cnpj : '',
      contas : []
    }
  }

  onChangeNomesec(e) {
    this.setState({
      nomesec: e.target.value
    })  
  }

  onChangeBai(e) {
    this.setState({
      bai: e.target.value
    })  
  }

  onChangeEnder(e) {
    this.setState({
      ender: e.target.value
    })  
  }

  onChangeCid(e) {
    this.setState({
      cid: e.target.value
    })  
  }

  onChangeCep(e) {
    this.setState({
      cep: e.target.value
    })  
  }

  onChangeUf(e) {
    this.setState({
      uf: e.target.value
    })  
  }

  onChangeCnpj(e) {
    this.setState({
      cnpj: e.target.value
    })  
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      nomesec : this.state.nomesec,
      bai : this.state.bai,
      ender : this.state.ender,
      cid : this.state.cid,
      cep : this.state.cep,
      uf : this.state.uf,
      cnpj : this.state.cnpj,
      contas : this.state.contas
    };

    axios.post(urlapi+'secretaria/add', obj)
    .then(res => {
      toast.success("Registro foi salvo com successo");
    })
    .catch(error => {
      toast.error( "Ocorrou erro ao salvar o registro");
    })
    this.props.history.push('/indexSecretaria');
    
  }
 
  AddRow = () => {
    const item = {
      banco: "",
      agencia: "",
      conta: "",
      referente: ""
   };
   this.setState({ contas: [...this.state.contas, item] });
 };

 
 RemoveRow = (row) => {

   const contas = this.state.contas;

   for (let [i, conta] of contas.entries()) {
     if (conta._id === row._id) {
         contas.splice(i, 1);
     }
   }

   this.setState({ contas })

 }

  render() {

    const columns = [
      {
        dataField: 'banco',
        text: 'Banco'
      },
      {
        dataField: 'agencia',
        text: 'Agencia'
      },
      {
        dataField: 'conta',
        text: 'Conta'
      },
      {
        dataField: 'referente',
        text: 'Conta Referente'
      },
      {
          text: 
            <div className="form-row">
                <div className="col-sm-3">
                  Ação
                </div> 
                <div className="col-sm-3">
                     <button type="button" onClick={() => this.AddRow()} className="btn btn-sm btn-outline-success"><Icon.PlusSquareFill/></button>
                </div> 
            </div>
          ,
          formatter: (cellContent, row) => (
            <div className="form-row">
                <div className="col-sm-3">
                    <Link to={`#`} className="btn btn-sm btn-outline-danger" onClick={() => {if(window.confirm('Você confirma a exclusão?')){ this.RemoveRow(row)};}}><Icon.TrashFill/></Link>
                </div> 
            </div>
         ),
         style:{
           width: '9%'
        }
      }
    ];

    return (
      <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
          <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
              <h5>Inclusão de Secretaria</h5>  
          </div>
          <div style={{ marginLeft:'5px', marginRight:'5px', marginTop:'5px' , border: '1px solid #ccc' }}>
              <form onSubmit={this.onSubmit} style={{ marginLeft:'15px', marginRight:'15px', marginTop:'15px'}}>

              <div className="form-row">
                    <div className="col-sm-9">
                      <label>Nome da Secretaria</label>  
                      <input id="nomesec" name="nomesec" className="form-control form-control-sm" required="" type="text" value={this.state.nomesec} onChange={this.onChangeNomesec} />
                    </div>
                    <div className="col-sm-3">
                      <label>Cnpj/Cpf</label>  
                      <input id="cnpj" name="cnpj" className="form-control form-control-sm" required="" type="text" value={this.state.cnpj} onChange={this.onChangeCnpj}/>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col-sm-12">
                      <label>Endereço</label>  
                      <input id="ender" name="ender" className="form-control form-control-sm" required="" type="text" value={this.state.ender} onChange={this.onChangeEnder} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col-sm-4">
                      <label>Bairro</label>  
                      <input id="bai" name="bai" className="form-control form-control-sm" required="" type="text" value={this.state.bai} onChange={this.onChangeBai}/>
                    </div>
                    <div className="col-sm-4">
                      <label>Cidade</label>  
                      <input id="cid" name="cid" className="form-control form-control-sm" required="" type="text" value={this.state.cid} onChange={this.onChangeCid}/>
                    </div>
                    <div className="col-sm-2">
                      <label>Cep</label>  
                      <input id="cep" name="cep" className="form-control form-control-sm" required="" type="text" value={this.state.cep} onChange={this.onChangeCep}/>
                    </div>
                    <div className="col-sm-2">
                      <label>Estado</label>  
                      <input id="uf" name="uf" className="form-control form-control-sm" required="" type="text" value={this.state.uf} onChange={this.onChangeUf}/>
                    </div>
                  </div>
                  <div className="form-row">
                     <div style={{ marginLeft:'7px', marginRight:'7px', marginTop:'10px'}}>  
                        <BootstrapTable 
                            keyField='_id' 
                            data={ this.state.contas } 
                            columns={ columns } 
                            cellEdit={ cellEditFactory({ mode: 'dbclick', blurToSave: true })}
                            hover
                          />
                     </div>  
                  </div>  
                  <br></br>
                  <div className="form-row">
                       <ToastContainer />
                       <div className="col-sm-1">
                           <input type="submit" value="Salvar" className="btn btn-sm btn btn-primary"/>
                           &nbsp;&nbsp;
                           <Link to={'/indexSecretaria'} className="btn btn-sm btn-success">Cancelar</Link>
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

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import moment from "moment";

import CurrencyInput from '../../components/CurrencyInput';

import api from "../../services/api";
import urlapi from "../../services/urlapi"

import SelectInput from '../../components/SelectInput';

import * as Icon from 'react-bootstrap-icons';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

var optionsSimNao = [];
optionsSimNao.push({ value: 'Não', label: 'Não',id:0});
optionsSimNao.push({ value: 'Sim', label: 'Sim',id:1});

var optionstipoevento = [];
optionstipoevento.push({ value: null, label: 'Selecione a opção...', id: 0});
axios.get(urlapi+'tablecode/eventoorc').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionstipoevento.push({ value: (key, value.descricao), label: (key, value.descricao )});
  });
});

let optionssecretaria = [];
optionssecretaria.push({ value: 'Selecione a opção...', label: 'Selecione a opção...', id: 0 });
axios.get(urlapi + 'secretaria').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionssecretaria.push({ value: (key, value.nomesec), label: (key, value.nomesec), id: (key, value._id) });
  });
});

var optionsunidorcamentaria = [];
optionsunidorcamentaria.push({ value:  '', label: 'Selecione a opção...', id: 0});
axios.get(urlapi + 'tablecode/unidorcamentaria').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionsunidorcamentaria.push({ value: (key, value.descricao), label: (key, value.descricao )});
  });
});

var optionsprogtrabalho = [];
optionsprogtrabalho.push({ value:  '', label: 'Selecione a opção...', id: 0});
axios.get(urlapi + 'tablecode/progtrabalho').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionsprogtrabalho.push({ value: (key, value.descricao), label: (key, value.descricao )});
  });
});

var optionsnaturezadespesa = [];
optionsnaturezadespesa.push({ value:  '', label: 'Selecione a opção...', id: 0});
axios.get(urlapi + 'tablecode/naturezadespesa').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionsnaturezadespesa.push({ value: (key, value.descricao), label: (key, value.descricao )});
  });
});

var optionsfonterecurso = [];
optionsfonterecurso.push({ value:  '', label: 'Selecione a opção...', id: 0});
axios.get(urlapi + 'tablecode/fonterecurso').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionsfonterecurso.push({ value: (key, value.descricao), label: (key, value.descricao )});
  });
});


export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeAnoorc = this.onChangeAnoorc.bind(this);
    this.onChangeSecret = this.onChangeSecret.bind(this);
    this.onChangeUniorc = this.onChangeUniorc.bind(this); 
    this.onChangeProgtrab = this.onChangeProgtrab.bind(this); 
    this.onChangeNatdesp = this.onChangeNatdesp.bind(this); 
    this.onChangeFontrec = this.onChangeFontrec.bind(this); 
    this.onChangeDv = this.onChangeDv.bind(this); 
    this.onChangeValor = this.onChangeValor.bind(this); 
    this.onChangeTotal = this.onChangeTotal.bind(this); 
    this.onSubmit = this.onSubmit.bind(this);
   
    this.state = {
      copias : 1,
      anoorc :  moment().format('YYYY'),
      secret: optionssecretaria[0].label,
      uniorc  : optionsunidorcamentaria[0].label,
      progtrab : optionsprogtrabalho[0].label,
      natdesp : optionsnaturezadespesa[0].label,
      fontrec : optionsfonterecurso[0].label,
      dv: '',
      valor : '0,00',
      total: '0,00',
      movorc: []
    }
  }

  onChangeAnoorc (e) {
    this.setState({
      anoorc: e.target.value
    });
  }
  onChangeSecret(e) {
    this.setState({
      secret: e.value
    })
  }
  onChangeUniorc(e) {
    this.setState({
      uniorc: e.value
    })  
  }
  onChangeProgtrab(e) {
    this.setState({
      progtrab: e.value
    })  
  }
  onChangeNatdesp(e) {
    this.setState({
      natdesp: e.value
    })  
  }
  onChangeFontrec(e) {
    this.setState({
      fontrec: e.value
    })  
  }
  onChangeDv(e) {
    this.setState({
      dv: e.target.value
    })
  }
  onChangeValor(e) {
    this.setState({
      valor: e.target.value
    })
  }
  onChangeTotal(e) {
    this.setState({
      total: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      anoorc: this.state.anoorc,
      secret: this.state.secret,
      uniorc: this.state.uniorc,
      progtrab: this.state.progtrab,
      natdesp: this.state.natdesp,
      fontrec: this.state.fontrec,
      dv: this.state.dv,
      valor: this.state.valor,
      total: this.calculo(),
      movorc: this.state.movorc,
      login: window.login
    };

    api.post(urlapi + 'orcamento/add', obj)
    .then(res => {
      toast.success("Registro foi salvo com successo");
    })
    .catch(error => {

      toast.error("Ocorrou erro ao salvar o registro"+error);
    })

    this.props.history.push('/indexOrcamento');

  }

  AddRow = () => {
    const item = {
      eveorc: "",
      valor: "",
      referente: ""
    };
    this.setState({ movorc: [...this.state.movorc, item] });
  };

  RemoveRow = (row) => {
    const movorcs = this.state.movorc;
    for (let [i, movorc] of movorcs.entries()) {
      if (movorc._id === row._id) {
        movorcs.splice(i, 1);
      }
    }
    this.setState({ movorcs })
  }

  onChangeEveorc(e) {
    this.setState({
      eveorc: e.value
    })
  }

  calculo() {
    let tot = parseFloat(this.state.valor.split(".").join("").split(",").join("."));
    for (var i = 0; i < this.state.movorc.length; i++) {
      tot = tot + parseFloat(this.state.movorc[i].valor.split(".").join("").split(",").join("."));
    }
    this.setState({ total: tot })
    return tot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  render() {
    const columns = [
      {
        dataField: 'eveorc',
        text: 'Tipo de Evento',
        editor: {
          type: Type.SELECT,
          getOptions: (setOptions, { row, column }) => {
            return optionstipoevento
          }
        }
      },
      {
        dataField: 'valor',
        text: 'Valor',
        headerAlign: 'right',
        attrs: { align: 'right' },
        editorRenderer: (editorProps, value, row, rowIndex, columnIndex) => (
          <CurrencyInput
            className="form-control"
            style={{ textAlign: 'right' }}
            value={row.valor}
            onChange={(e) => {
              row.valor = e.target.value;
            }}
            onBlur={(e) => this.calculo()}
            thousandSeparator="."
            decimalSeparator=","
            allowNegative={false}
          />
        )
      },
      {
        dataField: 'referente',
        text: 'Referente'
      },
      {
        text:
          <div className="form-row">
            <div className="col-sm-3">
              Ação
           </div>
            <div className="col-sm-3">
              <button type="button" onClick={() => this.AddRow()} className="btn btn-sm btn-outline-success"><Icon.PlusSquareFill /></button>
            </div>
          </div>
        ,
        formatter: (cellContent, row) => (
          <div className="form-row">
            <div className="col-sm-3">
              <Link to={`#`} className="btn btn-sm btn-outline-danger" onClick={() => { if (window.confirm('Você confirma a exclusão?')) { this.RemoveRow(row) }; }}><Icon.TrashFill /></Link>
            </div>
          </div>
        ),
        style: {
          width: '9%'
        }
      }
    ];

    return (

      <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
           <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
                <h5>Inclusão de Orçamento Anual</h5>  
           </div>
           <div style={{ marginLeft:'5px', marginRight:'5px', marginTop:'5px' , border: '1px solid #ccc' }}>
                <form onSubmit={this.onSubmit} style={{ marginLeft:'15px', marginRight:'15px', marginTop:'15px'}}>
                  <div className="form-row">
                    <div className="col-sm-2">
                      <label>Exercicio</label>
                      <input type="text" id="anoorc" className="form-control form-control-sm" value={this.state.anoorc} onChange={this.onChangeAnoorc} />
                    </div>
                    <div className="col-sm-2">
                      <label>Orgão</label>
                      <SelectInput id="secret" className="sm" options={optionssecretaria} onChange={this.onChangeSecret} selectedValue={this.state.secret} />
                    </div>
                    <div className="col-sm-2">
                      <label>Unidade Orçamentaria</label>
                      <SelectInput id="uniorc" className="sm" options={optionsunidorcamentaria} onChange={this.onChangeUniorc} selectedValue={this.state.uniorc} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-sm-2">
                      <label>Programa de Trabalho</label>
                      <SelectInput id="progtrab" className="sm" options={optionsprogtrabalho} onChange={this.onChangeProgtrab} selectedValue={this.state.progtrab} />
                    </div>
                    <div className="col-sm-2">
                      <label>Natureza de Despesa</label>
                      <SelectInput id="natdesp" className="sm" options={optionsnaturezadespesa} onChange={this.onChangeNatdesp} selectedValue={this.state.natdesp} />
                    </div>
                    <div className="col-sm-2">
                      <label>Fonte de Recurso</label>
                      <SelectInput id="fontrec" className="sm" options={optionsfonterecurso} onChange={this.onChangeFontrec} selectedValue={this.state.fontrec} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-sm-2">
                      <label>D.V</label>
                      <input type="text" id="dv" className="form-control form-control-sm" value={this.state.dv} onChange={this.onChangeDv} />
                    </div>
                    <div className="col-sm-2" style={{ textAlign: 'right' }}>
                      <label>Dotação Inicial</label>
                <CurrencyInput placeholder="0,00" className="form-control form-control-sm" style={{ textAlign: 'right' }} type="text" value={this.state.valor} onChange={this.onChangeValor} onBlur={(e) => this.calculo()} />
                    </div>
                    <div className="col-sm-2" style={{ textAlign: 'right' }}>
                      <label>Total Final</label>
                      <CurrencyInput placeholder="0,00" className="form-control form-control-sm" thousandSeparator="." decimalSeparator="," style={{ textAlign: 'right' }} type="text" value={this.state.total} onChange={this.onChangeTotal} readonly="false" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div style={{ marginLeft: '7px', marginRight: '7px', marginTop: '10px' }}>
                      <BootstrapTable
                        keyField='_id'
                        data={this.state.movorc}
                        columns={columns}
                        cellEdit={cellEditFactory({ mode: 'dbclick', blurToSave: true })}
                        hover
                      />
                    </div>
                  </div> 
                  <hr></hr>
                  <div className="form-row">
                      <ToastContainer />
                      <div className="col-sm-1">
                          <input type="submit" value="Salvar" className="btn btn-sm btn btn-primary"/>
                          &nbsp;&nbsp;
                          <Link to={'/indexOrcamento'} className="btn btn-sm btn-success">Cancelar</Link>
                      </div>
                  </div>
                  <br></br>
            </form>
        </div>
      </div>
      )
  }
}

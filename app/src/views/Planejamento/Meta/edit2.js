import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as Icon from 'react-bootstrap-icons';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import cellEditFactory from 'react-bootstrap-table2-editor';

import SelectInput from '../../../components/SelectInput';


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

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

var optionsStatus = [];
optionsStatus.push({ value: ('Ativo', 'Ativo'), label: ('Ativo', 'Ativo') });
optionsStatus.push({ value: ('Inativo', 'Inativo'), label: ('Inativo', 'Inativo') });

var ano1 = '';
var ano2 = '';
var ano3 = '';
var ano4 = '';

export default class Edit extends Component {

  constructor(props) {
    super(props);
    this.onChangeBasePes = this.onChangeBasePes.bind(this);
    this.onChangeDiretriz = this.onChangeDiretriz.bind(this);
    this.onChangeObjetivo = this.onChangeObjetivo.bind(this);
    this.onChangeNumero = this.onChangeNumero.bind(this);
    this.onChangeDescricao = this.onChangeDescricao.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onRowEditCancel = this.onRowEditCancel.bind(this);
    this.state = {
      basePes: '',
      diretriz: '',
      objetivo: '',
      numero: '',
      descricao: '',
      status: '',
      estrategias: [],
      editingRows: {}
    }
  }

  componentDidMount() {
    api.get('meta/edit/'+this.props.match.params.id)
         .then(response => {
              this.setState({ 
                basePes: response.basePes,
                diretriz: response.diretriz,
                objetivo: response.objetivo,
                numero: response.numero,
                descricao: response.descricao,
                status: response.status,
                estrategias: response.estrategias
              });

          })
          .catch(function (error) {
              console.log(error);
          })

  }

  AddRow(event){
    const item = {
      codigo: " ",
      descricao: " ",
      indicador: " ",
      meta1: " ",
      meta2: " ",
      meta3: " ",
      meta4: " "
    };
    let itens = [...this.state.estrategias];
    this.setState({ estrategias: [...this.state.estrategias, item], ...{ [`${itens[event.index].codigo}`]: true } });
    //let editingRows = { ...this.state.editingRows, ...{ [`${itens[event.index].id}`]: true } };

  };

  onRowEditInit(event) {

    const estra = this.state.estrategias;

    alert(estra[event.index].descricao);

    this.originalRows[event.index] =  [...this.state.estrategias[event.index]] ;
  }

  onRowEditCancel() {
    this.setState({ estrategias: this.state.estrategias });
  }

  onEditorValueChange(productKey, props, value) {
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex][props.field] = value;
    this.setState({ [`${productKey}`]: updatedProducts });
  }

  inputTextEditor(productKey, props, field) {
    return <InputText type="text" value={props.rowData[field]} onChange={(e) => this.onEditorValueChange(productKey, props, e.target.value)} />;
  }

  actionBodyTemplate(row) {
    return (
      <React.Fragment>
        <div className="col-sm-3">
          <Link to={`#`} className="btn btn-sm btn-outline-danger" onClick={(row) =>  this.RemoveRow(row) }><Icon.TrashFill /></Link>
        </div>
      </React.Fragment>
    );
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
      numero: this.state.numero,
      descricao: this.state.descricao,
      status: this.state.status,
      estrategias : this.state.estrategias,
      login: window.login

    };
    api.post('meta/update/'+this.props.match.params.id, obj)
    .then(res => {
      toast.success("Registro foi salvo com successo");
    })
    .catch(error => {
      toast.error("Ocorrou erro ao salvar o registro");
    })
    this.props.history.push('/indexMeta');
  }

  render() {

    if (this.state.basePes) {
      let anoInicio = optionsBasePes.find(base => base.label === this.state.basePes).anoInicio;
      let anoFim = optionsBasePes.find(base => base.label === this.state.basePes).anoFim;

      ano1 = anoInicio;
      ano2 = parseInt(anoInicio) + 1;
      ano3 = parseInt(anoInicio) + 2;
      ano4 = anoFim;

    }

    const columns = [
      {
        field: '_id',
        header: 'id',
      },
      {
        field: 'codigo',
        header: 'Ordem',
      },
      {
        field: 'descricao',
        text: 'Ação Estratégica',
      },
      {
        field: 'indicador',
        header: 'Indicador',
      },
      {
        field: 'meta1',
        header: ano1,
      },
      {
        field: 'meta2',
        header: ano2,
      },
      {
        field: 'meta3',
        header: ano3,
      },
      {
        field: 'meta4',
        header: ano4,
      }
    ];

    const setActiveRowIndex = (index) => {
      let itens = [...this.state.estrategias];
      //this.originalRows2[index] = { ...itens[index] };
      let editingRows = { ...this.state.editingRows, ...{ [`${itens[index].numero}`]: true } };
      this.setState({ editingRows });
    }

    const RemoveRow = (row) => {
      const estrategias = this.state.estrategias;
      for (let [i, estrategia] of estrategias.entries()) {
        if (estrategia._id === row._id) {
          estrategias.splice(i, 1);
        }
      }
      this.setState({ estrategias })
    }

    const actionTemplate = (rowData) => {
      return (
        <React.Fragment>
          <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => RemoveRow(rowData)} />
          <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => setActiveRowIndex(0)} />
        </React.Fragment>
      );
    }
    
    return (
      <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
          <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
              <h5>Alteração de Meta</h5>  
          </div>
          <div style={{ marginLeft: '5px', marginRight: '5px', marginTop: '5px', border: '1px solid #ccc' }}>
            <form onSubmit={this.onSubmit} style={{ marginLeft: '15px', marginRight: '15px', marginTop: '15px' }}>
              <div className="form-row">
                <div className="col-sm-2">
                  <label>Base do Pes</label>
                  <SelectInput id="basePes" className="sm" options={optionsBasePes} onChange={this.onChangeBasePes} selectedValue={this.state.basePes} />
                </div>
                <div className="col-sm-2">
                  <label>Diretriz</label>
                  <SelectInput id="diretriz" className="sm" options={optionsDiretriz} onChange={this.onChangeDiretriz} selectedValue={this.state.diretriz} />
                </div>
                <div className="col-sm-2">
                  <label>Objetivo</label>
                  <SelectInput id="objetivo" className="sm" options={optionsObjetivo} onChange={this.onChangeObjetivo} selectedValue={this.state.objetivo} />
                </div>
                <div className="col-sm-2">
                  <label>Situação</label>
                  <SelectInput id="situacao" className="sm" options={optionsStatus} onChange={this.onChangeStatus} selectedValue={this.state.status} />
                </div>
              </div>
              <div className="form-row">
                <div className="col-sm-1">
                  <label>Ordem</label>
                  <input type="text" className="form-control" value={this.state.numero} onChange={this.onChangeNumero} />
                </div>
                <div className="col-sm-7">
                  <label>Meta</label>
                  <textarea id="desc" name="desc" rows="4" className="form-control form-control-sm" type="text" value={this.state.descricao} onChange={this.onChangeDescricao} />
                </div>
              </div>
              <div className="form-row">
                <div className="col-sm-8" style={{ marginLeft: '7px', marginRight: '7px', marginTop: '10px' }}>
                  {/* <DataTable value={this.state.estrategias} editMode="row" dataKey="id" onRowEditInit={this.onRowEditInit} onRowEditCancel={this.onRowEditCancel}> */}
                <DataTable value={this.state.estrategias} editMode="row" editingRows={this.state.estrategias} dataKey="id">
                      <Column field="codigo" header="Ordem" editor={(props) => this.inputTextEditor('estrategias', props, 'codigo')}></Column>
                      <Column field="descricao" header="Descrição" editor={(props) => this.inputTextEditor('estrategias', props, 'descricao')}></Column>
                      <Column className="p-button-rounded p-button-success p-mr-2" rowEditor headerStyle={{ width: '7rem' }} bodyStyle={{ textAlign: 'center' }} header={<label>Ação<Link to={'#'} className='btn btn-sm btn-outline-success' onClick={(e) => this.AddRow(e)}><Icon.PlusSquareFill /></Link></label>}>Ação</Column>
                      <Column body={actionTemplate}></Column>
                      
                    </DataTable>
                  </div>
              </div>  
              <br></br>
              <div className="form-row">
                <ToastContainer />
                <div className="col-sm-1">
                  <Link to={`#`} className="btn btn-sm btn-primary" onClick={(e) => this.onSubmit(e)}>Salvar</Link>
                  &nbsp;&nbsp;
                  <Link to={'/indexMeta'} className="btn btn-sm btn-success">Cancelar</Link>
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


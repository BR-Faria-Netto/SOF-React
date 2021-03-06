import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import moment from "moment";

import CurrencyInput from '../../components/CurrencyInput';
import InputMask from 'react-input-mask';

import api from "../../services/api";
import urlapi from "../../services/urlapi"

import SelectInput from '../../components/SelectInput';

const valorExtenso = require('numero-por-extenso');

var optionstipoevento = [];
optionstipoevento.push({ value:  '', label: 'Selecione a opção...', id: 0});
axios.get(urlapi+'tablecode/eventondc').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionstipoevento.push({ value: (key, value.descricao), label: (key, value.descricao )});
  });
});

var optionsgrupodespesa = [];
optionsgrupodespesa.push({ value:  '', label: 'Selecione a opção...', id: 0});
axios.get(urlapi + 'tablecode/grupodespesa').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionsgrupodespesa.push({ value: (key, value.descricao), label: (key, value.descricao )});
  });
});

var optionsunidgestora = [];
optionsunidgestora.push({ value:  '', label: 'Selecione a opção...', id: 0});
axios.get(urlapi + 'tablecode/unidgestora').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionsunidgestora.push({ value: (key, value.descricao), label: (key, value.descricao )});
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

var optionsfavorecido = [];
optionsfavorecido.push({ value:  '', label: 'Selecione a opção...', id: 0});
axios.get(urlapi + 'favorecido').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionsfavorecido.push({ value: (key, value.nomefav), label: (key, value.nomefav ), id: (key, value._id )});
  });
});

var optionsEmissor = [];
optionsEmissor.push({ value: '', label: 'Sem Emissor', id: 0 });
api.get('responsavel/emissor').then(resp => {
  Object.entries(resp).forEach(entry => {
    const [key, value] = entry;
    optionsEmissor.push({ value: (key, value.nome), label: (key, value.nome), id: (key, value._id) });
  });
});

var optionsOrdenador = [];
optionsOrdenador.push({ value: '', label: 'Sem Ordenador', id: 0 });
api.get('responsavel/ordenador').then(resp => {
  Object.entries(resp).forEach(entry => {
    const [key, value] = entry;
    optionsOrdenador.push({ value: (key, value.nome), label: (key, value.nome), id: (key, value._id) });
  });
});

var optionsRatificador = [];
optionsRatificador.push({ value: '', label: 'Sem Ratificador', id: 0 });
api.get('responsavel/ratificador').then(resp => {
  Object.entries(resp).forEach(entry => {
    const [key, value] = entry;
    optionsRatificador.push({ value: (key, value.nome), label: (key, value.nome), id: (key, value._id) });
  });
});

var optionssecretaria = [];
optionssecretaria.push({ value:  '', label: 'Selecione a opção...', id: 0});
axios.get(urlapi + 'secretaria').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionssecretaria.push({ value: (key, value.nomesec), label: (key, value.nomesec ), id: (key, value._id )});
  });
});

export default class Create extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeNumndc = this.onChangeNumndc.bind(this);
    this.onChangeProcndc = this.onChangeProcndc.bind(this);
    this.onChangeDatandc = this.onChangeDatandc.bind(this);
    this.onChangeEvendc = this.onChangeEvendc.bind(this);
    this.onChangeSecret = this.onChangeSecret.bind(this); 
    this.onChangeUnigest = this.onChangeUnigest.bind(this);
    this.onChangeProgtrab = this.onChangeProgtrab.bind(this); 
    this.onChangeNatdesp = this.onChangeNatdesp.bind(this); 
    this.onChangeFontrec = this.onChangeFontrec.bind(this); 
    this.onChangeNomefav = this.onChangeNomefav.bind(this); 
    this.onChangeBai = this.onChangeBai.bind(this); 
    this.onChangeEnder = this.onChangeEnder.bind(this);
    this.onChangeCid = this.onChangeCid.bind(this); 
    this.onChangeCep = this.onChangeCep.bind(this); 
    this.onChangeUf = this.onChangeUf.bind(this); 
    this.onChangeCnpj = this.onChangeCnpj.bind(this); 
    this.onChangeValor = this.onChangeValor.bind(this); 
    this.onChangeExtenso = this.onChangeExtenso.bind(this);
    this.onChangeDescdesp = this.onChangeDescdesp.bind(this); 
    this.onChangeJan = this.onChangeJan.bind(this);  
    this.onChangeFev = this.onChangeFev.bind(this);  
    this.onChangeMar = this.onChangeMar.bind(this);  
    this.onChangeAbr = this.onChangeAbr.bind(this);  
    this.onChangeMai = this.onChangeMai.bind(this);  
    this.onChangeJun = this.onChangeJun.bind(this);  
    this.onChangeJul = this.onChangeJul.bind(this);  
    this.onChangeAgo = this.onChangeAgo.bind(this);  
    this.onChangeSet = this.onChangeSet.bind(this);  
    this.onChangeOut = this.onChangeOut.bind(this);  
    this.onChangeNov = this.onChangeNov.bind(this);  
    this.onChangeDez = this.onChangeDez.bind(this);  
    this.onChangeBaselegal = this.onChangeBaselegal.bind(this);  
    this.onChangeEmissor = this.onChangeEmissor.bind(this);  
    this.onChangeDeleemi = this.onChangeDeleemi.bind(this);  
    this.onChangeMatemi = this.onChangeMatemi.bind(this);  
    this.onChangeDataemi = this.onChangeDataemi.bind(this); 
    this.onChangeOrdenador = this.onChangeOrdenador.bind(this);  
    this.onChangeDeleord = this.onChangeDeleord.bind(this);  
    this.onChangeMatord = this.onChangeMatord.bind(this);  
    this.onChangeDataord = this.onChangeDataord.bind(this);  
    this.onChangeRatificador = this.onChangeRatificador.bind(this);  
    this.onChangeMatrat = this.onChangeMatrat.bind(this);  
    this.onChangeDelerat = this.onChangeDelerat.bind(this); 
    this.onChangeDatarat = this.onChangeDatarat.bind(this);  
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      copias : 1,
      anondc :  moment().format('YYYY'),
      numndc : '00000',
      procndc : 'SEI/001/000.00/0000',
      datandc : moment(new Date()).format("DD/MM/YYYY"),
      evendc  : optionstipoevento[0].label,
      secret: optionsfavorecido[0].label,
      unigest : optionsunidgestora[0].label,
      progtrab : optionsprogtrabalho[0].label,
      natdesp : optionsnaturezadespesa[0].label,
      fontrec : optionsfonterecurso[0].label,
      nomefav: optionsfavorecido[0].label,
      bai : '',
      ender : '',
      cid : '',
      cep : '',
      uf : '',
      cnpj : '',
      valor : '0,00',
      extenso : '',
      descdesp : '',
      jan : '0,00',
      fev : '0,00',
      mar : '0,00',
      abr : '0,00',
      mai : '0,00',
      jun : '0,00',
      jul : '0,00',
      ago : '0,00',
      set : '0,00',
      out : '0,00',
      nov : '0,00',
      dez : '0,00',
      baselegal : '',
      emissor : '',
      cargoemissor: '',
      deleemi : '',
      matemi : '',
      dataemi : '',
      ordenador : '',
      cargoordenador: '',
      deleord : '',
      matord : '',
      dataord : '',
      ratificador : '',
      cargoratificador: '',
      delerat : '',
      matrat : '',
      datarat : ''
    }

  }

  onChangeAnondc(e) {
    this.setState({
      anondc: e.target.value
    });
  }
  onChangeNumndc(e) {
    this.setState({
      numndc: e.target.value
    });
  }
  onChangeProcndc(e) {
    this.setState({
      procndc: e.target.value
    })  
  }
  onChangeDatandc(e) {
    this.setState({
      datandc: e.target.value
    })  
  }
  onChangeEvendc(e) { 
    this.setState({
      evendc: e.value
    })  
  }
  onChangeSecret(e) {
    // ta feio mas funciona
    if (e.value.length === 0){
        this.setState({
          secret: e.value
      });
    }
    else
    {
      // zera conta do favorecido
      let key = optionssecretaria.find(o => o.label === e.value).id;
      axios.get(urlapi+'secretaria/edit/'+key)
           .then(response => {
            this.setState({secret: response.data.nomesec})
      })
      .catch(function(error){
      });
    }
  }
  onChangeUnigest(e) {
    this.setState({
      unigest: e.value
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
  
  onChangeNomefav(e) {
    // ta feio mas funciona
    if (e.value.length === 0){
        this.setState({
          nomefav: e.value,
          bai : '',
          ender : '',
          cid : '',
          cep : '',
          uf : '',
          cnpj : '',
          banrec : '',
          agerec : '',
          ccrec : ''
      });
    }
    else
    {
      let key = optionsfavorecido.find(o => o.label === e.value).id;
      axios.get(urlapi + 'favorecido/edit/'+key)
          .then(response => {
            this.setState({
                nomefav: response.data.nomefav,
                bai : response.data.bai,
                ender : response.data.ender,
                cid : response.data.cid,
                cep : response.data.cep,
                uf : response.data.uf,
                cnpj : response.data.cnpj,
                banrec : response.data.banrec,
                agerec : response.data.agerec,
                ccrec : response.data.ccrec
            });
      })
    }  
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
  onChangeValor(e) {
    this.setState({
      valor: e.target.value
    })  
    this.setState({
      extenso: valorExtenso.porExtenso(e.target.value.toString().split(".").join("").split(",").join("."), valorExtenso.estilo.monetario)
    })  
  }
  onChangeExtenso(e) {
    this.setState({
      extenso: e.target.value
    })  
  }
  onChangeDescdesp(e) {
    this.setState({
       descdesp: e.target.value
    })  
  } 
  onChangeJan(e) {
    this.setState({
      jan: e.target.value
    })  
  }    
  onChangeFev(e) {
    this.setState({
      fev: e.target.value
    })  
  }
  onChangeMar(e) {
    this.setState({
      mar: e.target.value
    })  
  }
  onChangeMai(e) {
    this.setState({
      mai: e.target.value
    })  
  }
  onChangeAbr(e) {
    this.setState({
      abr: e.target.value
    })  
  }
  onChangeJul(e) {
    this.setState({
      jul: e.target.value
    })  
  }
  onChangeJun(e) {
    this.setState({
      jun: e.target.value
    })  
  }
  onChangeSet(e) {
    this.setState({
      set: e.target.value
    })  
  }
  onChangeAgo(e) {
    this.setState({
      ago: e.target.value
    })  
  }
  onChangeOut(e) {
    this.setState({
      out: e.target.value
    })  
  }
  onChangeNov(e) {
    this.setState({
      nov: e.target.value
    })  
  }
  onChangeDez(e) {
    this.setState({
      dez: e.target.value
    })  
  }
  onChangeBaselegal(e) {
    this.setState({
      baselegal: e.target.value
    })  
  }  

  onChangeEmissor(e) {
    if (e.value.length === 0){
      this.setState({
        emissor: '',
        cargoemissor: '',
        deleemi : '',
        matemi : ''
    });
    }
    else
    {
      let key = optionsEmissor.find(o => o.label === e.value).id;
      api.get('/responsavel/edit/'+key)
          .then(response => {
            this.setState({
                emissor: response.nome,
                cargoemissor:response.cargo,
                deleemi : response.delegacao,
                matemi : response.idfuncional
            });
      })

    }
  }

  onChangeDeleemi(e) {
    this.setState({
      deleemi: e.target.value
    })  
  }
  
  onChangeMatemi(e) {
    this.setState({
      matemi: e.target.value
    })  
  }

  onChangeDataemi(e) {
    this.setState({
      dataemi: e.target.value
    })  
  }

  onChangeOrdenador(e) {
    if (e.value.length === 0){
      this.setState({
        ordenador: '',
        cargoordenador: '',
        deleord : '',
        matord : ''
    });
    }
    else
    {
      let key = optionsOrdenador.find(o => o.label === e.value).id;
      api.get('/responsavel/edit/'+key)
          .then(response => {
            this.setState({
                ordenador: response.nome,
                cargoordenador:response.cargo,
                deleord : response.delegacao,
                matord : response.idfuncional
            });
      })

    }
  }

  onChangeMatord(e) {
    this.setState({
      matord: e.target.value
    })  
  }

  onChangeDeleord(e) {
    this.setState({
      deleord: e.target.value
    })  
  }

  onChangeDataord(e) {
    this.setState({
      dataord: e.target.value
    })  
  }

  onChangeRatificador(e) {
    if (e.value.length === 0){
      this.setState({
        ratificador: '',
        cargoratificador: '',
        delerat : '',
        matrat : ''
    });
    }
    else
    {
      let key = optionsRatificador.find(o => o.label === e.value).id;
      api.get('/responsavel/edit/'+key)
          .then(response => {
            this.setState({
                ratificador: response.nome,
                cargoratificador:response.cargo,
                delerat : response.delegacao,
                matrat : response.idfuncional
            });
      })

    }
  }

  onChangeMatrat(e) {
    this.setState({
      matrat: e.target.value
    })  
  }

  onChangeDelerat(e) {
    this.setState({
      delerat: e.target.value
    })  
  }

  onChangeDatarat(e) {
    this.setState({
      datarat: e.target.value
    })  
  }

  onSubmit(e) {
    e.preventDefault();

    const obj = {
      copias : this.state.copias,
      anondc : this.state.anondc,
      numndc : this.state.numndc,
      procndc : this.state.procndc,
      datandc : this.state.datandc,
      evendc  :  this.state.evendc,
      secret  : this.state.secret,
      unigest : this.state.unigest,
      progtrab : this.state.progtrab,
      natdesp : this.state.natdesp,
      fontrec : this.state.fontrec,
      nomefav : this.state.nomefav,
      bai : this.state.bai,
      ender : this.state.ender,
      cid : this.state.cid,
      cep : this.state.cep,
      uf : this.state.uf,
      cnpj : this.state.cnpj,
      valor : this.state.valor,
      extenso : this.state.extenso,
      descdesp : this.state.descdesp,
      jan : this.state.jan,
      fev : this.state.fev,
      mar : this.state.mar,
      abr : this.state.abr,
      mai : this.state.mai,
      jun : this.state.jun,
      jul : this.state.jul,
      ago : this.state.ago,
      set : this.state.set,
      out : this.state.out,
      nov : this.state.nov,
      dez : this.state.dez,
      baselegal : this.state.baselegal,
      emissor : this.state.emissor,
      cargoemissor : this.state.cargoemissor,
      deleemi : this.state.deleemi,
      matemi : this.state.matemi,
      dataemi : this.state.dataemi,
      ordenador : this.state.ordenador,
      cargoordenador : this.state.cargoordenador,
      deleord : this.state.deleord,
      matord : this.state.matord,
      dataord : this.state.dataord,
      ratificador : this.state.ratificador,
      cargoratificador : this.state.cargoratificador,
      delerat : this.state.delerat,
      matrat : this.state.matrat,
      datarat : this.state.datarat,
      login: window.login
    };

    api.post('ndc/add',obj)
    .then(res => {
      toast.success("Registro foi salvo com successo");
    })
    .catch(error => {
      toast.error("Ocorrou erro ao salvar o registro"+error);
    })

    this.props.history.push('/indexNdc');

  }
 
  render() {

    return (

      <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
           <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
                <h5>Inclusão de Nota de Descentralização de Crédito</h5>  
           </div>
           <div style={{ marginLeft:'5px', marginRight:'5px', marginTop:'5px' , border: '1px solid #ccc' }}>
                <form onSubmit={this.onSubmit} style={{ marginLeft:'15px', marginRight:'15px', marginTop:'15px'}}>

                <div className="form-row">
                         <div className="col-sm-1">
                            <label>Exercicio</label>  
                            <input type="text" id="anondc" className="form-control form-control-sm" value={this.state.anondc} onChange={this.onChangeAnondc}/>
                         </div>
                         <div className="col-sm-2">
                             <label>NDC</label>  
                             <input type="text" id="numndc" className="form-control form-control-sm" value={this.state.numndc} onChange={this.onChangeNumndc}/>
                         </div>
                         <div className="col-sm-5">
                             <label>Processo</label>  
                             <input type="text" id="procndc" className="form-control form-control-sm" value={this.state.procndc} onChange={this.onChangeProcndc}/>
                         </div>
                         <div className="col-sm-2">
                             <label>Data</label>  
                             <InputMask mask='99/99/9999' slotChar='mm/dd/yyyy' type="text" id="datandc" className="form-control form-control-sm" value={this.state.datandc} onChange={this.onChangeDatandc}/>
                        </div>
                    </div>
   
                    <div className="form-row">
                      <div className="col-sm-4">
                        <label>Secretaria</label>  
                        <SelectInput id="secret" className="sm" options={optionssecretaria} onChange={this.onChangeSecret} selectedValue={this.state.secret}/>
                      </div>
                      <div className="col-sm-4">
                        <label>Unidade Gestora</label>  
                        <SelectInput id="unigest" className="sm" options={optionsunidgestora} onChange={this.onChangeUnigest} selectedValue={this.state.unigest}/>
                      </div>
                      <div className="col-sm-4">
                        <label>Evento da ndc</label>  
                        <SelectInput id="evendc" className="sm" options={optionstipoevento} onChange={this.onChangeEvendc} selectedValue={this.state.evendc}/>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-sm-4">
                        <label>Programa de Trabalho</label>  
                        <SelectInput id="progtrab" className="sm" options={optionsprogtrabalho} onChange={this.onChangeProgtrab} selectedValue={this.state.progtrab}/>
                      </div>
                      <div className="col-sm-4">
                        <label>Natureza de Despesa</label> 
                        <SelectInput id="natdesp" className="sm" options={optionsnaturezadespesa} onChange={this.onChangeNatdesp} selectedValue={this.state.natdesp}/> 
                      </div>
                      <div className="col-sm-4">
                        <label>Fonte de Recurso</label>  
                        <SelectInput id="fontrec" className="sm" options={optionsfonterecurso} onChange={this.onChangeFontrec} selectedValue={this.state.fontrec}/>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-sm-12">
                        <label>Nome do Favorecido:</label>  
                        <SelectInput id="nomefav" className="sm" options={optionsfavorecido} onChange={this.onChangeNomefav} selectedValue={this.state.nomefav}/>
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
                      <div className="col-sm-2">
                        <label>Cnpj/Cpf:</label>  
                        <input id="cnpj" name="cnpj" className="form-control form-control-sm" required="" type="text" value={this.state.cnpj} onChange={this.onChangeCnpj}/>
                      </div>
                      <div className="col-sm-2" style={{ textAlign: 'right' }}>
                        <label>Valor</label>  
                        <CurrencyInput placeholder="0,00" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.state.valor} onChange={this.onChangeValor}/>
                      </div>
                      <div className="col-sm-8">
                        <label>Extenso</label>  
                        <input id="extenso" name="estenso" className="form-control form-control-sm" required="" type="text" value={this.state.extenso} onChange={this.onChangeExtenso}/>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-sm-12">
                        <label>Descrição da Despesa</label>  
                        <textarea id="descdesp" name="descdesp" rows = "5" className="form-control form-control-sm" required="" type="text" value={this.state.descdesp} onChange={this.onChangeDescdesp}/>
                      </div>
                    </div>

                    <div className="form-row" style={{ textAlign: 'right' }}>
                      <div className="col-sm-2">
                        <label>Janeiro</label>  
                        <CurrencyInput placeholder="0,00" id="jan" name="jan" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.state.jan} onChange={this.onChangeJan}/>
                      </div>
                      <div className="col-sm-2">
                        <label>Fevereiro</label>  
                        <CurrencyInput placeholder="0,00" id="fev" name="fev" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.state.fev} onChange={this.onChangeFev}/>
                      </div>
                      <div className="col-sm-2">
                        <label>Março</label>  
                        <CurrencyInput placeholder="0,00" id="mar" name="mar" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.state.mar} onChange={this.onChangeMar}/>
                      </div>
                      <div className="col-sm-2">
                        <label>Abril</label>  
                        <CurrencyInput placeholder="0,00" id="abr" name="abr" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.state.abr} onChange={this.onChangeAbr}/>
                      </div>
                      <div className="col-sm-2">
                        <label>Maio</label>  
                        <CurrencyInput placeholder="0,00" id="mai" name="mai" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.state.mai} onChange={this.onChangeMai}/>
                      </div>
                      <div className="col-sm-2">
                        <label>Junho</label>  
                        <CurrencyInput placeholder="0,00" id="jun" name="jun" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.state.jun} onChange={this.onChangeJun}/>
                      </div>
                    </div>

                    <div className="form-row" style={{ textAlign: 'right' }}>
                      <div className="col-sm-2">
                        <label>Julho</label>  
                        <CurrencyInput placeholder="0,00" id="jul" name="jul" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.state.jul} onChange={this.onChangeJul}/>
                      </div>
                      <div className="col-sm-2">
                        <label>Agosto</label>  
                        <CurrencyInput placeholder="0,00" id="ago" name="ago" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.state.ago} onChange={this.onChangeAgo}/>
                      </div>
                      <div className="col-sm-2">
                        <label>Setembro</label>  
                        <CurrencyInput placeholder="0,00" id="set" name="set" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.state.set} onChange={this.onChangeSet}/>
                      </div>
                      <div className="col-sm-2">
                        <label>Outubro</label>  
                        <CurrencyInput placeholder="0,00" id="out" name="out" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.state.out} onChange={this.onChangeOut}/>
                      </div>
                      <div className="col-sm-2">
                        <label>Novembro</label>  
                        <CurrencyInput placeholder="0,00" id="nov" name="nov" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.state.nov} onChange={this.onChangeNov}/>
                      </div>
                      <div className="col-sm-2">
                        <label>Dezembro</label>  
                        <CurrencyInput placeholder="0,00" id="dez" name="dez" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.state.dez} onChange={this.onChangeDez}/>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-sm-12">
                        <label>Base Legal</label>  
                        <input id="baselegal" name="baselegal" className="form-control form-control-sm" required="" type="text" value={this.state.baselegal} onChange={this.onChangeBaselegal}/>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-sm-6">
                        <label>Emissor</label>  
                        <SelectInput id="emissor" className="sm" options={optionsEmissor} onChange={this.onChangeEmissor} selectedValue={this.state.emissor}/>
                      </div>
                      <div className="col-sm-2">
                        <label>Ato de Delegação</label>  
                        <input id="deleemi" name="deleemi" className="form-control form-control-sm" required="" type="text" value={this.state.deleemi} onChange={this.onChangeDeleemi}/>
                      </div>
                      <div className="col-sm-2">
                        <label>Matricula</label>  
                        <input id="matemi" name="matemi" className="form-control form-control-sm" required="" type="text" value={this.state.matemi} onChange={this.onChangeMatemi}/>
                      </div>
                      <div className="col-sm-2">
                        <label>Data</label>  
                        <InputMask mask='99/99/9999' slotChar='mm/dd/yyyy' type="text" id="dataemi" className="form-control form-control-sm" value={this.state.dataemi} onChange={this.onChangeDataemi}/>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-sm-6">
                        <label>Ordenador</label>  
                        <SelectInput id="ordenador" className="sm" options={optionsOrdenador} onChange={this.onChangeOrdenador} selectedValue={this.state.ordenador}/>
                      </div>
                      <div className="col-sm-2">
                        <label>Ato de Delegação</label>  
                        <input id="deleord" name="deleord" className="form-control form-control-sm" required="" type="text" value={this.state.deleord} onChange={this.onChangeDeleord}/>
                      </div>
                      <div className="col-sm-2">
                        <label>Matricula</label>  
                        <input id="matord" name="matord" className="form-control form-control-sm" required="" type="text" value={this.state.matord} onChange={this.onChangeMatord}/>
                      </div>
                      <div className="col-sm-2">
                        <label>Data</label>  
                        <InputMask mask='99/99/9999' slotChar='mm/dd/yyyy' type="text" id="dataord" className="form-control form-control-sm" value={this.state.dataord} onChange={this.onChangeDataord}/>
                      </div>
                    </div>
                  
                    <div className="form-row">
                        <div className="col-sm-6">
                          <label>Ratificador</label>  
                          <SelectInput id="ratificador" className="sm" options={optionsRatificador} onChange={this.onChangeRatificador} selectedValue={this.state.ratificador}/>
                        </div>
                        <div className="col-sm-2">
                          <label>Ato de Delegação</label>  
                          <input id="delerat" name="delerat" className="form-control form-control-sm" required="" type="text" value={this.state.delerat} onChange={this.onChangeDelerat}/>
                        </div>
                        <div className="col-sm-2">
                          <label>Matricula</label>  
                          <input id="matrat" name="matrat" className="form-control form-control-sm" required="" type="text" value={this.state.matrat} onChange={this.onChangeMatrat}/>
                        </div>
                        <div className="col-sm-2">
                          <label>Data</label>  
                          <InputMask mask='99/99/9999' slotChar='mm/dd/yyyy' type="text" id="datarat" className="form-control form-control-sm" value={this.state.datarat} onChange={this.onChangeDatarat}/>
                        </div>
                    </div>
                    <br></br>
                    <div className="form-row">
                        <ToastContainer />
                        <div className="col-sm-1">
                            <input type="submit" value="Salvar" className="btn btn-sm btn btn-primary"/>
                            &nbsp;&nbsp;
                            <Link to={'/indexNdc'} className="btn btn-sm btn-success">Cancelar</Link>
                        </div>
                    </div>
                    <br></br>
              </form>
          </div>
      </div>
      )
  }
}

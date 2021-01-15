import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CurrencyInput from '../../components/CurrencyInput';
import InputMask from 'react-input-mask';

import api from "../../services/api";
import urlapi from "../../services/urlapi"

import SelectInput from '../../components/SelectInput';

const valorExtenso = require('numero-por-extenso');

let optionsSimNao = [];
optionsSimNao.push({ value: 'Não', label: 'Não',id:0});
optionsSimNao.push({ value: 'Sim', label: 'Sim',id:1});

let optionstipoevento = [];
optionstipoevento.push({ value: 'Selecione a opção...', label: 'Selecione a opção...' });
axios.get(urlapi+'tablecode/eventonad').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
     optionstipoevento.push({ value: (key, value.descricao), label: (key, value.descricao )});
  });
});

let optionsgrupodespesa = [];
optionsgrupodespesa.push({ value: 'Selecione a opção...', label: 'Selecione a opção...' });
axios.get(urlapi + 'tablecode/grupodespesa').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionsgrupodespesa.push({ value: (key, value.descricao), label: (key, value.descricao )});
  });
});

let optionsunidgestora = [];
optionsunidgestora.push({ value: 'Selecione a opção...', label: 'Selecione a opção...' });
axios.get(urlapi + 'tablecode/unidgestora').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionsunidgestora.push({ value: (key, value.descricao), label: (key, value.descricao )});
  });
});

let optionsunidorcamentaria = [];
optionsunidorcamentaria.push({ value: 'Selecione a opção...', label: 'Selecione a opção...' });
axios.get(urlapi + 'tablecode/unidorcamentaria').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionsunidorcamentaria.push({ value: (key, value.descricao), label: (key, value.descricao )});
  });
});

let optionsprogtrabalho = [];
optionsprogtrabalho.push({ value: 'Selecione a opção...', label: 'Selecione a opção...' });
axios.get(urlapi + 'tablecode/progtrabalho').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionsprogtrabalho.push({ value: (key, value.descricao), label: (key, value.descricao )});
  });
});

let optionsnaturezadespesa = [];
optionsnaturezadespesa.push({ value: 'Selecione a opção...', label: 'Selecione a opção...' });
axios.get(urlapi + 'tablecode/naturezadespesa').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionsnaturezadespesa.push({ value: (key, value.descricao), label: (key, value.descricao )});
  });
});

let optionsfonterecurso = [];
optionsfonterecurso.push({ value: 'Selecione a opção...', label: 'Selecione a opção...' });
axios.get(urlapi + 'tablecode/fonterecurso').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionsfonterecurso.push({ value: (key, value.descricao), label: (key, value.descricao )});
  });
});

let optionstipocredito = [];
optionstipocredito.push({ value: 'Selecione a opção...', label: 'Selecione a opção...' });
axios.get(urlapi + 'tablecode/tipocredito').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionstipocredito.push({ value: (key, value.descricao), label: (key, value.descricao )});
  });
});

let optionstipoempenho = [];
optionstipoempenho.push({ value: 'Selecione a opção...', label: 'Selecione a opção...' });
axios.get(urlapi + 'tablecode/tipoempenho').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionstipoempenho.push({ value: (key, value.descricao), label: (key, value.descricao )});
  });
});

let optionstipolicitacao = [];
optionstipolicitacao.push({ value: 'Selecione a opção...', label: 'Selecione a opção...' });
axios.get(urlapi + 'tablecode/tipolicitacao').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionstipolicitacao.push({ value: (key, value.descricao), label: (key, value.descricao )});
  });
});

let optionsEmissor = [];
optionsEmissor.push({ value: '', label: 'Sem Emissor', id: 99});
api.get('responsavel/emissor').then(resp => {
  Object.entries(resp).forEach(entry => {
    const [key, value] = entry;
    optionsEmissor.push({ value: (key, value.nome), label: (key, value.nome ), id: (key, value._id )});
  });
});

let optionsOrdenador = [];
optionsOrdenador.push({ value: '', label: 'Sem ordenador', id: 99});
api.get('responsavel/ordenador').then(resp => {
  Object.entries(resp).forEach(entry => {
    const [key, value] = entry;
    optionsOrdenador.push({ value: (key, value.nome), label: (key, value.nome ), id: (key, value._id ) });
  });
});

let optionsRatificador = [];
optionsRatificador.push({ value: '', label: 'Sem Ratificador', id: 99});
api.get('responsavel/ratificador').then(resp => {
  Object.entries(resp).forEach(entry => {
    const [key, value] = entry;
    optionsRatificador.push({ value: (key, value.nome), label: (key, value.nome ), id: (key, value._id ) });
  });
});

let optionsfavorecido = [];
optionsfavorecido.push({ value: 'Selecione a opção...', label: 'Selecione a opção...' , id: 0 });
axios.get(urlapi + 'favorecido').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionsfavorecido.push({ value: (key, value.nomefav), label: (key, value.nomefav ), id: (key, value._id )});
  });
});

let optionsCCReceber=[];
    
let optionssecretaria=[];
optionssecretaria.push({ value: 'Selecione a opção...', label: 'Selecione a opção...', id: 0 });
axios.get(urlapi + 'secretaria').then(resp => {
  Object.entries(resp.data).forEach(entry => {
    const [key, value] = entry;
    optionssecretaria.push({ value: (key, value.nomesec), label: (key, value.nomesec ), id: (key, value._id )});
  });
});
let optionsCCPagar = [];

export default class Edit extends Component {

  constructor(props) {
    super(props);
    
    this.onChangeCopias = this.onChangeCopias.bind(this);
    this.onChangeAnonad = this.onChangeAnonad.bind(this);
    this.onChangeNumnad = this.onChangeNumnad.bind(this);
    this.onChangeProcnad = this.onChangeProcnad.bind(this);
    this.onChangeDatanad = this.onChangeDatanad.bind(this);
    this.onChangeEvenad = this.onChangeEvenad.bind(this);
    this.onChangeCatgast = this.onChangeCatgast.bind(this); 
    this.onChangeAdant = this.onChangeAdant.bind(this);  
    this.onChangeSecret = this.onChangeSecret.bind(this); 
    this.onChangeUnigest = this.onChangeUnigest.bind(this);
    this.onChangeUniorc = this.onChangeUniorc.bind(this); 
    this.onChangeProgtrab = this.onChangeProgtrab.bind(this); 
    this.onChangeNatdesp = this.onChangeNatdesp.bind(this); 
    this.onChangeFontrec = this.onChangeFontrec.bind(this); 
    this.onChangeTipcre = this.onChangeTipcre.bind(this); 
    this.onChangeBanpag = this.onChangeBanpag.bind(this); 
    this.onChangeAgepag = this.onChangeAgepag.bind(this); 
    this.onChangeCcpag = this.onChangeCcpag.bind(this); 

    this.onChangeContapag = this.onChangeContapag.bind(this); 

    this.onChangeNomefav = this.onChangeNomefav.bind(this); 
    this.onChangeBai = this.onChangeBai.bind(this); 
    this.onChangeEnder = this.onChangeEnder.bind(this);
    this.onChangeCid = this.onChangeCid.bind(this); 
    this.onChangeCep = this.onChangeCep.bind(this); 
    this.onChangeUf = this.onChangeUf.bind(this); 
    this.onChangeCnpj = this.onChangeCnpj.bind(this); 
    this.onChangeAgerec = this.onChangeAgerec.bind(this); 
    this.onChangeBanrec = this.onChangeBanrec.bind(this); 
    this.onChangeCcrec = this.onChangeCcrec.bind(this); 

    this.onChangeContarec = this.onChangeContarec.bind(this); 

    this.onChangeValor = this.onChangeValor.bind(this); 
    this.onChangeTipemp = this.onChangeTipemp.bind(this);
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
    this.onChangeTiplic = this.onChangeTiplic.bind(this);  
    this.onChangeDataabert = this.onChangeDataabert.bind(this);  
    this.onChangeNumerolic = this.onChangeNumerolic.bind(this);  
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
      copias: 1 ,
      anonad : '',
      numnad : '',
      procnad : '',
      datanad : '',
      evenad  : '',
      catgast  : '',
      adant  : '',
      secret  : '',
      unigest : '',
      uniorc  : '',
      progtrab : '',
      natdesp : '',
      fontrec : '',
      tipcre : '',
      banpag : '',
      agepag : '',
      ccpag : '',

      contapag : '',

      nomefav : '',
      bai : '',
      ender : '',
      cid : '',
      cep : '',
      uf : '',
      cnpj : '',

      contarec: '',

      agerec : '',
      banrec : '',
      ccrec : '',
      valor : '',
      tipemp : '',
      extenso : '',
      descdesp : '',
      jan : '',
      fev : '',
      mar : '',
      abr : '',
      mai : '',
      jun : '',
      jul : '',
      ago : '',
      set : '',
      out : '',
      nov : '',
      dez : '',
      tiplic : '',
      dataabert : '',
      numerolic : '',
      baselegal : '',
      emissor : '',
      cargoemissor : '',
      deleemi : '',
      matemi : '',
      dataemi : '',
      ordenador : '',
      cargoordenador : '',
      deleord : '',
      matord : '',
      dataord : '',
      ratificador : '',
      cargoratificador : '',
      delerat : '',
      matrat : '',
      datarat : '',
      ccPagarList: [],
      ccReceberList: []

    }

  }
 
  componentDidMount() {
    api.get('nad/edit/'+this.props.match.params.id)
        .then(response => {
          this.setState({ 
              anonad : response.anonad,
              numnad : '00000',
              procnad : response.procnad,
              datanad : response.datanad,
              evenad  :  response.evenad,
              catgast : response.catgast ,
              adant  : response.adant ,
              secret  : response.secret,
              unigest : response.unigest,
              uniorc  : response.uniorc,
              progtrab : response.progtrab,
              natdesp : response.natdesp,
              fontrec : response.fontrec,
              tipcre : response.tipcre,
              banpag : response.banpag,
              agepag : response.agepag,
              ccpag : response.ccpag,

              contapag : response.contapag,

              nomefav : response.nomefav,
              bai : response.bai,
              ender : response.ender,
              cid : response.cid,
              cep : response.cep,
              uf : response.uf,
              cnpj : response.cnpj,
              banrec : response.banrec,
              agerec : response.agerec,
              ccrec : response.ccrec,

              contarec : response.contarec,

              valor : response.valor,
              tipemp : response.tipemp,
              extenso : response.extenso,
              descdesp : response.descdesp,
              jan : response.jan,
              fev : response.fev,
              mar : response.mar,
              abr : response.abr,
              mai : response.mai,
              jun : response.jun,
              jul : response.jul,
              ago : response.ago,
              set : response.set,
              out : response.out,
              nov : response.nov,
              dez : response.dez,
              tiplic : response.tiplic,
              dataabert : response.dataabert,
              numerolic : response.numerolic,
              baselegal : response.baselegal,
              emissor : response.emissor,
              cargoemissor : response.cargoemissor,
              deleemi : response.deleemi,
              matemi : response.matemi,
              dataemi : response.dataemi,
              ordenador : response.ordenador,
              cargoordenador : response.cargoordenador,
              deleord : response.deleord,
              matord : response.matord,
              dataord : response.dataord,
              ratificador : response.ratificador,
              cargoratificador : response.cargoratificador,
              delerat : response.delerat,
              matrat : response.matrat,
              datarat : response.datarat,
              ccPagarList: [],
              ccReceberList: []
          });

          // verifica os registros nos vetores de dados 
          //this.setState({optionstipoevento:this.CheckElenteArray('eventonad',response.evenad,this.state.optionstipoevento)});
          //this.setState({optionstipoevento:this.CheckElenteArray(response.evenad,this.state.optionstipoevento)});

          optionstipoevento=this.CheckElenteArray(response.evenad,optionstipoevento);
          optionsgrupodespesa=this.CheckElenteArray(response.catgast,optionsgrupodespesa);
          optionsunidgestora=this.CheckElenteArray(response.unigest,optionsunidgestora);
          optionsunidorcamentaria=this.CheckElenteArray(response.uniorc,optionsunidorcamentaria);
          optionsprogtrabalho=this.CheckElenteArray(response.progtrab, optionsprogtrabalho);
          optionsnaturezadespesa=this.CheckElenteArray(response.natdesp,optionsnaturezadespesa);

          optionsfonterecurso=this.CheckElenteArray(response.fontrec,optionsfonterecurso);

          optionstipocredito=this.CheckElenteArray(response.tipcre,optionstipocredito);
          optionstipoempenho=this.CheckElenteArray(response.tipemp,optionstipoempenho);
          optionstipolicitacao=this.CheckElenteArray(response.tiplic,optionstipolicitacao);
          
          optionsEmissor=this.CheckElenteArray(response.emissor,optionsEmissor);
          optionsOrdenador=this.CheckElenteArray(response.ordenador,optionsOrdenador);
          optionsRatificador=this.CheckElenteArray(response.ratificador,optionsRatificador);
          
          var key = 0
          // pega a conta da secretaria
          if (response.secret) {
              optionsCCPagar=[];
              optionsCCPagar.push({ value: 'Selecione a opção...', label: 'Selecione a opção...', id: 0 });
              key = 0
              for (let i = 0; i < optionssecretaria.length; i = i + 1 ) {
                  if (optionssecretaria[i].label === response.secret ){
                    key = optionssecretaria[i].id;break;
                  }
              }
              if (key===0) {
                optionssecretaria.push({ value: '', label: '-------------------------------', id: 98 });
                optionssecretaria.push({ value: response.secret, label: response.secret, id: 99 });
                optionsCCPagar.push({ value: response.contapag, label: response.contapag, id: 99 });
                this.setState({ccPagarList : [{ referente: 'Selecione a opção...', banco: '', agencia: '', conta: '', _id: 0} ,{ referente: response.contapag, banco: response.banpag, agencia: response.agepag, conta: response.ccpag, _id: 99}]});
              }
              if (key!== 0) {
                    axios.get(urlapi+'secretaria/edit/'+key)
                    .then(res => {
                      if (typeof res.data.contas !== 'undefined' && res.data.contas.length !== 0 ) {
                          Object.entries(res.data.contas).forEach(entry => {
                          const [key, value] = entry;
                          optionsCCPagar.push({ value: (key, value.referente+'-'+value.banco+'-'+value.agencia+'-'+value.conta), label: (key, value.referente+'-'+value.banco+'-'+value.agencia+'-'+value.conta ), id: (key, value._id )});
                        });
                        this.setState({contapag : response.contapag, ccPagarList: res.data.contas})
                      }
                      else {
                        optionsCCPagar.push({ value: response.contapag, label: response.contapag, id: 99 });
                        this.setState({ccPagarList : [{ referente: 'Selecione a opção...', banco: '', agencia: '', conta: '', _id: 0} ,{ referente: response.contapag, banco: response.banpag, agencia: response.agepag, conta: response.ccpag, _id: 99}]});
                              }
                    })
              }
          }
          // pega a conta do favorecido
          if (response.nomefav) {
              optionsCCReceber=[];
              optionsCCReceber.push({ value: 'Selecione a opção...', label: 'Selecione a opção...', id: 0 });
              key = 0
              for (let i = 0; i < optionsfavorecido.length; i = i + 1 ) {
                  if (optionsfavorecido[i].label === response.nomefav ){
                     key = optionsfavorecido[i].id;break;
                  }
              }
              if (key===0) {
                optionsfavorecido.push({ value: '', label: '-------------------------------', id: 98 });
                optionsfavorecido.push({ value: response.nomefav, label: response.nomefav, id: 99 });
                optionsCCReceber.push({ value: response.contarec, label: response.contarec, id: 99 });
                this.setState({ccReceberList : [{ referente: 'Selecione a opção...', banco: '', agencia: '', conta: '', _id: 0} ,{ referente: response.contarec, banco: response.banrec, agencia: response.agerec, conta: response.ccrec, _id: 99}]});
              }
              if (key!== 0) {
                    axios.get(urlapi+'favorecido/edit/'+key)
                    .then(res => {
                       if (typeof res.data.contas !== 'undefined' && res.data.contas.length !== 0 ) {
                          Object.entries(res.data.contas).forEach(entry => {
                           const [key, value] = entry;
                           optionsCCReceber.push({ value: (key, value.referente+'-'+value.banco+'-'+value.agencia+'-'+value.conta), label: (key, value.referente+'-'+value.banco+'-'+value.agencia+'-'+value.conta ), id: (key, value._id )});
                         });
                         this.setState({contarec : response.contarec, ccReceberList: res.data.contas})
                       }
                       else {
                          optionsCCReceber.push({ value: response.contarec, label: response.contarec, id: 99});
                          this.setState({ccReceberList : [{ referente: 'Selecione a opção...', banco: '', agencia: '', conta: '', _id: 0} ,{ referente: response.contarec, banco: response.banrec, agencia: response.agerec, conta: response.ccrec, _id: 99}]});
                       }
                    })
              }
          }
        })
        .catch(error => {
          toast.error("Tivemos problemas no servidor de Dados...");
          this.props.history.push('/indexNad');
        })

  }

  CheckElenteArray (fieldName, arrayList) {
      var key 
      try {
          key = arrayList.find(o => o.label === fieldName).label;  
          key = 99;
      } catch (err) {
          arrayList.push({ value: fieldName, label: fieldName , id: key });
      }
      return arrayList;
  }

  onChangeCopias (e) {
      this.setState({
        copias: e.target.value
      });
  }
  onChangeAnonad (e) {
    this.setState({
      anonad: e.target.value
    });
  }
  onChangeNumnad(e) {
    this.setState({
      numnad: e.target.value
    });
  }
  onChangeProcnad(e) {
    this.setState({
      procnad: e.target.value
    })  
  }
  onChangeDatanad(e) {
    this.setState({
      datanad: e.target.value
    })  
  }

  onChangeEvenad(e) {
    this.setState({
        evenad: e.value
    })
  }

  onChangeCatgast(e)  {
    this.setState({
      catgast: e.value
    })  
  }

  onChangeAdant(e) {
    this.setState({
      adant: e.value
    })  
  }

  onChangeSecret(e) {
      // zera conta do pagadora
      if (this.state.secret !== e.value){
        this.setState({secret:e.value,banpag:'',agepag:'',ccpag:'',contapag:''});
        optionsCCPagar=[];
        optionsCCPagar.push({ value: '', label: 'Selecione a opção...', id: 0 });
        let key = optionssecretaria.find(o => o.label === e.value).id;
        axios.get(urlapi+'secretaria/edit/'+key)
            .then(response => {
              if (typeof response.data === 'object') {
                  this.setState({secret: response.data.nomesec})
                  // dados bancarios 
                  if (typeof response.data.contas !== 'undefined' && response.data.contas.length !== 0 ) {
                      Object.entries(response.data.contas).forEach(entry => {
                        const [key, value] = entry;
                        optionsCCPagar.push({ value: (key, value.referente+'-'+value.banco+'-'+value.agencia+'-'+value.conta), label: (key, value.referente+'-'+value.banco+'-'+value.agencia+'-'+value.conta ), id: (key, value._id )});
                      });
                      this.setState({
                        ccPagarList: response.data.contas,
                        contapag: response.data.contas[0].referente+'-'+response.data.contas[0].banco+'-'+response.data.contas[0].agencia+'-'+response.data.contas[0].conta,
                        banpag: response.data.contas[0].banco,
                        agepag: response.data.contas[0].agencia, 
                        ccpag: response.data.contas[0].conta
                      });
                  }
              }
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
  onChangeTipcre(e) {
    this.setState({
      tipcre: e.value
    })  
  }
  onChangeBanpag(e) {
    this.setState({
      banpag: e.target.value
    })  
  }
  onChangeAgepag(e) {
    this.setState({
      agepag: e.target.value
    })  
  }
  onChangeCcpag(e) {
    this.setState({
      ccpag: e.target.value
    })  
  }
  onChangeContapag(e) {
    this.setState({ banpag: '', agepag: '', ccpag: '', contapag: e.value })
    if (optionsCCPagar.length > 1) {
      let keyrec = optionsCCPagar.find(o => o.label === e.value).id;
      let ctarec = this.state.ccPagarList.find(o => o._id === keyrec);
      this.setState({
          banpag: ctarec.banco, 
          agepag: ctarec.agencia, 
          ccpag: ctarec.conta
      })
    }
  }
  onChangeContarec(e) {
      this.setState({ banrec: '', agerec: '', ccrec: '', contarec: e.value })
      if (optionsCCReceber.length > 1) {
        let keyrec = optionsCCReceber.find(o => o.label === e.value).id;
        let ctarec = this.state.ccReceberList.find(o => o._id === keyrec);
        this.setState({
            banrec: ctarec.banco, 
            agerec: ctarec.agencia, 
            ccrec: ctarec.conta
        })
      }
  }
  onChangeNomefav(e) {
      // zera conta do recebedora
      if (this.state.nomefav !== e.value){
          this.setState({nomefav:e.value,bai:'',ender:'',cid:'',cep:'',uf:'',cnpj:'',banrec:'',agerec:'',ccrec:'',contarec:''});
          optionsCCReceber=[];
          optionsCCReceber.push({ value: '', label: 'Selecione a opção...', id: 0 });
          let key = optionsfavorecido.find(o => o.label === e.value).id;
          axios.get(urlapi+'favorecido/edit/'+key)
            .then(response => {
            // dados do fornecedor
            if (typeof response.data === 'object') {
                this.setState({
                    nomefav: response.data.nomefav,
                    bai : response.data.bai,
                    ender : response.data.ender,
                    cid : response.data.cid,
                    cep : response.data.cep,
                    uf : response.data.uf,
                    cnpj : response.data.cnpj
                });
                // dados bancarios fornecedor
                if (typeof response.data.contas !== 'undefined' && response.data.contas.length !== 0 ) {
                    this.setState({ccReceberList: response.data.contas});
                    Object.entries(response.data.contas).forEach(entry => {
                      const [key, value] = entry;
                      optionsCCReceber.push({ value: (key, value.referente+'-'+value.banco+'-'+value.agencia+'-'+value.conta), label: (key, value.referente+'-'+value.banco+'-'+value.agencia+'-'+value.conta ), id: (key, value._id )});
                    });
                    this.setState({
                        ccReceberList: response.data.contas,
                        contarec: response.data.contas[0].referente+'-'+response.data.contas[0].banco+'-'+response.data.contas[0].agencia+'-'+response.data.contas[0].conta,
                        banrec: response.data.contas[0].banco,
                        agerec: response.data.contas[0].agencia, 
                        ccrec: response.data.contas[0].conta
                    });
                }
            }
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
  onChangeAgerec(e) {
    this.setState({
      agerec: e.target.value
    })  
  }
  onChangeBanrec(e) {
    this.setState({
      banrec: e.target.value
    })  
  }
  onChangeCcrec(e) {
    this.setState({
      ccrec: e.target.value
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
  onChangeTipemp(e) {
    this.setState({
      tipemp: e.value
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

  onChangeTiplic(e) {
    this.setState({
      tiplic: e.value
    })  
  }

  onChangeOut(e) {
    this.setState({
      out: e.target.value
    })  
  }

  onChangeDataabert(e) {
    this.setState({
      dataabert: e.target.value
    })  
  }

  onChangeNumerolic(e) {
    this.setState({
      numerolic: e.target.value
    })  
  }

  onChangeBaselegal(e) {
    this.setState({
      baselegal: e.target.value
    })  
  }
  onChangeEmissor(e) {
    if (this.state.emissor !== e.value){
        this.setState({
            emissor : e.value,
            cargoemissor :'',
            deleemi :'',
            matemi :'',
        });
        let key = optionsEmissor.find(o => o.value === e.value).id;
        api.get('/responsavel/edit/'+key)
          .then(response => {
          if (typeof response === 'object') {
              this.setState({
                cargoemissor:response.cargo,
                deleemi : response.delegacao,
                matemi : response.idfuncional
              });
           }
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
    if (this.state.ordenador !== e.value){
        this.setState({
            ordenador: e.value,
            cargoordenador: ' ',
            deleord : '',
            matord : ''
        });
        let key = optionsOrdenador.find(o => o.value === e.value).id;
        api.get('/responsavel/edit/'+key)
          .then(response => {
          if (typeof response === 'object') {
              this.setState({
                cargoordenador:response.cargo,
                deleord : response.delegacao,
                matord : response.idfuncional
              });
          }
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
    if (this.state.ratificador !== e.value){
        this.setState({
            ratificador : e.value,
            cargoratificador: '',
            delerat : '',
            matrat : ''
        });
        let key = optionsRatificador.find(o => o.value === e.value).id;
        api.get('/responsavel/edit/'+key)
           .then(response => {
           if (typeof response === 'object') {
               this.setState({
                 cargoratificador:response.cargo,
                 delerat : response.delegacao,
                 matrat : response.idfuncional
               });
           }
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
      anonad : this.state.anonad,
      numnad : this.state.numnad,
      procnad : this.state.procnad,
      datanad : this.state.datanad,
      evenad  : this.state.evenad,
      catgast : this.state.catgast ,
      adant  : this.state.adant ,
      secret  : this.state.secret,
      unigest : this.state.unigest,
      uniorc  : this.state.uniorc,
      progtrab : this.state.progtrab,
      natdesp : this.state.natdesp,
      fontrec : this.state.fontrec,
      tipcre : this.state.tipcre,
      banpag : this.state.banpag,
      agepag : this.state.agepag,
      ccpag : this.state.ccpag,
      contapag : this.state.contapag,
      nomefav : this.state.nomefav,
      bai : this.state.bai,
      ender : this.state.ender,
      cid : this.state.cid,
      cep : this.state.cep,
      uf : this.state.uf,
      cnpj : this.state.cnpj,
      banrec : this.state.banrec,
      agerec : this.state.agerec,
      ccrec : this.state.ccrec,
      contarec : this.state.contarec,
      valor : this.state.valor,
      tipemp : this.state.tipemp,
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
      tiplic : this.state.tiplic,
      dataabert : this.state.dataabert,
      numerolic : this.state.numerolic,
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
      datarat : this.state.datarat 
    };

    for (let index = 0; index < this.state.copias; index++) {

        api.post(urlapi + 'nad/add', obj)
        .then(res => {
          if (this.state.copias === '1') {
            toast.success("Registro foi salvo com successo");
          }
        })
        .catch(error => {
          if (this.state.copias === '1') {
            toast.error("Ocorrou erro ao salvar o registro");
          }
        })
    }

    this.props.history.push('/indexNad');
  
  }

  render() {
   
    return (
      <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
           <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
                <div className="col-sm-11">
                  <h5>Clone de Nota de Autorização de Despesa</h5>  
                </div>
                <div className="col-sm-1">
                     <h1><label>Copias</label></h1>  
                     <input type="text" id="copias" className="form-control form-control-sm" value={this.state.copias} onChange={this.onChangeCopias} />  
                </div>
          </div>
           <div style={{ marginLeft:'5px', marginRight:'5px', marginTop:'5px' , border: '1px solid #ccc' }}>
                <form onSubmit={this.onSubmit} style={{ marginLeft:'15px', marginRight:'15px', marginTop:'15px'}}>
                <div className="form-row">
                      <div className="col-sm-1">
                        <label>Exercicio</label>  
                        <input type="text" id="anonad" className="form-control form-control-sm" value={this.state.anonad} onChange={this.onChangeAnonad}/>
                      </div>
                      <div className="col-sm-2">
                        <label>NAD</label>  
                        <input type="text" id="numnad" className="form-control form-control-sm" value={this.state.numnad} onChange={this.onChangeNumnad}/>
                      </div>
                      <div className="col-sm-5">
                        <label>Processo</label>  
                        <input type="text" id="procnad" className="form-control form-control-sm" value={this.state.procnad} onChange={this.onChangeProcnad}/>
                      </div>
                      <div className="col-sm-2">
                        <label>Data</label>  
                        <InputMask mask='99/99/9999' slotChar='mm/dd/yyyy' type="text" id="datanad" className="form-control form-control-sm" value={this.state.datanad} onChange={this.onChangeDatanad}/>
                      </div>
                      <div className="col-sm-0">
                        <label>Adiantamento</label>  
                        <SelectInput id="adant" className="sm" options={optionsSimNao} onChange={this.onChangeAdant} selectedValue={this.state.adant} placeholder="Sim" noOptionsMessage={() => ''} />
                      </div>    
                  </div>
                  <div className="form-row">
                    <div className="col-sm-4">
                      <label>Evento da Nad</label>  
                      <SelectInput id="evenad" className="sm" options={optionstipoevento} onChange={this.onChangeEvenad} selectedValue={this.state.evenad}/>
                    </div>
                    <div className="col-sm-4">
                      <label>Grupo de Despesas</label>  
                      <SelectInput id="catgast" className="sm" options={optionsgrupodespesa} onChange={this.onChangeCatgast} selectedValue={this.state.catgast}/>
                    </div>
                    <div className="col-sm-4">
                      <label>Tipo de Credito</label>  
                      <SelectInput id="tipcre" className="sm" options={optionstipocredito} onChange={this.onChangeTipcre} selectedValue={this.state.tipcre}/>
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
                       <label>Unidade Orçamentaria</label>  
                       <SelectInput id="uniorc" className="sm" options={optionsunidorcamentaria} onChange={this.onChangeUniorc} selectedValue={this.state.uniorc}/>
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
                    <div className="col-sm-3">
                      <label>Conta Pagadora</label>  
                      <SelectInput id="contapag" className="sm" options={optionsCCPagar} onChange={this.onChangeContapag} selectedValue={this.state.contapag}/>
                    </div>
                    <div className="col-sm-2">
                      <label>Banco</label>  
                      <input id="banpag" name="banpag" className="form-control form-control-sm" required="" type="text" value={this.state.banpag} onChange={this.onChangeBanpag}/>
                    </div>
                    <div className="col-sm-3">
                      <label>Agencia</label>  
                      <input id="agepag" name="agepag" className="form-control form-control-sm" required="" type="text" value={this.state.agepag} onChange={this.onChangeAgepag}/>
                    </div>
                    <div className="col-sm-4">
                      <label>Conta Corrente</label>  
                      <input id="ccpag" name="ccpag" className="form-control form-control-sm" required="" type="text" value={this.state.ccpag} onChange={this.onChangeCcpag}/>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col-sm-9">
                      <label>Nome do Favorecido</label>  
                      <SelectInput id="nomefav" className="sm" options={optionsfavorecido} onChange={this.onChangeNomefav} selectedValue={this.state.nomefav}/>
                    </div>
                    <div className="col-sm-3">
                      <label>Cnpj/Cpf:</label>  
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
                    <div className="col-sm-3">
                      <label>Referente:</label>  
                      <SelectInput id="contarec" className="sm" options={optionsCCReceber} onChange={this.onChangeContarec} selectedValue={this.state.contarec}/>
                    </div>
                    <div className="col-sm-3">
                      <label>Banco</label>  
                      <input id="banrec" name="banrec" className="form-control form-control-sm" required="" type="text" value={this.state.banrec} onChange={this.onChangeBanrec}/>
                    </div>
                    <div className="col-sm-2">
                      <label>Agencia</label>  
                      <input id="agerec" name="agerec" className="form-control form-control-sm" required="" type="text" value={this.state.agerec} onChange={this.onChangeAgerec}/>
                    </div>
                    <div className="col-sm-4">
                      <label>Conta Corrente</label>  
                      <input id="ccrec" name="ccrec" className="form-control form-control-sm" required="" type="text" value={this.state.ccrec} onChange={this.onChangeCcrec}/>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col-sm-2">
                      <label>Tipo de Empenho</label>  
                      <SelectInput id="tipemp" className="sm" options={optionstipoempenho} onChange={this.onChangeTipemp} selectedValue={this.state.tipemp}/>
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
                    <div className="col-sm-4">
                      <label>Tipo de Licitação</label>  
                      <SelectInput id="tiplic" className="sm" options={optionstipolicitacao} onChange={this.onChangeTiplic} selectedValue={this.state.tiplic}/>
                    </div>
                    <div className="col-sm-4">
                      <label>Data de Abertura</label>  
                      <InputMask mask='99/99/9999' slotChar='mm/dd/yyyy' type="text" id="dataabert" className="form-control form-control-sm" value={this.state.dataabert} onChange={this.onChangeDataabert}/>
                    </div>
                    <div className="col-sm-4">
                      <label>Numero da Licitação</label>  
                      <input id="numerolic" name="numerolic" className="form-control form-control-sm" required="" type="text" value={this.state.numerolic} onChange={this.onChangeNumerolic}/>
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
                      <label>Id Funcional</label>  
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
                      <label>Id Funcional</label>  
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
                      <label>Id Funcional</label>  
                      <input id="matrat" name="matrat" className="form-control form-control-sm" required="" type="text" value={this.state.matrat} onChange={this.onChangeMatrat}/>
                    </div>
                    <div className="col-sm-2">
                      <label>Data</label>  
                      <InputMask mask='99/99/9999' slotChar='mm/dd/yyyy' type="text" id="datarat" className="form-control form-control-sm" value={this.state.datarat} onChange={this.onChangeDatarat}/>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="form-row">
                      <ToastContainer />
                      <div className="col-sm-1">
                          <input type="submit" value="Salvar" className="btn btn-sm btn btn-primary"/>
                          &nbsp;&nbsp;
                          <Link to={'/indexNad'} className="btn btn-sm btn-success">Cancelar</Link>
                      </div>
                  </div>
                  <br></br>
            </form>
        </div>
      </div>  

    )
  }

}

 

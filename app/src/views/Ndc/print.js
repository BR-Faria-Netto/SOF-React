import React, { Component } from 'react';

import CurrencyInput from '../../components/CurrencyInput';
import InputMask from 'react-input-mask';

import Logo from '../../images/index';

export default class PrintNdc extends Component {
 
  render() {

    return (
           <div style={{ width: '100%', height: '401.5mm', margin: '30mm, 45mm 30mm 45mm' }}>
             <Logo />
             <hr></hr>
             <div className="form-row">
                <div className="col-sm-4">
                   <h5>Nota de Descentralização de Crédito</h5>
                </div>
                <div className="col-sm-1">
                  <label>Ano</label>  
                  <input type="text" id="anondc" className="form-control form-control-sm" value={this.props.data.anondc} />
                </div>
                <div className="col-sm-2">
                  <label>NDC</label>  
                  <input type="text" id="numndc" className="form-control form-control-sm" value={this.props.data.numndc} />
                </div>
                <div className="col-sm-3">
                  <label>Processo</label>  
                  <input type="text" id="procndc" className="form-control form-control-sm" value={this.props.data.procndc} />
                </div>
                <div className="col-sm-2">
                  <label>Data</label>  
                  <InputMask mask='99/99/9999' slotChar='mm/dd/yyyy' type="text" id="datandc" className="form-control form-control-sm" value={this.props.data.datandc} />
                </div>
            </div>

    
            <div className="form-row">
              <div className="col-sm-4">
                <label>Secretaria</label>  
                <input id="secret" name="secret" className="form-control input-md" type="text" value={this.props.data.secret} />
              </div>
              <div className="col-sm-4">
                <label>Unidade Gestora</label>  
                <input className="form-control input-md" type="text" id="unigest" value={this.props.data.unigest} />
              </div>
              <div className="col-sm-4">
                <label>Evento da ndc</label>  
                <input className="form-control input-md" type="text" id="evendc" value={this.props.data.evendc}  />
              </div>
            </div>

            <div className="form-row">
              <div className="col-sm-4">
                <label>Programa de Trabalho</label>  
                <input className="form-control input-md" type="text" id="progtrab" value={this.props.data.progtrab} />
              </div>
              <div className="col-sm-4">
                <label>Natureza de Despesa</label>  
                <input className="form-control input-md" type="text" id="natdesp" value={this.props.data.natdesp} />
              </div>
              <div className="col-sm-4">
                <label>Fonte de Recurso</label>  
                <input className="form-control input-md" type="text" id="fontrec" value={this.props.data.fontrec} />
              </div>
            </div>

            <div className="form-row">
              <div className="col-sm-12">
                <label>Nome do Favorecido:</label>  
                <input className="form-control input-md" type="text" id="nomefav" value={this.props.data.nomefav} />
              </div>
            </div>

            <div className="form-row">
              <div className="col-sm-12">
                <label>Endereço</label>  
                <input id="ender" name="ender" className="form-control input-md" required="" type="text" value={this.props.data.ender} />
              </div>
            </div>

            <div className="form-row">
              <div className="col-sm-4">
                <label>Bairro</label>  
                <input id="bai" name="bai" className="form-control input-md" required="" type="text" value={this.props.data.bai} />
              </div>
              <div className="col-sm-4">
                <label>Cidade</label>  
                <input id="cid" name="cid" className="form-control input-md" required="" type="text" value={this.props.data.cid} />
              </div>
              <div className="col-sm-2">
                <label>Cep</label>  
                <input id="cep" name="cep" className="form-control input-md" required="" type="text" value={this.props.data.cep} />
              </div>
              <div className="col-sm-2">
                <label>Estado</label>  
                <input id="uf" name="uf" className="form-control input-md" required="" type="text" value={this.props.data.uf} />
              </div>
            </div>

            <div className="form-row">
              <div className="col-sm-2">
                <label>Cnpj/Cpf:</label>  
                <input id="cnpj" name="cnpj" className="form-control input-md" required="" type="text" value={this.props.data.cnpj} />
              </div>
              <div className="col-sm-2" style={{ textAlign: 'right' }}>
                <label>Valor</label>  
                <CurrencyInput placeholder="0,00" className="form-control input-md" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.valor} />
              </div>

              <div className="col-sm-8">
                <label>Extenso</label>  
                <textarea id="extenso" name="extenso" rows = "2" className="form-control form-control-sm" type="text" value={this.props.data.extenso} onChange={this.onChangeExtenso} />
              </div>

            </div>

            <div className="form-row">
              <div className="col-sm-12">
                <label>Descrição da Despesa</label>  
                <textarea id="descdesp" name="descdesp" rows = "5" className="form-control input-md" required="" type="text" value={this.props.data.descdesp} onChange={this.onChangeDescdesp} />
              </div>
            </div>

            <div className="form-row" style={{ textAlign: 'right' }}>
              <div className="col-sm-2">
                <label>Janeiro</label>  
                <CurrencyInput placeholder="0,00" id="jan" name="jan" className="form-control input-md" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.jan} />
              </div>
              <div className="col-sm-2">
                <label>Fevereiro</label>  
                <CurrencyInput placeholder="0,00" id="fev" name="fev" className="form-control input-md" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.fev} />
              </div>
              <div className="col-sm-2">
                <label>Março</label>  
                <CurrencyInput placeholder="0,00" id="mar" name="mar" className="form-control input-md" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.mar} />
              </div>
              <div className="col-sm-2">
                <label>Abril</label>  
                <CurrencyInput placeholder="0,00" id="abr" name="abr" className="form-control input-md" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.abr} />
              </div>
              <div className="col-sm-2">
                <label>Maio</label>  
                <CurrencyInput placeholder="0,00" id="mai" name="mai" className="form-control input-md" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.mai} />
              </div>
              <div className="col-sm-2">
                <label>Junho</label>  
                <CurrencyInput placeholder="0,00" id="jun" name="jun" className="form-control input-md" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.jun} />
              </div>
            </div>

            <div className="form-row" style={{ textAlign: 'right' }}>
              <div className="col-sm-2">
                <label>Julho</label>  
                <CurrencyInput placeholder="0,00" id="jul" name="jul" className="form-control input-md" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.jul} />
              </div>
              <div className="col-sm-2">
                <label>Agosto</label>  
                <CurrencyInput placeholder="0,00" id="ago" name="ago" className="form-control input-md" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.ago} />
              </div>
              <div className="col-sm-2">
                <label>Setembro</label>  
                <CurrencyInput placeholder="0,00" id="set" name="set" className="form-control input-md" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.set} />
              </div>
              <div className="col-sm-2">
                <label>Outubro</label>  
                <CurrencyInput placeholder="0,00" id="out" name="out" className="form-control input-md" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.out} />
              </div>
              <div className="col-sm-2">
                <label>Novembro</label>  
                <CurrencyInput placeholder="0,00" id="nov" name="nov" className="form-control input-md" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.nov} />
              </div>
              <div className="col-sm-2">
                <label>Dezembro</label>  
                <CurrencyInput placeholder="0,00" id="dez" name="dez" className="form-control input-md" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.dez} />
              </div>
            </div>

            <div className="form-row">
              <div className="col-sm-12">
                <label>Base Legal</label>  
                <textarea id="baselegal" name="baselegal" rows='2' className="form-control input-md" required="" type="text" value={this.props.data.baselegal} />
              </div>
            </div>

            <div className="form-row">
                <div className="col-sm-6">
                  <label>Emissor</label>  
                  <textarea id="emissor" name="emissor" className="form-control form-control-sm" required="" type="text" value={this.props.data.emissor+'\n'+this.props.data.cargoemissor} /> 
                </div>
                <div className="col-sm-3">
                  <label>Ato de Delegação</label>  
                  <input id="deleemi" name="deleemi" className="form-control form-control-sm" required="" type="text" value={this.props.data.deleemi} />
                </div>
                <div className="col-sm-2">
                  <label>Id Funcional</label>  
                  <input id="matemi" name="matemi" className="form-control form-control-sm" required="" type="text" value={this.props.data.matemi} />
                </div>
                <div className="col-sm-1">
                  <label>Data</label>  
                  <input id="dataemi" name="dataemi" className="form-control form-control-sm" required="" type="text" value={this.props.data.dataemi} />
                </div>
            </div>

            <div className="form-row">
                <div className="col-sm-6">
                  <label>Ordenador</label>  
                  <textarea id="ordenador" name="ordenador" className="form-control form-control-sm" required="" type="text" value={this.props.data.ordenador+'\n'+this.props.data.cargoordenador} />
                </div>
                <div className="col-sm-3">
                  <label>Ato de Delegação</label>  
                  <input id="deleord" name="deleord" className="form-control form-control-sm" required="" type="text" value={this.props.data.deleord} />
                </div>
                <div className="col-sm-2">
                  <label>Id Funcional</label>  
                  <input id="matord" name="matord" className="form-control form-control-sm" required="" type="text" value={this.props.data.matord} />
                </div>
                <div className="col-sm-1">
                  <label>Data</label>  
                  <input id="dataord" name="dataord" className="form-control form-control-sm" required="" type="text" value={this.props.data.dataord} />
                </div>
            </div>
          
            <div className="form-row">
                <div className="col-sm-6">
                  <label>Ratificador</label>  
                  <textarea id="ratificador" name="ratificador" className="form-control form-control-sm" required="" type="text" value={this.props.data.ratificador+'\n'+this.props.data.cargoratificador} />
                </div>
                <div className="col-sm-3">
                  <label>Ato de Delegação</label>  
                  <input id="delerat" name="delerat" className="form-control form-control-sm" required="" type="text" value={this.props.data.delerat} />
                </div>
                <div className="col-sm-2">
                  <label>Id Funcional</label>  
                  <input id="matrat" name="matrat" className="form-control form-control-sm" required="" type="text" value={this.props.data.matrat} />
                </div>
                <div className="col-sm-1">
                  <label>Data</label>  
                  <input id="datarat" name="datarat" className="form-control form-control-sm" required="" type="text" value={this.props.data.datarat} />
                </div>
            </div>
      </div>
    )
  }
}
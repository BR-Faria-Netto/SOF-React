import React, { Component } from 'react';

import CurrencyInput from '../../components/CurrencyInput';
import InputMask from 'react-input-mask';

import Logo from '../../images/index';

export default class PrintNad extends Component {
  
  render() {

    return (
                //<div style={{ width: '100%', height: '100%', margin: '30mm, 45mm 30mm 45mm' }}>
                <div style={{ width: '100%', height: '100%' }}>
                    <Logo />
                    <hr></hr>
                    <div className="form-row">
                      <div className="col-sm-4">
                        <h5>Nota de Autorização de Despesa</h5>
                      </div>
                      <div className="col-sm-1">
                        <label>Ano</label>  
                        <input type="text" id="anonad" className="form-control form-control-sm" value={this.props.data.anonad} />
                      </div>
                      <div className="col-sm-2">
                        <label>NAD</label>  
                        <input type="text" id="numnad" className="form-control form-control-sm" value={this.props.data.numnad} />
                      </div>
                      <div className="col-sm-3">
                        <label>Processo</label>  
                        <input type="text" id="procnad" className="form-control form-control-sm" value={this.props.data.procnad}/>
                      </div>
                      <div className="col-sm-2">
                        <label>Data</label>  
                        <InputMask mask='99/99/9999' slotChar='mm/dd/yyyy' type="text" id="datanad" className="form-control form-control-sm" value={this.props.data.datanad} />
                      </div>
                    </div>

                    <div className="form-row">
                        <div className="col-sm-4">
                          <label>Evento da Nad</label>  
                          <input type="text" className="form-control form-control-sm" id="evenad" value={this.props.data.evenad} />
                        </div>
                        <div className="col-sm-4">
                          <label>Grupo de Despesas</label>  
                          <input type="text" className="form-control form-control-sm" id="catgast" value={this.props.data.catgast} />
                        </div>
                        <div className="col-sm-1">
                            <label>Adiantamento</label>  
                            <input type="text" className="form-control form-control-sm" id="adant" value={this.props.data.adant} />
                        </div>    
                        <div className="col-sm-3">
                          <label>Categoria</label>
                          <input type="text" className="form-control form-control-sm" id="adant" value={this.props.data.categoria} />
                        </div>    
                    </div>

                    <div className="form-row">
                        <div className="col-sm-4">
                          <label>Secretaria</label>  
                          <input id="secret" name="secret" className="form-control form-control form-control-sm" type="text" value={this.props.data.secret} />
                        </div>
                        <div className="col-sm-4">
                          <label>Unidade Gestora</label>  
                          <input type="text" className="form-control form-control-sm" id="unigest" value={this.props.data.unigest} />
                        </div>
                        <div className="col-sm-4">
                          <label>Unidade Orçamentaria</label>  
                          <input type="text" className="form-control form-control-sm" id="uniorc" value={this.props.data.uniorc} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-sm-4">
                          <label>Programa de Trabalho</label>  
                          <input type="text" className="form-control form-control-sm" id="progtrab" value={this.props.data.progtrab} />
                        </div>
                        <div className="col-sm-4">
                          <label>Natureza de Despesa</label>  
                          <input type="text" className="form-control form-control-sm" id="natdesp" value={this.props.data.natdesp} />
                        </div>
                        <div className="col-sm-4">
                          <label>Fonte de Recurso</label>  
                          <input type="text" className="form-control form-control-sm" id="fontrec" value={this.props.data.fontrec} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-sm-3">
                          <label>Tipo de Credito</label>  
                          <input type="text" className="form-control form-control-sm" id="tipcre" value={this.props.data.tipcre} />
                        </div>
                        <div className="col-sm-2">
                          <label>Banco</label>  
                          <input id="banpag" name="banpag" className="form-control form-control-sm" required="" type="text" value={this.props.data.banpag} onChange={this.onChangeBanpag}/>
                        </div>
                        <div className="col-sm-3">
                          <label>Agencia</label>  
                          <input id="agepag" name="agepag" className="form-control form-control-sm" required="" type="text" value={this.props.data.agepag} onChange={this.onChangeAgepag}/>
                        </div>
                        <div className="col-sm-4">
                          <label>Conta Corrente</label>  
                          <input id="ccpag" name="ccpag" className="form-control form-control-sm" required="" type="text" value={this.props.data.ccpag} onChange={this.onChangeCcpag}/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-sm-12">
                          <label>Nome do Favorecido:</label>  
                          <input type="text" className="form-control form-control-sm" id="nomefav" value={this.props.data.nomefav} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-sm-12">
                          <label>Endereço</label>  
                          <input id="ender" name="ender" className="form-control form-control-sm" required="" type="text" value={this.props.data.ender} onChange={this.onChangeEnder} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-sm-4">
                          <label>Bairro</label>  
                          <input id="bai" name="bai" className="form-control form-control-sm" required="" type="text" value={this.props.data.bai} onChange={this.onChangeBai}/>
                        </div>
                        <div className="col-sm-4">
                          <label>Cidade</label>  
                          <input id="cid" name="cid" className="form-control form-control-sm" required="" type="text" value={this.props.data.cid} onChange={this.onChangeCid}/>
                        </div>
                        <div className="col-sm-2">
                          <label>Cep</label>  
                          <input id="cep" name="cep" className="form-control form-control-sm" required="" type="text" value={this.props.data.cep} onChange={this.onChangeCep}/>
                        </div>
                        <div className="col-sm-2">
                          <label>Estado</label>  
                          <input id="uf" name="uf" className="form-control form-control-sm" required="" type="text" value={this.props.data.uf} onChange={this.onChangeUf}/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-sm-3">
                          <label>Cnpj/Cpf:</label>  
                          <input id="cnpj" name="cnpj" className="form-control form-control-sm" required="" type="text" value={this.props.data.cnpj} onChange={this.onChangeCnpj}/>
                        </div>
                        <div className="col-sm-3">
                          <label>Banco</label>  
                          <input id="banrec" name="banrec" className="form-control form-control-sm" required="" type="text" value={this.props.data.banrec} onChange={this.onChangeBanrec}/>
                        </div>
                        <div className="col-sm-2">
                          <label>Agencia</label>  
                          <input id="agerec" name="agerec" className="form-control form-control-sm" required="" type="text" value={this.props.data.agerec} onChange={this.onChangeAgerec}/>
                        </div>
                        <div className="col-sm-4">
                          <label>Conta Corrente</label>  
                          <input id="ccrec" name="ccrec" className="form-control form-control-sm" required="" type="text" value={this.props.data.ccrec} onChange={this.onChangeCcrec}/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-sm-2">
                          <label>Tipo de Empenho</label>  
                          <input type="text" className="form-control form-control-sm" id="tipemp" value={this.props.data.tipemp} />
                        </div>
                        <div className="col-sm-2" style={{ textAlign: 'right' }}>
                          <label>Valor</label>  
                          <CurrencyInput placeholder="0,00" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.valor} onChange={this.onChangeValor}/>
                        </div>
                        <div className="col-sm-8">
                          <label>Extenso</label>  
                          <textarea id="extenso" name="extenso" rows = "2" className="form-control form-control-sm" type="text" value={this.props.data.extenso} onChange={this.onChangeExtenso}/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-sm-12">
                          <label style={{ textAlign: 'left' }}>Descrição da Despesa</label>  
                          <textarea id="descdesp" name="descdesp" rows = "6" className="form-control form-control-sm" style={{ textAlign: 'justify' }} type="text" value={this.props.data.descdesp} onChange={this.onChangeDescdesp}/>
                        </div>
                    </div>

                    <br></br>

                    <div className="form-row" style={{ textAlign: 'right' }}>
                        <div className="col-sm-2">
                          <label>Janeiro</label>  
                          <CurrencyInput placeholder="0,00" id="jan" name="jan" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.jan} onChange={this.onChangeJan}/>
                        </div>
                        <div className="col-sm-2">
                          <label>Fevereiro</label>  
                          <CurrencyInput placeholder="0,00" id="fev" name="fev" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.fev} onChange={this.onChangeFev}/>
                        </div>
                        <div className="col-sm-2">
                          <label>Março</label>  
                          <CurrencyInput placeholder="0,00" id="mar" name="mar" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.mar} onChange={this.onChangeMar}/>
                        </div>
                        <div className="col-sm-2">
                          <label>Abril</label>  
                          <CurrencyInput placeholder="0,00" id="abr" name="abr" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.abr} onChange={this.onChangeAbr}/>
                        </div>
                        <div className="col-sm-2">
                          <label>Maio</label>  
                          <CurrencyInput placeholder="0,00" id="mai" name="mai" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.mai} onChange={this.onChangeMai}/>
                        </div>
                        <div className="col-sm-2">
                          <label>Junho</label>  
                          <CurrencyInput placeholder="0,00" id="jun" name="jun" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.jun} onChange={this.onChangeJun}/>
                        </div>
                    </div>

                    <div className="form-row" style={{ textAlign: 'right' }}>
                        <div className="col-sm-2">
                          <label>Julho</label>  
                          <CurrencyInput placeholder="0,00" id="jul" name="jul" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.jul} onChange={this.onChangeJul}/>
                        </div>
                        <div className="col-sm-2">
                          <label>Agosto</label>  
                          <CurrencyInput placeholder="0,00" id="ago" name="ago" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.ago} onChange={this.onChangeAgo}/>
                        </div>
                        <div className="col-sm-2">
                          <label>Setembro</label>  
                          <CurrencyInput placeholder="0,00" id="set" name="set" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.set} onChange={this.onChangeSet}/>
                        </div>
                        <div className="col-sm-2">
                          <label>Outubro</label>  
                          <CurrencyInput placeholder="0,00" id="out" name="out" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.out} onChange={this.onChangeOut}/>
                        </div>
                        <div className="col-sm-2">
                          <label>Novembro</label>  
                          <CurrencyInput placeholder="0,00" id="nov" name="nov" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.nov} onChange={this.onChangeNov}/>
                        </div>
                        <div className="col-sm-2">
                          <label>Dezembro</label>  
                          <CurrencyInput placeholder="0,00" id="dez" name="dez" className="form-control form-control-sm" style={{ textAlign: 'right' }} required="" type="text" value={this.props.data.dez} onChange={this.onChangeDez}/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-sm-4">
                          <label>Tipo de Licitação</label>  
                          <input id="tiplic" name="tiplic" className="form-control form-control-sm" required="" type="text" value={this.props.data.tiplic} />
                        </div>
                        <div className="col-sm-4">
                          <label>Data de Abertura</label>  
                          <input id="dataabert" name="dataabert" className="form-control form-control-sm" required="" type="text" value={this.props.data.dataabert} />
                        </div>
                        <div className="col-sm-4">
                          <label>Numero</label>  
                          <input id="numerolic" name="numerolic" className="form-control form-control-sm" required="" type="text" value={this.props.data.numerolic} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-sm-12">
                          <label>Base Legal</label>  
                          <textarea id="baselegal" name="baselegal" rows = "2" className="form-control form-control-sm" required="" type="text" value={this.props.data.baselegal} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-sm-6">
                          <label>Emissor</label>  
                          <textarea id="emissor" name="emissor" className="form-control form-control-sm" required="" type="text" value={this.props.data.emissor+'\n'+this.props.data.cargoemissor}/> 
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

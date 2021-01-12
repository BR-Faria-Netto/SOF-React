import React, { Component } from 'react';

export default class PrintSecretaria extends Component {
  
  render() {

    return (
                 <div>
                    <div className="form-row">
                        <div className="col-sm-2">
                          <input type="text" className="form-control" id="nomesec" value={this.props.data.nomesec} />
                        </div>
                        <div className="col-sm-3">
                          <input id="ender" name="ender" className="form-control input-md" required="" type="text" value={this.props.data.ender} onChange={this.onChangeEnder} />
                        </div>
                        <div className="col-sm-1">
                          <input id="bai" name="bai" className="form-control input-md" required="" type="text" value={this.props.data.bai} onChange={this.onChangeBai}/>
                        </div>
                        <div className="col-sm-1">
                          <input id="cid" name="cid" className="form-control input-md" required="" type="text" value={this.props.data.cid} onChange={this.onChangeCid}/>
                        </div>
                        <div className="col-sm-1">
                          <input id="cep" name="cep" className="form-control input-md" required="" type="text" value={this.props.data.cep} onChange={this.onChangeCep}/>
                        </div>
                        <div className="col-sm-1">
                          <input id="uf" name="uf" className="form-control input-md" required="" type="text" value={this.props.data.uf} onChange={this.onChangeUf}/>
                        </div>
                    </div>
                  </div>
            )
  }
}

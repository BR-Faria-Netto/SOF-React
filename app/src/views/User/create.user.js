import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { generatePassword } from "../../auth"

import api from "../../services/api"

import validator from 'validator'

var optionsRoles = [];
optionsRoles.push({ value: ('Administrador', 'Administrador'), label: ('Administrador', 'Administrador' )});
optionsRoles.push({ value: ('Usuário', 'Usuário'), label: ('Usuário', 'Usuário' )});

var optionsStatus = [];
optionsStatus.push({ value: ('Solicitado', 'Solicitado'), label: ('Solicitado', 'Solicitado' )});
optionsStatus.push({ value: ('Autorizado', 'Autorizado'), label: ('Autorizado', 'Autorizado' )});
optionsStatus.push({ value: ('Bloqueado', 'Bloqueado'), label: ('Bloqueado', 'Bloqueado' )});
optionsStatus.push({ value: ('Recusado', 'Recusado'), label: ('Recusado', 'Recusado' )});

export default class Create extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeName = this.onChangeName.bind(this); 
    this.onChangeEmail = this.onChangeEmail.bind(this); 
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeConfirmCode = this.onChangeConfirmCode.bind(this);
    
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      name : '',
      email : '',
      login : '',
      role: 'Usuário',
      password : '',
      confirmPassword : '',
      status : 'Solicitado',
      confirmCode : generatePassword()
    }

  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })  
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })  
  }

  onChangeLogin(e) {
    this.setState({
      login: e.target.value
    })  
  }

  onChangeRole(e) {
    this.setState({
      role: e.target.value
    })  
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })  
  }

  onChangeConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value
    })  
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    })  
  }

  onChangeConfirmCode(e) {
    this.setState({
      confirmCode: e.target.value
    })  
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      name : this.state.name,
      email : this.state.email,
      login : this.state.login,
      role : this.state.role,
      password : this.state.password,
      confirmPassword : this.state.confirmpassword,
      status : this.state.status,
      confirmCode : this.state.confirmCode,
      usuario: window.login
    };

    let isValid = true;
    let passwordReg = new RegExp("^(?=.*?[A-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    let loginReg = new RegExp("^(?=.*?[a-z])(?=.*?[#?.]).{8,}$");
    if (!this.state.name) {
        toast.error("O campo nome é obrigatório.")
        isValid = false;
    } else if (this.state.name.length > 70) {
        toast.error("O campo nome possui mais que 70 caractéres.")
        isValid = false;
    }
    if (!this.state.email) {
        toast.error("O campo email é obrigatório.")
        isValid = false;
    } else if (!validator.isEmail(this.state.email)) {
        toast.error("O campo email esta no formato incorreto.")
        isValid = false;
    }    
    if (!this.state.login) {
        toast.error("O campo login é obrigatório.")
        isValid = false;
    } else if (!loginReg.test(this.state.login)) {
        toast.error("O login não contem 8 caractéres e ponto.")
        isValid = false;
    }
    if (!this.state.role) {
      toast.error("O campo perfil é obrigatório.")
      isValid = false;
    }
    if (!this.state.password) {
        toast.error("O campo senha é obrigatório.")
        isValid = false;
    } else if (!passwordReg.test(this.state.password)) {
        toast.error("A senha não contem 8 caractéres, letra, número ou caractére especial.")
        isValid = false;
    } else if (this.state.password !== this.state.confirmPassword) {
        toast.error("As senhas não são iguais.")
        isValid = false;
    }
    if (!this.state.confirmPassword) {
        toast.error("O campo confirmação de senha é obrigatório.")
        isValid = false;
    } else {

      if (isValid) {
          api.post('/user/add', obj).then(res => {
            toast.success("Registro foi salvo com successo");
            this.props.history.push('/indexUser');
          }
          )
          .catch((err) => {
            toast.error("Ocorrou erro ao salvar o registro");
          })
      }
    }

  }
 
  render() {
    return (

      <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
          <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
              <h5>Alteração de Usuário</h5>  
          </div>
          <div style={{ marginLeft:'5px', marginRight:'5px', marginTop:'5px' , border: '1px solid #ccc' }}>
              <form onSubmit={this.onSubmit} style={{ marginLeft:'15px', marginRight:'15px', marginTop:'15px'}}>

                <div className="form-row">
                  <div className="col-sm-5">
                    <label>Nome:</label>  
                    <input id="name" name="name" className="form-control form-control-sm" required="" type="text" value={this.state.name} onChange={this.onChangeName} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-sm-5">
                    <label>Email</label>  
                    <input id="email" name="email" className="form-control form-control-sm" required="" type="text" value={this.state.email} onChange={this.onChangeEmail} />
                  </div>
                </div>

                <div className="form-row">
                    <div className="col-sm-5">
                      <label>Login</label>  
                      <input id="login" name="login" className="form-control form-control-sm" required="" type="text" value={this.state.login} onChange={this.onChangeLogin} />
                    </div>
                </div>

                <div className="form-row">
                  <div className="col-sm-5">
                      <label>Perfil</label>  
                      <select id="role" className="form-control form-control-sm" value={this.state.role} onChange={this.onChangeRole}>
                        {Object.keys(optionsRoles).map((t,i) => <option key={i} value={optionsRoles[i].label}>{optionsRoles[i].label}</option>)}
                      </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-sm-5">
                      <label>Status</label>  
                      <select id="status" className="form-control form-control-sm" value={this.state.status} onChange={this.onChangeStatus}>
                        {Object.keys(optionsStatus).map((t,i) => <option key={i} value={optionsStatus[i].label}>{optionsStatus[i].label}</option>)}
                      </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-sm-5">
                      <label>Code Acesso</label>  
                      <input id="confirmCode" name="confirmCode" className="form-control form-control-sm" required="" type="text" value={this.state.confirmCode} onChange={this.onChangeConfirmCode} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-sm-5">
                    <label>Senha</label>  
                    <input id="password" name="password" className="form-control form-control-sm" required="" type="password" value={this.state.password} onChange={this.onChangePassword} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-sm-5">
                  <label>Confirmaçao de Senha</label>  
                    <input id="confirmPassword" name="confirmPassword" className="form-control form-control-sm" required="" type="password" value={this.state.confirmPassword} onChange={this.onChangeConfirmPassword} />
                  </div>
                </div>

                <br></br>
                <div className="form-row">
                    <ToastContainer />
                    <div className="col-sm-1">
                        <input type="submit" value="Salvar" className="btn btn-sm btn btn-primary"/>
                        &nbsp;&nbsp;
                        <Link to={'/indexUser'} className="btn btn-sm btn-success">Cancelar</Link>
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

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from "../../services/api"


export default class Edit extends Component {

  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this); 
    this.onChangeEmail = this.onChangeEmail.bind(this); 
    this.onChangeLogin = this.onChangeLogin.bind(this); 
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      name : '',
      email : '',
      password : '',
      confirmpassword : ''
    }

  }
  
  componentDidMount() {
    api.get('/user/edit/'+this.props.match.params.id)
       .then(res => {
          this.setState({ 
            name : res.name,
            email : res.email,
            login : res.login,
            password : '',
            confirmpassword : '',
          });
      })
      .catch(function (error) {
          console.log(error);
      })
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

    onChangePassword(e) {
      this.setState({
        password: e.target.value
      })  
    }

    onChangeConfirmPassword(e) {
      this.setState({
        confirmpassword: e.target.value
      })  
    }
      
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      name : this.state.name,
      email : this.state.email,
      password : this.state.password,
      confirmepassword : this.state.confirmpassword,
    };
    
    api.post('/user/update/'+this.props.match.params.id, obj)
    .then(res => {
      toast.success("Registro foi salvo com successo");
    })
    .catch(error => {
      toast.error("Ocorrou erro ao salvar o registro");
    })
    this.props.history.push('/Home');
  }

  render() {

    return (
      <div className="responsive bg-dim full-bg-size" style={{ marginTop:'2px',marginBotton:'2px', marginLeft:'2px', marginRight:'2px', backgroundColor:'#f7f7f7', border: '1px solid #ccc'}}> 
          
          <div className="form-row" style={{ marginLeft:'1px', marginRight:'1px',  backgroundColor:'#e8e9ea', height:'35px', textalign: 'center' }}>
              <h5>Profile do Usuário</h5>  
          </div>

          <div style={{ marginLeft:'5px', marginRight:'5px', marginTop:'5px' , border: '1px solid #ccc' }}>

            <form onSubmit={this.onSubmit} style={{ marginLeft:'15px', marginRight:'15px', marginTop:'15px'}}>

              <div className="form-row">
                <div className="col-sm-5">
                  <label>Nome:</label>  
                  <input id="name" name="name" className="form-control form-control-sm" required="" type="text" value={this.state.name} onChange={this.onChangeName} readonly="readonly"  />
                </div>
              </div>

              <div className="form-row">
                <div className="col-sm-5">
                  <label>Email</label>  
                  <input id="email" name="email" className="form-control form-control-sm" required="" type="text" value={this.state.email} onChange={this.onChangeEmail} readonly="readonly" />
                </div>
              </div>

              <div className="form-row">
                <div className="col-sm-5">
                  <label>Login</label>  
                  <input id="login" name="login" className="form-control form-control-sm" required="" type="text" value={this.state.login} onChange={this.onChangeLogin} readonly="readonly" />
                </div>
              </div>

              <label>Deixe em branco para manter as mesma senha</label>  
              <div className="form-row">
                <div className="col-sm-5">
                  <label>Senha</label>  
                  <input id="password" name="password" className="form-control form-control-sm" required="" type="password" value={this.state.password} onChange={this.onChangePassword} />
                </div>
              </div>

              <div className="form-row">
                <div className="col-sm-5">
                  <label>Confirmaçao de Senha</label>  
                  <input id="confirmpassword" name="confirmpassword" className="form-control form-control-sm" required="" type="password" value={this.state.confirmpassword} onChange={this.onChangeConfirmPassword} />
                </div>
              </div>

              <br></br>
              <div className="form-row">
                    <ToastContainer />
                    <div className="col-sm-1">
                        <input type="submit" value="Salvar" className="btn btn-sm btn btn-primary"/>
                        &nbsp;&nbsp;
                        <Link to={'/Home'} className="btn btn-sm btn-success">Cancelar</Link>
                    </div>
                </div>
              <br></br>
          </form>
          <br></br>
      </div>
      <br></br>
      </div>
    )
  }
}
import React, { useState } from 'react'
import validator from 'validator'
import api from '../../services/api'
import { toast } from 'react-toastify'
import { Link } from "react-router-dom"

const RecoverPassword = props => {
  
    const [email, setEmail] = useState('')

    const pageStyles = {
      marginTop:"10%",
      display: "flex",
      height: "80%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "center",
      left: "50%",
      top: "50%"
  }

  const registerTitle = {
      fontWeight: "bold",
      fontSize: "27px",
      marginBottom: "1em"
  }

    const onSubmit = () => {
        let isValid = true;
        if (!email) {
           toast.error("O campo Email é obrigatório.")
           isValid = false;
        } else if (!validator.isEmail(email)) {
            toast.error("O campo email com formato incorreto.")
            isValid = false;
        }

        if (isValid)
           api.post('/user/resetPassword', { email }).then(res => {
              if (res.success) {
                  toast.success("Código de acesso enviado com sucesso, verifique seu email!")
                  setTimeout(() => { 
                      window.location.href = '/'
                  }, 2000);
              } else {
                  toast.error(res.error)
              }
          }).catch((err) => {
            toast.error('Tivemos problemas no servidor de Dados...')
          })
      }
    

    return (

        <div style={pageStyles}>

            <div className="jumbotron bg" style={{ width: "450px", minHeight: "450px" , border: '1px solid #ccc' }}>
                 <h1 style={registerTitle}>Esqueceu a senha?</h1>
                 <div className="row">
                  <div className="col-md-12">
                      <input
                          id="emailId"
                          type="email"
                          value={email}
                          onChange={event => setEmail(event.target.value)}
                          className="form-control"
                          aria-describedby="emailHelp"
                          placeholder="Email"
                      />
                  </div>
                </div>
                <br></br>
                <br></br>
                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-sm btn-primary" onClick={event => onSubmit(event)}>Confirmar</button>
                    </div>
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-sm btn-primary">Voltar</Link>
                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Link style={{float: 'right', bottom: '0'}} to="/confirmCode" >Confirmação de Assesso</Link>

            </div>
        </div>
    )
};

export default RecoverPassword;

import React, { useState } from 'react'
import api from '../../services/api'
import validator from 'validator'
import { toast } from 'react-toastify'
import { Link } from "react-router-dom"

const ConfirmCode = props => {
  
    const [email, setEmail] = useState('')
    const [confirmCode, setconfirmCode] = useState('')

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

    const onSubmit = (e) => {
        e.preventDefault();

         let isValid = true
         if (!email) {
             toast.error("O campo Email é obrigatório.")
             isValid = false;
         }
         if (!validator.isEmail(email)) {
             toast.error("O campo email com formato incorreto.")
             isValid = false;
         }
         if (!confirmCode) {
             toast.error("O campo de Código de Acesso é obrigatório.")
             isValid = false;
         }
         if (isValid) {
            api.post('/user/confirmCode', { email, confirmCode }).then(res => {
               if (res.success) {
                   toast.success("Codigo de acesso confirmado com sucesso!")
                   setTimeout(() => { window.location.href = '/' }, 2000);
               } else {
                   toast.error(res.error)
               }
             }).catch((err) => {
                toast.error('Tivemos problemas no servidor de Dados...')
             })
         }
    }

    return (
        <div style={pageStyles}>
            <div className="jumbotron bg" style={{ width: "450px", minHeight: "450px" , border: '1px solid #ccc' }}>
                <h1 style={registerTitle}>Confirmação de Acesso</h1>
                <div className="row">
                     <div className="col-md-12 mb-3">
                        <input
                            id="emailId"
                            type="email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            className="form-control"
                            placeholder="Email"
                        />
                  </div>
                  <div className="col-md-12">
                        <input
                            id="conformCodeId"
                            type="conformCode"
                            value={confirmCode}
                            onChange={event => setconfirmCode(event.target.value)}
                            className="form-control"
                            placeholder="Código de Acesso"
                        />
                  </div>
                </div>
                <br></br>
                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-sm btn-primary" onClick={event => onSubmit(event)}>Confirmar</button>
                        &nbsp;&nbsp;
                        <Link to="/" className="btn btn-sm btn-primary">Voltar</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ConfirmCode;

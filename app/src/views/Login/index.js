import React, { useState, useEffect } from 'react';
import { isAuthenticated, login, getUser, logout } from "../../auth"

//import useUnload from "../../useUnload"

import api from "../../services/api"
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'

const Login = (props) => {

    useEffect(() => {
        if (isAuthenticated()) {
            window.location.href = "/home";
        }
    }, [])

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        if (!email) {
            toast.error("O login é obrigatório.")
            isValid = false;
        }
        if (!password) {
            toast.error("A senha é obrigatória.")
            isValid = false;
        }
        if (isValid)
            api.post('/user/login', { email, password }).then(res => {
                if (res.success) {

                     // set cookies login system                       
                     login(res);

                     if (getUser().status==='Solicitado') {
                        toast.error('Aguarde a liberação do acesso.')
                        logout();
                     }
                     else if (getUser().status==='Bloqueado') {
                        toast.error('O acesso ao sistema está bloqueado.')
                        logout();
                     }
                     else if (getUser().status==='Recusado') {
                        toast.error('O acesso ao sistema está Recusado.')
                        logout();
                     }
                     else {
                        toast.success('Seja bem vindo ao sistema.')
                        window.location.href = `/home`
                     }   

                } else {
                    toast.error(res.error)
                }
            }).catch((err) => {
                toast.error('Tivemos problemas no servidor de Dados...')
            })
    }

     const loginTitle = {
         fontWeight: "bold",
         fontSize: "27px",
         marginBottom: "1em"
     }
 
    const pageStyles = {
        marginTop:"10%",
        display: "flex",
        height: "90%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        left: "50%",
        top: "50%"
    }

    if (isAuthenticated()) {
        return null
    }

    return (

            <div style={pageStyles}>
                    <div className="jumbotron bg" style={{ width: "450px", minHeight: "450px" , border: '1px solid #ccc' }}>
                        <h1 style={loginTitle}>Login</h1>
                        
                        <div className="row">
                            <div className="col-md-12 mb-2">
                                <input
                                    id="emailId"
                                    type="email"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                    className="form-control"
                                    aria-describedby="emailHelp"
                                    placeholder="Login"
                                />
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-md-12">
                                <input
                                    id="passwordId"
                                    type="password"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                    className="form-control"
                                    placeholder="Senha"
                                />
                                {/* <label style={{float: 'left', marginLeft:"5px"}}>Lembrar</label>
                                <input
                                    id="rememberMe"
                                    type="checkbox"
                                    value={password}
                                    onChange={event => setRememberMe(event.target.value)}
                                    style={{float: 'left', marginTop:"7px", marginLeft:"5px"}}
                                /> */}
                                <Link style={{float: 'right'}} to="/recover-password" >Esqueceu a senha?</Link>
                            </div>
                            
                        </div>
                        <br></br>
                        <br></br>
                        <div className="row">                        
                            <div className="col-md-6">
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={event => onSubmit(event)}
                                >
                                    Confirmar
                                </button>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <Link style={{float: 'right'}} to="/register" >Solicitação de Assesso</Link>
                    </div>
                </div>
    )


};

export default Login;
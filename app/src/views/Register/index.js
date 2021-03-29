import React, { useState } from 'react'
import validator from 'validator'

import api from "../../services/api"

import { toast } from 'react-toastify'
import { Link } from "react-router-dom"

import Global from "../../styles/global";

const Register = (props) => {

    const [login, setLogin] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmedPassword] = useState("")

    const onSubmit = (e) => {
        let isValid = true;
        let passwordReg = new RegExp("^(?=.*?[A-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
        let loginReg = new RegExp("^(?=.*?[a-z])(?=.*?[#?.]).{8,}$");
        if (!name) {
            toast.error("O campo nome é obrigatório.")
            isValid = false;
        } else if (name.length > 70) {
            toast.error("O campo nome possui mais que 70 caractéres.")
            isValid = false;
        }
        if (!email) {
            toast.error("O campo email é obrigatório.")
            isValid = false;
        } else if (!validator.isEmail(email)) {
            toast.error("O campo email esta no formato incorreto.")
            isValid = false;
        }    
        if (!login) {
            toast.error("O campo login é obrigatório.")
            isValid = false;
        } else if (!loginReg.test(login)) {
            toast.error("O login não contem 8 caractéres e ponto.")
            isValid = false;
        }
        if (!password) {
            toast.error("O campo senha é obrigatório.")
            isValid = false;
        } else if (!passwordReg.test(password)) {
            toast.error("A senha não contem 8 caractéres, letra, número ou caractére especial.")
            isValid = false;
        } else if (password !== confirmPassword) {
            toast.error("As senhas não são iguais.")
            isValid = false;
        }
        if (!confirmPassword) {
            toast.error("O campo confirmação de senha é obrigatório.")
            isValid = false;
        } else {
            if (isValid) {
                var role = 'Administrador';
                api.post(`/user/register`, { login, name, email, role, password, confirmPassword }).then(res => {
                    if (res.success) {
                        toast.success("Usuário registrado com sucesso!");
                        window.location.href = "/"
                    } else {
                        if (Array.isArray(res.error)) {
                            let error = ''
                            res.error.forEach(e => {
                                error += `O campo ${e.path[0]} está com valores inválidos.\n`
                            })
                            toast.error(error)
                        } else {
                            toast.error(res.error)
                        }
                    }
                }).catch((err) => {
                    toast.error('Tivemos problemas no servidor de Dados...')
                })
            }
        }
    }

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

    return (

        <div style={pageStyles}>
            <Global />
            <div className="jumbotron bg" style={{ width: "450px", minHeight: "450px" , border: '1px solid #ccc' }}>
                <h1 style={registerTitle}>Solicitação de Acesso</h1>
                <div className="row">

                    <div className="col-md-12 mb-3">
                        <input
                            name="name"
                            placeholder="Nome completo"
                            maxLength={70}
                            value={name}
                            onChange={event => setName(event.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="col-md-12 mb-3">
                        <input
                            name="mail"
                            type="email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            className="form-control"
                            aria-describedby="emailHelp"
                            placeholder="Email"
                        />
                    </div>

                    <div className="col-md-12 mb-3">
                        <input
                            name="login"
                            placeholder="Login"
                            maxLength={70}
                            value={login}
                            onChange={event => setLogin(event.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="col-md-12 mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            className="form-control"
                            placeholder="Senha"
                        />
                    </div>

                    <div className="col-md-12">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={event => setConfirmedPassword(event.target.value)}
                            className="form-control"
                            placeholder="Confirmar senha"
                        />
                    </div>
                </div>
                <div className="row mb-4">
                </div>
                <div className="row mb-2">
                    <div className="col-md-6">
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={event => onSubmit(event)}
                        >
                            Confirmar
                        </button>
                    </div>
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-sm btn-primary">Voltar</Link>
                    </div>

                </div>
            </div>
        </div>
    )

};

export default Register;
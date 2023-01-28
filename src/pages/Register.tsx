import React, {useContext, useState} from 'react';
import AddImgIcon from '../assets/images/add-image.svg'
import {AuthContext} from "../context/AuthContext";
import {useAuth} from "../components/hooks/useAuth";
import {Link} from "react-router-dom";

const Register = () => {
    const {singUp, error} = useAuth()


    const handleSubmit = async (e:any) => {
        e.preventDefault()
        const login = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]
        await singUp(login,email,password,file)
    }



    return (
        <div className="form-container">
            <div className="form-container__wrapper">
                <span className="logo">Lan Chat</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Login"/>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <input className="input-file" type="file" id="file"/>
                    <label htmlFor="file">
                        <img src={AddImgIcon} alt="add"/>
                        Add avatar img
                    </label>
                    <button>Sing Up</button>
                    {error && <p className="error">{error}</p>}
                </form>
                <p>You do have an account? <Link to={"/login"}>Login</Link></p>
            </div>
        </div>
    );
};

export default Register;
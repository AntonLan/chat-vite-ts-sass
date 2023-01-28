import React from 'react';
import {useAuth} from "../components/hooks/useAuth";
import {Link} from "react-router-dom";

const Login = () => {
    const {logIn, error} = useAuth()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        await logIn(email,password)
    }

    return (
        <div className="form-container">
            <div className="form-container__wrapper">
                <span className="logo">Lan Chat</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <button>Sing In</button>
                    {error && <p className="error">{error}</p>}
                </form>
                <p>You do have an account? <Link to={"/register"}>Register</Link></p>
            </div>
        </div>
    );
};

export default Login;
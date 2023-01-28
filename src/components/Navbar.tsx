import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";

const Navbar = () => {
    const {logOut, user} = useContext(AuthContext)


    return (
        <div className="navbar">
            <span className="logo">Lan Chat</span>
            <div className="user">
                <img src={user.photoURL} alt="avatar"/>
                <span>{user.displayName}</span>
                <button onClick={logOut}>logout</button>
            </div>
        </div>
    );
};

export default Navbar;
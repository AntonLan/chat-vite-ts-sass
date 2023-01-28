import React from 'react';
import { Navigate } from 'react-router-dom'
import {useAuth} from "../hooks/useAuth";



interface IProps {
    children: React.ReactComponentElement<any>
}

const ProtectedRouter = ({children}: IProps) => {
    const {user} = useAuth()

    if (!user) {
        return <Navigate to="/login"/>
    } else {
        return children
    }
};

export default ProtectedRouter;
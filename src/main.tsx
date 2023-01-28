import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import {BrowserRouter} from "react-router-dom";
import {AuthContextProvider} from "./context/AuthContext";
import {ChatContextProvider} from "./context/ChatContext";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <AuthContextProvider>
            <ChatContextProvider>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            </ChatContextProvider>
        </AuthContextProvider>
    </BrowserRouter>,
)

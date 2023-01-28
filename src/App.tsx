import React from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import ProtectedRouter from "./components/route/ProtectedRoute";

const App = () => {

    return (
        <>
            <Routes>
                <Route path="/">
                    <Route index element={
                        <ProtectedRouter>
                        <Home/>
                    </ProtectedRouter> }/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>

                </Route>
            </Routes>
        </>

)
}

export default App

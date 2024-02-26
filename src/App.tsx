import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Header from "./components/Header";

const App = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Navigate to={'/main'}/>}/>
                <Route path={'/main'} element={<Main/>}/>
                <Route path={'/collections'}/>
                <Route path={'/collections/:id'}/>
                <Route path={'/users'}/>
                <Route path={'/users/:id'}/>
                <Route path={'/search'}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Header from "./components/Header";
import {RootState} from "./store";
import {useSelector} from "react-redux";

const App = () => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    return (
        <>
            <Header/>
            <main className={`${theme === 'dark' ? 'bg-neutral-900 text-neutral-200' : 'bg-neutral-100 text-neutral-900'} relative w-full flex grow`}>
                <Routes>
                    <Route path={'/'} element={<Navigate to={'/main'}/>}/>
                    <Route path={'/main'} element={<Main/>}/>
                    <Route path={'/collections'}/>
                    <Route path={'/collections/:id'}/>
                    <Route path={'/users'}/>
                    <Route path={'/users/:id'}/>
                    <Route path={'/search'}/>
                </Routes>
            </main>
        </>
    );
}

export default App;

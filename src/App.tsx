import React, {useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Header from "./components/Header";
import {RootState} from "./store";
import {useSelector} from "react-redux";
import Search from "./pages/Search";
import Collections from "./pages/Collections";
import Users from "./pages/Users";
import Collection from "./pages/Collections/Collection";
import Item from "./pages/Collections/Collection/Item";
import User from "./pages/Users/User";

const App = () => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);
    const [top, setTop] = useState(0);

    return (
        <>
            <Header/>
            <main className={`${theme === 'dark' ? 'bg-neutral-900 text-neutral-200' : 'bg-neutral-100 text-neutral-900'} 
            overflow-y-auto styled_scrollbar w-full flex flex-wrap grow`} onScroll={(e) => {
                    setTop(e.currentTarget.scrollTop)
            }} style={{boxShadow: top === 0 ? '' : 'inset 0 7px 9px -7px rgba(0,0,0,0.4)'}}>
                <Routes>
                    <Route path={'/'} element={<Navigate to={'/main'}/>}/>
                    <Route path={'/main'} element={<Main/>}/>
                    <Route path={'/collections'} element={<Collections/>}/>
                    <Route path={'/collections/:id'} element={<Collection/>}/>
                    <Route path={'/collections/:id/:id'} element={<Item setTop={setTop}/>}/>
                    <Route path={'/users'} element={<Users/>}/>
                    <Route path={'/users/:id'} element={<User/>}/>
                    <Route path={'/search'} element={<Search/>}/>
                </Routes>
            </main>
        </>
    );
}

export default App;

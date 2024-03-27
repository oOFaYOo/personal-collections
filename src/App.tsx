import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Header from "./components/Header";
import {RootState} from "./store";
import {useDispatch, useSelector} from "react-redux";
import Search from "./pages/Search";
import Collections from "./pages/Collections";
import Items from "./pages/Items";
import Users from "./pages/Users";
import Collection from "./pages/Collections/Collection";
import Item from "./pages/Items/Item";
import User from "./pages/Users/User";
import api from "./api_client";
import {setCurrentUser} from "./store/slice";
import {makeRequest} from "./functions";

const App = () => {
    const dispatch = useDispatch();
    const {theme, currentUser} = useSelector((state: RootState) => state.PersonalCollectionsStore);
    const [top, setTop] = useState(0);

    useEffect(()=>{
        makeRequest(currentUser, (data)=> {dispatch(setCurrentUser(data))}, api.AuthRequests.getCurrentUser())
    },[])

    return (
        <>
            <Header/>
            <main className={`${theme === 'dark' ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-900'} 
            overflow-y-auto styled_scrollbar w-full flex flex-wrap grow`} onScroll={(e) => {
                    setTop(e.currentTarget.scrollTop)
            }} style={{boxShadow: top === 0 ? '' : 'inset 0 7px 9px -7px rgba(0,0,0,0.4)'}}>
                <Routes>
                    <Route path={'/'} element={<Navigate to={'/main'}/>}/>
                    <Route path={'/main'} element={<Main/>}/>
                    <Route path={'/collections'} element={<Collections/>}/>
                    <Route path={'/collections/:id'} element={<Collection/>}/>
                    <Route path={'/items'} element={<Items/>}/>
                    <Route path={'/collections/:collectionId/:itemId'} element={<Item setTop={setTop}/>}/>
                    <Route path={'/users'} element={<Users/>}/>
                    <Route path={'/users/:id'} element={<User/>}/>
                    <Route path={'/search'} element={<Search/>}/>
                </Routes>
            </main>
        </>
    );
}

export default App;

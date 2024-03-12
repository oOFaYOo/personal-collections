import React, {useEffect, useMemo, useState} from "react";
import {useLocation} from "react-router-dom";
import Table from "../../components/Table";
import api from "../../api_client";
import {IUser} from "../../api_client/type";
import {ITableItem} from "../../components/Table/type";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {CircularProgress} from "@mui/material";
import {setCurrentUser} from "../../store/slice";

const config: ITableItem [] = [
    {
        id: 'picture',
        label: '',
        type: 'picture'
    },
    {
        id: 'name',
        label: 'Name',
        type: 'text',
    },
    {
        id: 'amountCollections',
        label: 'Collections',
        type: 'number',
    },
    {
        id: 'amountItems',
        label: 'Items',
        type: 'number'
    },
    {
        id: 'description',
        label: 'Description',
        type: 'paragraph'
    },
];

const Users = () => {
    const dispatch = useDispatch();
    const path = useLocation().pathname;
    const {currentUser} = useSelector((state: RootState) => state.PersonalCollectionsStore);
    const [data, setData] = useState<IUser[] | null>(null);
    const [update, setUpdate] = useState<boolean>(false);

    (function handledConfig () {
        if (!config.find(c => c.id === 'action') && currentUser && currentUser.isAdmin) {
            config.push({
                id: 'action',
                label: '',
                type: 'action'
            });}

        if (config.find(c => c.id === 'action') && (!currentUser || !currentUser.isAdmin)) {
            config.pop();
        }

        return config;
    })()

    useEffect(() => {
        (async () => {
            if(!data || update) {
                const response = await api.getUsers();
                if (response.status === 200) {
                    setData(response.data);
                }
            }
            setUpdate(false);
        })()
    }, [currentUser, update])

    function addActions(user: IUser) {
        const actions = [
            {
                name: 'admin', callback: async (id: string) => {
                    const response = await api.changeAccessLevel(id, !user.isAdmin);
                    if(response.status === 200){
                        if (currentUser?.id === id){
                            const response = await api.getCurrentUser();
                            if (response.status === 200){
                                dispatch(setCurrentUser(response.data))
                            }
                        }
                        setUpdate(true);
                    }
                }, active: user.isAdmin
            },
            {
                name: 'block', callback: async (id: string) => {
                    if(user.blocked){
                        const response = await api.unblockUser(id);
                        if(response.status === 200){
                            setUpdate(true);
                        }
                    } else {
                        const response = await api.blockUser(id);
                        if(response.status === 200){
                            if(id === currentUser?.id){
                                api.logout(id);
                                document.location = "/main";
                                dispatch(setCurrentUser(null));
                                localStorage.removeItem('userId');
                                document.cookie = "sessionId=0; max-age=0";
                            }
                            setUpdate(true);
                        }
                    }
                }, active: user.blocked
            },
            {
                name: 'delete', callback: async (id: string) => {
                    const response = await api.deleteUser(id);
                    if(response.status === 200){
                        if(currentUser?.id === id){
                            api.logout(id);
                            document.location = "/main";
                            dispatch(setCurrentUser(null));
                            localStorage.removeItem('userId');
                            document.cookie = `${document.cookie}; max-age=0`;
                        } else {
                            setUpdate(true);
                        }
                    }
                },
            }
        ];
        return {...user, action:actions}
    }

    return (
        <div
            className={'relative w-full flex flex-wrap justify-evenly items-center grow p-4'}>
            {
                !data
                ? <CircularProgress />
                : <Table pagination={true} data={data.map((item:any) => addActions(item))} config={config}
                       onRowClick={(e, id) => {
                           document.location = path + '/' + id;
                       }}/>
            }
        </div>
    )
}


export default Users;
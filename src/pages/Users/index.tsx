import React, {useCallback, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Table from "../../components/Table";
import api from "../../api_client";
import {ITableItem} from "../../components/Table/type";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {CircularProgress} from "@mui/material";
import {setCurrentUser} from "../../store/slice";
import {useTranslation} from "react-i18next";
import {IUser} from "../../api_client/UserRequests/type";
import {handleConfigActions, makeRequest} from "../../functions";
import getConfig from "../../tableConfigs";

const Users = () => {
    const dispatch = useDispatch();
    const path = useLocation().pathname;
    const {currentUser} = useSelector((state: RootState) => state.PersonalCollectionsStore);
    const [data, setData] = useState<IUser[] | null>(null);
    const [update, setUpdate] = useState<boolean>(false);

    const {t} = useTranslation();
    const config: ITableItem[] = getConfig(t, 'table.name').users as ITableItem[];
    handleConfigActions(config, currentUser!);

    useEffect(() => {
        makeRequest(data, setData, api.UserRequests.getUsers(), update, setUpdate)
    }, [currentUser, update])

    const addActions = useCallback((user: IUser) => {
        const actions = [
            {
                name: t('buttons.admin'), callback: async (id: string) => {
                    const response = await api.UserRequests.changeAccessLevel(id, !user.isAdmin);
                    if (response.status === 200) {
                        if (currentUser?.id === id) {
                            const response = await api.AuthRequests.getCurrentUser();
                            if (response.status === 200) {
                                dispatch(setCurrentUser(response.data))
                            }
                        }
                        setUpdate(true);
                    }
                }, active: user.isAdmin
            },
            {
                name: t('buttons.block'), callback: async (id: string) => {
                    if (user.blocked) {
                        const response = await api.UserRequests.unblockUser(id);
                        if (response.status === 200) {
                            setUpdate(true);
                        }
                    } else {
                        const response = await api.UserRequests.blockUser(id);
                        if (response.status === 200) {
                            if (id === currentUser?.id) {
                                await api.AuthRequests.logout(id);
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
                name: t('buttons.delete'), callback: async (id: string) => {
                    const response = await api.UserRequests.deleteUser(id);
                    if (response.status === 200) {
                        if (currentUser?.id === id) {
                            await api.AuthRequests.logout(id);
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
        return {...user, action: actions}
    }, [data])

    return (
        <div
            className={'relative w-full flex flex-wrap justify-evenly items-center grow p-4'}>
            {
                !data
                    ? <CircularProgress/>
                    : <Table pagination={true} data={data.map((item: any) => addActions(item))} config={config}
                             onRowClick={(e, id) => {
                                 document.location = path + '/' + id;
                             }}/>
            }
        </div>
    )
}

export default React.memo(Users);
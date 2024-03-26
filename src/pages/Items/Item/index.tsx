import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {Button, Chip, CircularProgress, Modal} from "@mui/material";
import Accordion from "../../../components/Accordion"
import ItemForm from "../../../components/forms/ItemForm";
import {IItem as IItemComponents} from "./type";
import api from "../../../api_client";
import CommentsBlock from "./CommentsBlock";
import AdditionalDataContainer from "../../../components/containers/AdditionalDataContainer";
import {useTranslation} from "react-i18next";
import {IItem} from "../../../api_client/ItemRequests/type";
import {ICollection} from "../../../api_client/CollectionRequests/type";
import {getAccordionData, makeRequest} from "../../../functions";
// @ts-ignore
import noImg from "../../../svg/no-img.svg";
import {setSearchTag, setSearchValue} from "../../../store/slice";

const Item = ({setTop}: IItemComponents) => {
    const dispatch = useDispatch();
    const {collectionId, itemId} = useParams();
    const {currentUser} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [item, setItem] = useState<IItem | null>(null);
    const [updateItem, setUpdateItem] = useState<boolean>(false);

    const {t} = useTranslation();

    useEffect(() => {
        makeRequest(item, setItem, api.ItemRequests.getItem(itemId!), updateItem, setUpdateItem)
    }, [updateItem])

    return (
        <div className={`${item ? '' : 'justify-center items-center'} w-full flex grow md:flex-row flex-col`}>
            {
                <Modal
                    open={openModal}
                    onClose={() => {
                        setOpenModal(false);
                    }}
                    sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                    <ItemForm setOpenModal={setOpenModal}
                              currentCollection={item?.collection as ICollection}
                              currentItem={item!} setUpdate={setUpdateItem}/>
                </Modal>
            }
            {
                !item
                    ? <CircularProgress/>
                    : <>
                        <div
                            className={`${item ? '' : 'justify-center'} flex flex-col w-full md:w-[65%] items-center px-4 py-4 
                md:max-h-[90vh] styled_scrollbar overflow-y-auto`}
                            onScroll={(e) => {
                                setTop(e.currentTarget.scrollTop)
                            }}>
                            <div className={'w-full flex-col md:flex-row flex mb-4 md:max-h-[48vh] mb-4 md:min-h-[260px]'}>
                                <div className={'md:h-full pb-4 md:w-[50%] h-[250px] flex justify-center items-center'}>
                                    <div
                                        className={'relative h-[245px] md:min-w-[245px] w-[245px] rounded-full ' +
                                            'shadow-md overflow-hidden flex justify-center items-center bg-neutral-100'}>
                                        <img src={item.picture ? item.picture : noImg} className={'relative max-w-[140%]'} alt={'item avatar'}/></div>
                                </div>
                                <div className={'flex w-full md:w-[50%] flex-col'}>
                                    <div className={'flex justify-between md:flex-row flex-col-reverse'}>
                                        <div className={'flex flex-col p-2'}>
                                            <h1 className={'text-xl font-bold'}>{item.name}</h1>
                                            <p className={'opacity-30 text-sm'}>{item.id}</p>
                                            <h2 className={'font-semibold italic'}>{t(`theme.${item.theme}`)}</h2>
                                            <Link to={`/users/${item.userId}`}>
                                                <h3 className={'text-lg font-semibold text-[#1976d2]'}>{t("author")}</h3>
                                            </Link>
                                        </div>
                                        <div
                                            className={'relative flex items-center justify-center md:justify-start md:flex-col lg:flex-row lg:h-8 gap-1'}>
                                            {currentUser?.isAdmin || currentUser?.id === item.userId
                                                ? <>
                                                    <Button size={'small'} sx={{width: '100%', maxWidth: 150}}
                                                            variant="outlined"
                                                            onClick={() => setOpenModal(true)}
                                                    >{t('buttons.edit')}</Button>
                                                    <Button size={'small'} sx={{width: '100%', maxWidth: 150}}
                                                            variant="outlined" onClick={async () => {
                                                        await api.ItemRequests.deleteItem(itemId!);
                                                        document.location = `/collections/${collectionId}`;
                                                    }}
                                                    >{t('buttons.delete')}</Button></>
                                                : null
                                            }
                                        </div>
                                    </div>
                                    <div
                                        className={'flex max-h-[150px] opacity-70 flex-wrap grow overflow-y-auto gap-1 styled_scrollbar p-2'}>
                                        {
                                            (item.tags.split(' ')).filter(value => !!value).map((tag, index) =>
                                                <Chip key={index} label={`#${tag}`} variant="outlined"
                                                      className={'hover:border-sky-600 cursor-default'}
                                                      sx={{color: 'inherit'}} onClick={() => {
                                                        localStorage.searchTag = tag;
                                                        dispatch(setSearchTag(tag));
                                                        dispatch(setSearchValue(''));
                                                        localStorage.removeItem('searchValue');
                                                        document.location = '/search'
                                                }}/>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div
                                className={'w-full mb-2 pl-8 flex flex-wrap justify-evenly md:justify-start gap-8 lg:gap-16'}>
                                {
                                    ['text', 'number', 'checkbox', 'date'].map((value, i) =>
                                        <AdditionalDataContainer itemKey={value} item={item} date={value === 'date'}
                                                                 key={i}/>)
                                }
                            </div>
                            {
                                item.paragraph1 || item.paragraph2 || item.paragraph3
                                    ? <Accordion data={getAccordionData(item)}/>
                                    : null
                            }
                        </div>
                        <CommentsBlock item={item!}/>
                    </>
            }
        </div>
    )
}

export default React.memo(Item);
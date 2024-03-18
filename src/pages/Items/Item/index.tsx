import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {Button, Checkbox, Chip, CircularProgress, Modal} from "@mui/material";
import Accordion from "../../../components/Accordion"
import ItemForm from "../../../components/forms/ItemForm";
import {ICollection, IItem} from "../../../api_client/type";
import {IItem as IItemComponents} from "./type";
// @ts-ignore
import noImg from "../../../svg/no-img.svg";
import api from "../../../api_client";
import CommentsBlock from "./CommentsBlock";
import AdditionalDataContainer from "../../../components/AdditionalDataContainer";
import {useTranslation} from "react-i18next";

const Item = ({setTop}: IItemComponents) => {
    const {collectionId, itemId} = useParams();
    const {currentUser} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [item, setItem] = useState<IItem | null>(null);
    const [updateItem, setUpdateItem] = useState<boolean>(false);

    const {t, i18n} = useTranslation();

    useEffect(() => {
        (
            async () => {
                if (!item || updateItem) {
                    const response = await api.getItem(itemId!);
                    if (response.status === 200) {
                        setItem(response.data);
                    }
                }
                setUpdateItem(false);
            }
        )()
    }, [updateItem])

    function getAccordionData(item: IItem) {
        const accordionData = [];
        if (item.paragraph1) accordionData.push({
            title: (item.collection as ICollection).paragraph1.label,
            details: item.paragraph1
        })
        if (item.paragraph2) accordionData.push({
            title: (item.collection as ICollection).paragraph2.label,
            details: item.paragraph2
        })
        if (item.paragraph3) accordionData.push({
            title: (item.collection as ICollection).paragraph3.label,
            details: item.paragraph3
        })
        return accordionData;
    }

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
                                    {
                                        item.picture
                                            ? <img
                                                src={item.picture}
                                                className={'relative h-full rounded-full shadow-md'}/>
                                            : <div
                                                className={'relative h-[245px] md:min-w-[245px] w-[245px] rounded-full ' +
                                                    'shadow-md overflow-hidden flex justify-center items-center bg-neutral-100'}>
                                                <img src={noImg} className={'relative max-w-[140%]'}/></div>
                                    }
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
                                                    <Button size={'small'} sx={{width: '100%', minWidth:120, maxWidth:150}}
                                                            variant="outlined"
                                                            onClick={() => setOpenModal(true)}
                                                    >{t('edit')}</Button>
                                                    <Button size={'small'} sx={{width: '100%', minWidth: 120, maxWidth:150}}
                                                            variant="outlined" onClick={async () => {
                                                        await api.deleteItem(itemId!);
                                                        document.location = `/collections/${collectionId}`;
                                                    }}
                                                    >{t('delete')}</Button></>
                                                : null
                                            }
                                        </div>
                                    </div>
                                    <div
                                        className={'flex mobile:max-h-[150px] sm:max-h-[150px] opacity-70 flex-wrap grow ' +
                                            'overflow-y-auto text-justify gap-1 styled_scrollbar p-2'}>
                                        {
                                            (item.tags.split(', ')).map((tag, index) =>
                                                <Chip key={index} label={`#${tag}`} variant="outlined"
                                                      className={'hover:border-sky-600 cursor-default'}
                                                      sx={{color: 'inherit'}}/>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div
                                className={'w-full mb-2 pl-8 flex flex-wrap justify-evenly md:justify-start gap-8 lg:gap-16'}>
                                <AdditionalDataContainer keys={['date1', 'date2', 'date3']} item={item} date/>
                                <AdditionalDataContainer keys={['number1', 'number2', 'number3']} item={item}/>
                                {
                                    (item.collection as ICollection).checkbox1.label
                                    || (item.collection as ICollection).checkbox2.label
                                    || (item.collection as ICollection).checkbox3.label
                                    || item.text1 || item.text2 || item.text3
                                        ? <div className={'flex flex-col'}>
                                            {
                                                (item.collection as ICollection).checkbox1.label
                                                    ? <div>
                                                        <h3 className={'font-semibold'}>{(item.collection as ICollection).checkbox1.label}:</h3>
                                                        <Checkbox disabled defaultChecked={item.checkbox1} sx={{
                                                            padding: 0,
                                                            color: 'inherit',
                                                            opacity: '0.7',
                                                            '&.Mui-disabled': {
                                                                color: 'inherit',
                                                                opacity: '0.3',
                                                            }
                                                        }}/>
                                                    </div>
                                                    : null
                                            }
                                            {(item.collection as ICollection).checkbox2.label
                                                ? <div>
                                                    <h3 className={'font-semibold'}>{(item.collection as ICollection).checkbox2.label}:</h3>
                                                    <Checkbox disabled defaultChecked={item.checkbox2} sx={{
                                                        padding: 0,
                                                        color: 'inherit',
                                                        opacity: '0.7',
                                                        '&.Mui-disabled': {
                                                            color: 'inherit',
                                                            opacity: '0.3',
                                                        }
                                                    }}/>
                                                </div>
                                                : null
                                            }
                                            {
                                                (item.collection as ICollection).checkbox3.label
                                                    ? <div>
                                                        <h3 className={'font-semibold'}>{(item.collection as ICollection).checkbox3.label}:</h3>
                                                        <Checkbox disabled defaultChecked={item.checkbox3} sx={{
                                                            padding: 0,
                                                            color: 'inherit',
                                                            opacity: '0.7',
                                                            '&.Mui-disabled': {
                                                                color: 'inherit',
                                                                opacity: '0.3',
                                                            }
                                                        }}/>
                                                    </div>
                                                    : null
                                            }
                                        </div>
                                        : null
                                }
                                <AdditionalDataContainer keys={['text1', 'text2', 'text3']} item={item}/>
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
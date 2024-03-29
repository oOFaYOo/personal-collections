import React, {useState} from "react";
import InputFileUpload from "../../inputs/UploadImage";
import {Button} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import CustomInput from "../../inputs/Input";
import {IForm} from "../type";
import api from "../../../api_client";
import {useTranslation} from "react-i18next";
import {ICollection} from "../../../api_client/CollectionRequests/type";
import {IItem} from "../../../api_client/ItemRequests/type";
import AdditionalFormDataContainer from "../../containers/AdditionalFormDataContainer";
import {AdditionalColumnType} from "../../Table/type";

const InputForm = ({setOpenModal, currentCollection, currentItem, setUpdate}: IForm & {
    currentCollection?: ICollection,
    currentItem?: IItem
}) => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);
    const {t} = useTranslation();

    const [name, setName] = useState<string>(currentItem ? currentItem.name : '');
    const [tags, setTags] = useState<string>(currentItem ? currentItem.tags : '');
    const [picture, setPicture] = useState<string>(currentItem ? currentItem.picture : '');

    const [textFields, setTextFields] = useState<(string)[]>(
        // @ts-ignore
        [1, 2, 3].map((item) => currentItem ? currentItem['text' + item] : '')
    );
    const [numberFields, setNumberFields] = useState<(string)[]>(
        // @ts-ignore
        [1, 2, 3].map((item) => currentItem ? currentItem['number' + item] : '')
    );
    const [checkboxFields, setCheckboxFields] = useState<(boolean)[]>(
        // @ts-ignore
        [1, 2, 3].map((item) => currentItem && currentCollection['checkbox' + item].label ? currentItem['checkbox' + item] : null)
    );
    const [dateFields, setDateFields] = useState<(string)[]>(
        // @ts-ignore
        [1, 2, 3].map((item) => currentItem ? currentItem['date' + item] : '')
    );
    const [paragraphFields, setParagraphFields] = useState<(string)[]>(
        // @ts-ignore
        [1, 2, 3].map((item) => currentItem ? currentItem['paragraph' + item] : '')
    );

    const additionalFormDataContainerConfig = [
        {
            invisible: currentCollection?.text1.label === '' && currentCollection?.text2.label === '' && currentCollection?.text3.label === '',
            type: 'text',
            title: `${t('titleTextField')} ${t('fields')}`,
            values: textFields,
            setValues: setTextFields,
        },
        {
            invisible: currentCollection?.number1.label === '' && currentCollection?.number2.label === '' && currentCollection?.number3.label === '',
            type: 'number',
            title: `${t('titleNumericField')} ${t('fields')}`,
            values: numberFields,
            setValues: setNumberFields,

        },
        {
            invisible: currentCollection?.checkbox1.label === '' && currentCollection?.checkbox2.label === '' && currentCollection?.checkbox3.label === '',
            type: 'checkbox',
            title: `${t('titleCheckboxField')} ${t('fields')}`,
            values: checkboxFields,
            setValues: setCheckboxFields,
        },
        {
            invisible: currentCollection?.date1.label === '' && currentCollection?.date2.label === '' && currentCollection?.date3.label === '',
            type: 'date',
            title: `${t('titleDateField')} ${t('fields')}`,
            values: dateFields,
            setValues: setDateFields,
        },
        {
            invisible: currentCollection?.paragraph1.label === '' && currentCollection?.paragraph2.label === '' && currentCollection?.paragraph3.label === '',
            type: 'paragraph',
            title: `${t('titleParagraphField')} ${t('fields')}`,
            values: paragraphFields,
            setValues: setParagraphFields,
        }
    ];

    return (
        <form className={`${theme === 'dark' ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-900'}
         p-8 gap-4 outline-none rounded-md shadow-md flex-col justify-evenly items-center overflow-y-auto max-h-[90vh] styled_scrollbar`}
              onSubmit={async (e) => {
                  e.preventDefault();
                  if (!currentCollection) return;
                  const data = {
                      picture: picture,
                      collection: currentCollection.id,
                      theme: currentCollection.theme,
                      ...Object.fromEntries([['checkbox1', checkboxFields[0]], ['checkbox2', checkboxFields[1]], ['checkbox3', checkboxFields[2]]])
                  };
                  // @ts-ignore
                  const formedData = Object.fromEntries(new FormData(e.target)) as IItem;

                  if (!currentItem) {
                      await api.ItemRequests.addItem(currentCollection?.id as string, {
                          ...formedData, ...data,
                          id: '',
                          userId: '',
                          userName: '',
                      });
                  } else {
                      await api.ItemRequests.editItemData(currentItem?.id, {
                          ...formedData, ...data,
                          id: currentItem.id,
                          userId: currentItem.userId,
                          userName: currentItem.userName,
                      })
                  }
                  setOpenModal(false);
                  setUpdate!(true);
              }}
        >
            <div className={'flex md:flex-row gap-2 flex-col items-center justify-between mb-4'}>
                {/*<InputFileUpload/>*/}
                <CustomInput value={picture} setValue={(string)=>setPicture(string)} multiline name={'picture'} placeholder={t('picturePlaceholder')}/>
                <CustomInput value={name} setValue={setName} placeholder={t('table.title')} name={'name'} required/>
                <CustomInput value={tags} setValue={setTags} placeholder={t('tagField')} required multiline
                             name={'tags'}/>
            </div>
            <div className={'flex flex-col items-center gap-4'}>
                <h3 className={'font-semibold text-lg text-center'}>{t('additionalFields')}</h3>
                {
                    additionalFormDataContainerConfig.map((value, i) =>
                        value.invisible
                            ? null
                            : <AdditionalFormDataContainer
                                key={i}
                                type={value.type as AdditionalColumnType}
                                title={value.title}
                                currentCollection={currentCollection!}
                                currentItem={currentItem!}
                                values={value.values}
                                // @ts-ignore
                                setValues={value.setValues}
                            />
                    )
                }
                <Button className={'md:w-[200px] w-full'} variant="outlined" type={'submit'}>ok</Button>
            </div>
        </form>
    )
}

export default React.memo(InputForm);
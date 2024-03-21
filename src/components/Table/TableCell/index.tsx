import React from "react";
import {TableCell as TableCellMUI} from "@mui/material";
import {Button} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {IAction, ITableCell} from "../type";
// @ts-ignore
import noAvatar from "../../../svg/no-profile-picture.svg";
// @ts-ignore
import noImg from "../../../svg/no-img.svg";
import {useTranslation} from "react-i18next";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Checkbox from "../../inputs/Checkbox";

const TableCell = ({row, item}: ITableCell) => {
    const {theme, collectionTheme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const {t} = useTranslation();

    return (
        <TableCellMUI
            size={'small'}
            align="center"
            sx={{
                borderColor: theme === 'dark' ? 'rgb(63,63,63)' : '',
                minWidth: '50px',
                padding: '7px',
                maxWidth: '500px',
                textWrap:'nowrap'
            }}>
            {
                item.type === 'action'
                    ? <div
                        className={'w-full h-full relative flex justify-evenly'}>
                        {row[item.id].map((action: IAction, i: number) =>
                            <Button key={i} onClick={(e) => {
                                e.stopPropagation();
                                action.callback(row.id)
                            }} size={"small"}
                                    variant={action.active ? 'contained' : 'outlined'}>
                                {action.name}
                            </Button>)}
                    </div>
                    : (item.type === 'picture'
                        ? <div
                            className={'h-[30px] w-[30px] rounded-full overflow-hidden flex justify-center items-center bg-neutral-100'}>
                            <img
                                src={!!row[item.id] ? row[item.id] : row.isAdmin === undefined ? noImg : noAvatar}
                                className={'relative max-w-[140%]'}/>
                        </div>
                        : (typeof row[item.id] === 'boolean'
                            ? <Checkbox disabled checked={row[item.id]}/>
                            : item.type === 'paragraph'
                                ?
                                <Markdown
                                    remarkPlugins={[remarkGfm]}
                                    className={'overflow-y-auto text-wrap text-justify min-w-[200px] max-h-[100px] styled_scrollbar'}>
                                    {row[item.id]}
                                </Markdown>
                                : item.type === 'date'
                                    ? row[item.id].split('-').reverse().join('.')
                                    : collectionTheme.includes(row[item.id])
                                        ? t(`theme.${row[item.id]}`)
                                        : row[item.id]))
            }
        </TableCellMUI>
    )
}

export default React.memo(TableCell);
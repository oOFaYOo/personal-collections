import React from "react";
import {TableCell as TableCellMUI} from "@mui/material";
import {Button, Checkbox} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {IAction, ITableCell} from "../type";
// @ts-ignore
import noAvatar from "../../../svg/no-profile-picture.svg";
// @ts-ignore
import noImg from "../../../svg/no-img.svg";

const TableCell = ({row, item}: ITableCell) => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    return (
        <TableCellMUI
            size={'small'}
            align="center"
            sx={{
                borderColor: theme === 'dark' ? 'rgb(63,63,63)' : '',
                minWidth: '50px',
                padding: '7px',
                maxWidth: '500px'
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
                            ? <Checkbox disabled checked sx={{
                                padding: 0,
                                '&.Mui-disabled': {
                                    color: 'inherit',
                                    opacity: '0.3',
                                }
                            }}/>
                            : item.type === 'paragraph'
                                ?
                                <p className={'overflow-y-auto text-justify min-w-[200px] max-h-[100px] styled_scrollbar'}>{row[item.id]}</p>
                                : row[item.id]))
            }
        </TableCellMUI>
    )
}

export default TableCell;
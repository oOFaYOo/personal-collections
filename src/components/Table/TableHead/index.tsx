import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import {ITableHead} from "../type";
import {Checkbox, FormControlLabel, Popover} from "@mui/material";
import {setFilterByTheme} from "../../../store/slice";

const TableHead = ({order, orderBy, rowCount, config, onRequestSort}: ITableHead) => {
    const dispatch = useDispatch();
    const {theme, filterByTheme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const createSortHandler =
        (property: string) => (event: React.MouseEvent) => {
            onRequestSort(event, property);
        };

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        // @ts-ignore
            <TableRow>
                {config.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'center'}
                        size={'small'}
                        sx={{fontWeight: 'bold', color: 'inherit', whiteSpace: 'nowrap', padding: '5px'}}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {
                            headCell.label
                        }
                        {
                            (headCell.type !== 'paragraph' &&
                             headCell.type !== 'checkbox' &&
                                headCell.type !== 'action' &&
                                headCell.type !== 'picture')
                                ? <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                    sx={{
                                        '.MuiTableSortLabel-icon': {
                                            color: theme === 'dark'
                                                ? 'rgb(245 245 245) !important'
                                                : 'rgb(23 23 23) !important'
                                        }
                                    }}
                                />
                                : null
                        }
                        {
                            headCell.id === 'theme'
                                ? <>
                                    <button onClick={handleClick}>
                                        <FilterAltIcon fontSize={'small'} className={`${open ? 'opacity-100' : 'opacity-0'} hover:opacity-30`} />
                                    </button>
                                    <Popover
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <div
                                            className={`${theme === 'dark' ?
                                                'bg-neutral-900 text-neutral-200' 
                                                : 'bg-neutral-100 text-neutral-900'} p-4 flex flex-col gap-2`}>
                                            {
                                                headCell.id === 'theme'
                                                ? filterByTheme.map((item, index)=>
                                                        <FormControlLabel key={index} control={<Checkbox defaultChecked sx={{
                                                            padding: 0,
                                                            marginRight: '6px',
                                                            color: 'inherit',
                                                            '&.Mui-disabled': {
                                                                color: 'inherit',
                                                                opacity: '0.3',
                                                            }
                                                        }} checked={item.filtered}
                                                            onChange={(e)=>{
                                                                const arr = filterByTheme.slice(0);
                                                                arr[index] = {...arr[index], filtered: e.currentTarget.checked};
                                                                dispatch(setFilterByTheme(arr));
                                                            }}/>}
                                                        label={item.collectionTheme}/>
                                                    )
                                                : ''
                                            }
                                        </div>
                                    </Popover>
                                </>
                                : null
                        }
                    </TableCell>
                ))}
            </TableRow>
    )
}

export default TableHead;
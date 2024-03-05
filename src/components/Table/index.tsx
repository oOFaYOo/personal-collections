import * as React from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TableSortLabel from '@mui/material/TableSortLabel';
import {useSelector} from "react-redux";
import {RootState} from "../../store";
// @ts-ignore
import noImg from "../../svg/no-img.svg";
// @ts-ignore
import noAvatar from "../../svg/no-profile-picture.svg";
import {Checkbox, Button, Popover, FormControl, MenuItem, Select} from '@mui/material';
import {useState} from "react";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: any },
    b: { [key in Key]: any },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    config: { id: string, label: string, type: 'text' | 'paragraph' | 'number' | 'date' | 'checkbox' | 'picture' | 'action' }[];
    sorting?: boolean;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);
    const {order, orderBy, rowCount, config, sorting, onRequestSort} =
        props;
    const createSortHandler =
        (property: any) => (event: React.MouseEvent<unknown>) => {
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
        <TableHead>
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
                            (headCell.type !== 'paragraph' && headCell.type !== 'checkbox' && headCell.type !== 'action' && headCell.type !== 'picture')
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
                                // : (
                                //     headCell.type === 'checkbox'
                                //         ? <>
                                //             <button onClick={handleClick}>
                                //                 <FilterAltIcon fontSize={'small'} className={'opacity-0 hover:opacity-30'} />
                                //             </button>
                                //             <Popover
                                //                 id={id}
                                //                 open={open}
                                //                 anchorEl={anchorEl}
                                //                 onClose={handleClose}
                                //                 anchorOrigin={{
                                //                     vertical: 'bottom',
                                //                     horizontal: 'right',
                                //                 }}
                                //             >
                                //                 <FormControl sx={{minWidth: 120, m:1, overflow:'hidden' }}>
                                //                     <Select
                                //                         sx={{height:30}}
                                //                         value={1}
                                //                         onChange={()=>{}}
                                //                     >
                                //                         <MenuItem value={1}>All</MenuItem>
                                //                         <MenuItem value={2}>True</MenuItem>
                                //                         <MenuItem value={3}>False</MenuItem>
                                //                     </Select>
                                //                 </FormControl>
                                //             </Popover>
                                //         </>
                                        : null
                            // )
                        }
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function EnhancedTable(
    {onRowClick, data, sorting, config, pagination}:
        {
            pagination?: boolean,
            sorting?: boolean,
            onRowClick?: (event: React.MouseEvent<unknown>, id: any) => void,
            data: any[],
            config: { id: string, label: string, type: 'text' | 'paragraph' | 'number' | 'date' | 'checkbox' | 'picture' | 'action' }[]
        }) {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<any>('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: any,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const visibleRows = React.useMemo(
        () =>
            stableSort(data, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    return (
        <TableContainer
            className={`${theme === 'dark' ? 'shadow-black/70' : ''} styled_scrollbar w-full overflow-y-auto relative rounded-md shadow-md`}>
            <Table
                sx={{width: '100%'}}
                aria-labelledby="tableTitle"
                size={'medium'}
            >
                <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    sorting={sorting}
                    onRequestSort={handleRequestSort}
                    rowCount={data.length}
                    config={config}
                />
                {visibleRows.map((row, index) => {
                    return (
                        <TableRow
                            hover={!!onRowClick}
                            onClick={(event) => onRowClick ? onRowClick(event, row.id) : ()=>{}}
                            tabIndex={-1}
                            key={row.id}
                            sx={{
                                cursor: onRowClick ? 'pointer' : 'default',
                            }}
                        >
                            {
                                config.map((item, index) => {
                                    // @ts-ignore
                                    return <TableCell
                                        sx={{
                                            borderColor: theme === 'dark' ? 'rgb(63,63,63)' : '',
                                            minWidth: '50px',
                                            padding: '7px'
                                        }}
                                        size={'small'}
                                        align="center">
                                        {
                                            item.type === 'action'
                                                ? <div
                                                    className={'w-full h-full relative flex justify-evenly'}>{row[item.id].map((action: { name: string, callback: any, active?: boolean }, i: number) =>
                                                    <Button onClick={(e) => {
                                                        e.stopPropagation();
                                                        action.callback(row.id)
                                                    }} size={"small"}
                                                            variant={action.active ? 'contained' : 'outlined'}>{action.name}</Button>)}</div>
                                                : (item.type === 'picture'
                                                    ? <div className={'h-[30px] w-[30px] rounded-full overflow-hidden flex justify-center items-center bg-neutral-100'}>
                                                            <img
                                                            src={row[item.id] === 'user' ? noAvatar : (row[item.id] === 'other' ? noImg : row[item.id])}
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
                                                        // @ts-ignore
                                                        : item.type === 'paragraph'
                                                            ?
                                                            <p className={'overflow-y-auto min-w-[200px] max-h-[100px] styled_scrollbar'}>{row[item.id]}</p>
                                                            : row[item.id]))
                                        }
                                    </TableCell>
                                })
                            }
                        </TableRow>
                    )
                })}
            </Table>
            {pagination
                ? <TablePagination
                    sx={{
                        color: 'inherit',
                        '.MuiSvgIcon-root': {color: 'inherit'},
                        '.Mui-disabled': {color: 'inherit !important', opacity: '50%'}
                    }}
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                : null}
        </TableContainer>
    );
}
import * as React from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import {useSelector} from "react-redux";
import {RootState} from "../../store";

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
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
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
    config: { id: string, label: string, type: 'text' | 'paragraph' | 'number' | 'date' | 'checkbox' }[];
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

    return (
        <TableHead>
            <TableRow>
                {config.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'center'}
                        padding={'normal'}
                        size={'small'}
                        sx={{fontWeight: 'bold', color: 'inherit', whiteSpace: 'nowrap'}}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {
                            headCell.label
                        }
                        {
                            (sorting && headCell.type === 'paragraph') || (sorting && headCell.type === 'checkbox')
                                ? null
                                : <TableSortLabel
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
            onRowClick: (event: React.MouseEvent<unknown>, id: any) => void,
            data: any[],
            config: { id: string, label: string, type: 'text' | 'paragraph' | 'number' | 'date' | 'checkbox' }[]
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
        <TableContainer className={'styled_scrollbar rounded-md shadow-md'}>
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
                            hover
                            onClick={(event) => onRowClick(event, row.id)}
                            tabIndex={-1}
                            key={row.id}
                            sx={{
                                cursor: 'pointer',
                            }}
                        >
                            {
                                config.map((item, index) => {
                                    // @ts-ignore
                                    return <TableCell sx={{borderColor: theme === 'dark' ? 'rgb(63,63,63)' : '', maxWidth:'150px'}}
                                           size={'small'} align="center">{row[item.id]}</TableCell>
                                })
                            }
                        </TableRow>
                    );
                })}
            </Table>
            {pagination
                ? <TablePagination
                    sx={{
                        position: 'sticky',
                        bottom: 0,
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
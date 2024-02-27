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

const headCells = [
    {
        id: 'title',
        label: 'title',
        type: 'text',
    },
    {
        id: 'date',
        label: 'date',
        type: 'date',
    },
    {
        id: 'amount',
        label: 'amount',
        type: 'number'
    },
];

const rows = [
    {id: '', title: 'sometitle', date: '05.03.2021', amount: 354},
    {id: '', title: 'sometitle3', date: '05.03.2022', amount: 543},
    {id: '', title: 'sometitle1', date: '05.03.2015', amount: 154},
    {id: '', title: 'sometitle', date: '05.03.2021', amount: 354},
    {id: '', title: 'sometitle3', date: '05.03.2022', amount: 543},
    {id: '', title: 'sometitle1', date: '05.03.2015', amount: 154},
    {id: '', title: 'sometitle', date: '05.03.2021', amount: 354},
    {id: '', title: 'sometitle3', date: '05.03.2022', amount: 543},
    {id: '', title: 'sometitle1', date: '05.03.2015', amount: 154},
    {id: '', title: 'sometitle', date: '05.03.2021', amount: 354},
    {id: '', title: 'sometitle3', date: '05.03.2022', amount: 543},
    {id: '', title: 'sometitle1', date: '05.03.2015', amount: 154},
    {id: '', title: 'sometitle', date: '05.03.2021', amount: 354},
    {id: '', title: 'sometitle3', date: '05.03.2022', amount: 543},
    {id: '', title: 'sometitle1', date: '05.03.2015', amount: 154},
    {id: '', title: 'sometitle', date: '05.03.2021', amount: 354},
    {id: '', title: 'sometitle3', date: '05.03.2022', amount: 543},
    {id: '', title: 'sometitle1', date: '05.03.2015', amount: 154},
];

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
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const {order, orderBy, rowCount, onRequestSort} =
        props;
    const createSortHandler =
        (property: any) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'center'}
                        padding={'normal'}
                        sx={{fontWeight: 'bold', color: 'inherit'}}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {
                            headCell.label
                        }
                        {
                            headCell.type === 'paragraph' || headCell.type === 'checkbox'
                                ? null
                                : <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                    sx={{
                                        '.MuiTableSortLabel-icon': {color: theme === 'dark'
                                                ? 'rgb(245 245 245) !important'
                                                : 'rgb(23 23 23) !important'}
                                }}
                                />
                        }
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function EnhancedTable() {
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

    const handleClick = (event: React.MouseEvent<unknown>, id: any) => {
        alert(id)
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
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    return (
        <TableContainer>
            <Table
                sx={{minWidth: 750}}
                aria-labelledby="tableTitle"
                size={'medium'}
            >
                <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                />
                {visibleRows.map((row, index) => {
                    return (
                        <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.id)}
                            tabIndex={-1}
                            key={row.id}
                            sx={{
                                cursor: 'pointer',
                            }}
                        >
                            {
                                headCells.map((item, index) => {
                                    // @ts-ignore
                                    return <TableCell sx={{borderColor: theme === 'dark' ? 'rgb(63,63,63)' : ''}} align="center">{row[item.id]}</TableCell>
                                })
                            }
                        </TableRow>
                    );
                })}
            </Table>
            <TablePagination
                sx={{
                    position:'sticky',
                    bottom: 0,
                    color: 'inherit',
                    '.MuiSvgIcon-root': {color: 'inherit'},
                    '.Mui-disabled': {color: 'inherit !important', opacity: '50%'}
                }}
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}
import React from 'react';
import {Table as TableMUI} from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {ITable, OrderType} from "./type";
import TableHeader from "./TableHead";
import TableRow from "./TableRow";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<Key extends keyof any>(
    order: OrderType,
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

const Table = (
    {onRowClick, data, config, pagination}: ITable) => {

    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [order, setOrder] = React.useState<OrderType>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('');
    const [page, setPage] = React.useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

    const handleRequestSort = (
        event: React.MouseEvent<Element, MouseEvent>,
        property: string,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
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
        [order, orderBy, page, rowsPerPage, data],
    );

    return (
        <TableContainer
            className={`${theme === 'dark' ? 'shadow-black/70' : ''} styled_scrollbar w-full overflow-y-auto relative rounded-md shadow-md`}>
            <TableMUI
                sx={{width: '100%'}}
                aria-labelledby="tableTitle"
                size={'medium'}
            >
                <TableHeader
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={data.length}
                    config={config}
                />
                {visibleRows.map((row, index) => <TableRow key={index} row={row} config={config}
                                                           onRowClick={onRowClick}/>)}
            </TableMUI>
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

export default Table;
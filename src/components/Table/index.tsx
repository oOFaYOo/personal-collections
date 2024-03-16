import React from 'react';
import {Table as TableMUI} from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {ITable, OrderType} from "./type";
import TableHeader from "./TableHead";
import TableRow from "./TableRow";
import {getComparator, stableSort} from "./functions";

const Table = (
    {onRowClick, data, config, pagination, filtering}: ITable) => {

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
                    filtering={filtering}
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

export default React.memo(Table);
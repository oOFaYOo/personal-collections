import React from "react";
import TableCell from "../TableCell";
import {TableRow as TableRowMUI} from "@mui/material";
import {ITableRow} from "../type";

const TableRow = ({config, row, onRowClick}: ITableRow) => {

    return (
        <TableRowMUI
            hover={!!onRowClick}
            onClick={(event) => onRowClick ? onRowClick(event, row.id, row) : () => {
            }}
            tabIndex={-1}
            key={row.id}
            sx={{
                cursor: onRowClick ? 'pointer' : 'default',
            }}
        >
            {
                config.map((item, index) =>
                    <TableCell row={row} item={item} key={index}/>
                )
            }
        </TableRowMUI>
    )
}

export default TableRow;
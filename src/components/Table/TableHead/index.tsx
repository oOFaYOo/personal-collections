import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import {ITableProps} from "../type";

const TableHead = ({order, orderBy, rowCount, config, onRequestSort}: ITableProps) => {

    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const createSortHandler =
        (property: string) => (event: React.MouseEvent) => {
            onRequestSort(event, property);
        };

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
                    </TableCell>
                ))}
            </TableRow>
    )
}

export default TableHead;
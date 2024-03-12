import {ThemeType} from "../../api_client/type";
import {OrderType} from "./type";

export function filter(rows: any, filterByTheme:{collectionTheme: ThemeType, filtered: boolean}[]) {
    let arrByTheme = filterByTheme.filter((item) => item.filtered);
    if (arrByTheme.length === 0 || arrByTheme.length === filterByTheme.length) {
        return rows;
    } else {
        return rows.filter((row: any) =>
            arrByTheme.find((condition:any) =>
                row.theme === condition.collectionTheme
            )
        )
    }
}

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export function getComparator<Key extends keyof any>(
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

export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
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

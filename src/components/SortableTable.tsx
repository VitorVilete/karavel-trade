import React, { Component } from 'react';
import { TableBody, Table, TableHead, TableCell, TableSortLabel, TableRow } from '@material-ui/core';

// TODO Implement sorting
interface Props {
    data: any;
    header: Array<Header>;
    columnToSort: string;
    sortDirection: string;
}

interface Header {
    id: string;
    numeric?: boolean;
    disablePadding?: boolean;
    label: string;
}
interface State {
    columnToSort: string;
    sortDirection: string;
}

export default class SortableTable extends Component<Props, State> {
    static defaultProps = {
        columnToSort: 'id',
        sortDirection: 'desc',
    };
    state: State = {
        columnToSort: this.props.columnToSort,
        sortDirection: this.props.sortDirection,
    };

    handleSort = (columnName: string): void => {
        this.setState({
            columnToSort: columnName,
            sortDirection:
                this.state.columnToSort === columnName ? this.invertSortDirection(this.state.sortDirection) : 'asc',
        });
    };

    invertSortDirection(sortDirection: string): string {
        return sortDirection === 'asc' ? 'desc' : 'asc';
    }

    row(row: any, i: number, header: Header[]): JSX.Element {
        return (
            <TableRow key={i}>
                {header.map((column, k) => (
                    <TableCell key={k} align={column.numeric ? 'right' : 'left'}>
                        {row[column.id.toLowerCase()]}
                    </TableCell>
                ))}
            </TableRow>
        );
    }

    renderTableHeaderRows(): JSX.Element[] {
        const header = this.props.header;
        return header.map((column, i) => (
            <TableCell key={i} align={column.numeric ? 'right' : 'left'}>
                <TableSortLabel>{column.label}</TableSortLabel>
            </TableCell>
        ));
    }

    renderTableRows(): JSX.Element[] {
        const { data, header } = this.props;
        return data.map((row: any, i: number) => {
            return this.row(row, i, header);
        });
    }

    render(): JSX.Element {
        return (
            <Table>
                <TableHead>
                    <TableRow>{this.renderTableHeaderRows()}</TableRow>
                </TableHead>
                <TableBody>{this.renderTableRows()}</TableBody>
            </Table>
        );
    }
}

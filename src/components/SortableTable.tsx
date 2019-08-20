import React, { Component } from 'react';
import { TableBody, Table, TableHead, TableCell, TableSortLabel, TableRow } from '@material-ui/core';
import orderBy from 'lodash/orderBy';

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
        columnToSort: '',
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

    getSortDirection(direction: string): 'desc' | 'asc' {
        return direction === 'desc' ? 'desc' : 'asc';
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

    renderTableHeaderRows(header: Header[], columnToSort: string, sortDirection: string): JSX.Element[] {
        return header.map((column, i) => (
            <TableCell key={i} align={column.numeric ? 'right' : 'left'}>
                <TableSortLabel active={columnToSort === column.id} direction={this.getSortDirection(sortDirection)}>
                    <div
                        onClick={(): void => {
                            return this.handleSort(column.id);
                        }}
                    >
                        {column.label}
                    </div>
                </TableSortLabel>
            </TableCell>
        ));
    }

    renderTableRows(data: Array<object>, header: Header[]): JSX.Element[] {
        return data.map((row: any, i: number) => {
            return this.row(row, i, header);
        });
    }

    render(): JSX.Element {
        const { columnToSort, sortDirection } = this.state;
        const { data, header } = this.props;
        console.log(columnToSort, sortDirection);
        return (
            <Table>
                <TableHead>
                    <TableRow>{this.renderTableHeaderRows(header, columnToSort, sortDirection)}</TableRow>
                </TableHead>
                <TableBody>
                    {this.renderTableRows(orderBy(data, columnToSort, this.getSortDirection(sortDirection)), header)}
                </TableBody>
            </Table>
        );
    }
}

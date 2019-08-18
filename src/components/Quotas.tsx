import React, { Component } from 'react';
import { HttpService } from '../shared/HttpService';
import { Quota } from '../entities/Quota';
import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from '@material-ui/core';
import { Rate } from '../entities/Rate';

interface Props {
    base: string;
}
interface State {
    quotas: Quota;
    base: string;
}

export default class Quotas extends Component<Props, State> {
    state: State = {
        quotas: new Quota(),
        base: this.props.base,
    };

    static defaultProps = {
        base: 'USD',
    };

    static GET_QUOTAS_URL = 'latest';
    static headRows = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Coin' },
        { id: 'value', numeric: true, disablePadding: false, label: 'Quota' },
    ];

    findQuota(base?: string): void {
        const endpoint = `${base ? Quotas.GET_QUOTAS_URL + `?base=` + base : Quotas.GET_QUOTAS_URL}`;
        HttpService.get(`${endpoint}`).then(res => {
            const data = res.data;
            const rates = Object.entries(data.rates);
            const formattedRates: Rate[] = new Array<Rate>();
            rates.forEach(element => {
                const rate: Rate = new Rate(element[0], element[1] as number);
                formattedRates.push(rate);
            });
            const result = new Quota(data.base, data.date, formattedRates);

            this.setState({
                quotas: result,
            });
        });
    }

    componentDidMount(): void {
        this.findQuota();
    }

    handleChange(event: React.ChangeEvent<{ value: unknown }>): void {
        this.setState(
            {
                base: event.target.value as string,
            },
            () => this.findQuota(this.state.base),
        );
    }

    renderMenuItems(): JSX.Element[] {
        const quotas = this.state.quotas;
        return quotas.rates.map((row, i) => {
            return (
                <MenuItem value={row.coin} key={i}>
                    {row.coin}
                </MenuItem>
            );
        });
    }

    renderTableRows(): JSX.Element[] {
        const quotas = this.state.quotas;
        return quotas.rates.map((row, i) => {
            return (
                <TableRow key={i}>
                    <TableCell component="th" scope="row">
                        {row.coin}
                    </TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                </TableRow>
            );
        });
    }

    render(): JSX.Element {
        const { base } = this.state;
        return (
            <Box>
                <form autoComplete="off">
                    <FormControl>
                        <InputLabel htmlFor="select-multiple">Name</InputLabel>
                        <Select value={base} onChange={this.handleChange}>
                            {this.renderMenuItems()}
                        </Select>
                    </FormControl>
                </form>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Coin</TableCell>
                                <TableCell align="right">Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{this.renderTableRows()}</TableBody>
                    </Table>
                </Paper>
            </Box>
        );
    }
}

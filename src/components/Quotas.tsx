import React, { Component } from 'react';
import { HttpService } from '../shared/HttpService';
import { Quota } from '../entities/Quota';
import { Paper, FormControl, InputLabel, Select, MenuItem, Box } from '@material-ui/core';
import { Rate } from '../entities/Rate';
import SortableTable from './SortableTable';
import Cards from './Cards';

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
        { id: 'coin', numeric: false, disablePadding: true, label: 'Coin' },
        { id: 'value', numeric: true, disablePadding: false, label: 'Quota' },
    ];

    findQuota(base?: string): void {
        const endpoint = `${Quotas.GET_QUOTAS_URL + `?base=` + base}`;
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
        this.findQuota(this.state.base);
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

    render(): JSX.Element {
        const { base, quotas } = this.state;
        return (
            <Box>
                <FormControl>
                    <InputLabel htmlFor="select-multiple">Name</InputLabel>
                    <Select value={base} onChange={this.handleChange.bind(this)}>
                        {this.renderMenuItems()}
                    </Select>
                </FormControl>
                {base && quotas && <Cards data={quotas.rates} header={Quotas.headRows} />}

                <Paper>{base && quotas && <SortableTable data={quotas.rates} header={Quotas.headRows} />}</Paper>
            </Box>
        );
    }
}

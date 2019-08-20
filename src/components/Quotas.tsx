import React, { Component } from 'react';
import { HttpService } from '../shared/HttpService';
import { Quota } from '../entities/Quota';
import {
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Checkbox,
    FormControlLabel,
    Grid,
} from '@material-ui/core';
import { Rate } from '../entities/Rate';
import SortableTable from './SortableTable';
import Cards from './Cards';
interface Props {
    base: string;
}
interface State {
    quotas: Quota;
    base: string;
    isGridView: boolean;
}

export default class Quotas extends Component<Props, State> {
    state: State = {
        quotas: new Quota(),
        base: this.props.base,
        isGridView: false,
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

    // TODO: Refactor handleChange to remove the findQuota call
    handleChange(event: React.ChangeEvent<{ value: unknown }>): void {
        this.setState(
            {
                base: event.target.value as string,
            },
            () => this.findQuota(this.state.base),
        );
    }

    handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            isGridView: event.target.checked,
        });
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

    getRatesWithFlags(rates: Rate[]): Rate[]{
        let newRates: Rate[] =  new Array<Rate>();
        let copiedRates: Rate[] = [ ...rates ]
        copiedRates.forEach(copiedRate => {
            copiedRate.coin = '<span class="flag-icon flag-icon-'+copiedRate.coin.substring(0,2).toLowerCase()+'"></span>'+copiedRate.coin
            
            newRates.push(copiedRate)
        });
        return newRates
    }

    render(): JSX.Element {
        const { base, quotas, isGridView } = this.state;
        return (
            <Box>
                <Grid container spacing={3} justify="space-between">
                        <Grid item xs={12} sm={6} md={4}>
                        
                        <FormControl>
                            <InputLabel>Name</InputLabel>
                            <Select value={base} onChange={this.handleChange.bind(this)}>
                                {this.renderMenuItems()}
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isGridView}
                                        onChange={this.handleCheckboxChange.bind(this)}
                                        value="isGridView"
                                        inputProps={{
                                            'aria-label': 'primary checkbox',
                                        }}
                                    />
                                }
                                label="Grid View"
                            />
                        </FormControl>
                        </Grid>
                </Grid>
                <Paper>
                    {base && quotas && isGridView ? (
                        <Cards data={this.getRatesWithFlags(quotas.rates)} header={Quotas.headRows} />
                    ) : (
                        <SortableTable data={this.getRatesWithFlags(quotas.rates)} header={Quotas.headRows} />
                    )}
                </Paper>
            </Box>
        );
    }
}

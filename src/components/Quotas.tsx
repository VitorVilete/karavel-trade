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
    Typography,
} from '@material-ui/core';
import { Rate } from '../entities/Rate';
import SortableTable from './SortableTable';
import Cards from './Cards';
import CoinConvert from './CoinConvert';
interface Props {
    base: string;
}
interface State {
    quota: Quota;
    base: string;
    isGridView: boolean;
}

export default class Quotas extends Component<Props, State> {
    state: State = {
        quota: new Quota(),
        base: this.props.base,
        isGridView: false,
    };

    static defaultProps = {
        base: 'USD',
    };

    static GET_QUOTAS_URL = 'latest';
    static headRows = [
        { id: 'flag', numeric: false, disablePadding: false, label: 'Coin' },
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
                quota: this.setRatesWithFlags(result),
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
        const quota = this.state.quota;
        return quota.rates.map((row, i) => {
            return (
                <MenuItem value={row.coin} key={i}>
                    {row.coin}
                </MenuItem>
            );
        });
    }

    setRatesWithFlags(quota: Quota): Quota {
        quota.rates.forEach(rate => {
            rate.flag =
                '<span class="flag-icon flag-icon-' + rate.coin.substring(0, 2).toLowerCase() + '"></span>' + rate.coin;
        });
        return quota;
    }

    render(): JSX.Element {
        const { base, quota, isGridView } = this.state;
        return (
            <Box>

                {base && quota.rates.length > 0 && (
                    <Box my={5}>
                        <Grid container justify="center">
                            <Grid item xs={12} md={10}>
                                <Paper>
                                    <CoinConvert quota={quota} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                )}
                <Box py={5}>
                    <Typography variant="h6" color="inherit">
                        Rates table
                    </Typography>
                    <Grid container spacing={3} justify="space-between">
                        <Grid item xs={6}>
                            <FormControl>
                                <InputLabel>Coin</InputLabel>
                                <Select value={base} onChange={this.handleChange.bind(this)}>
                                    {this.renderMenuItems()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} className={'text-align-right'}>
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
                </Box>

                {base && quota.rates.length > 0 && isGridView ? (
                    <Cards data={quota.rates} header={Quotas.headRows} />
                ) : (
                        <Paper>
                            <SortableTable data={quota.rates} header={Quotas.headRows} />
                        </Paper>
                    )}
            </Box>
        );
    }
}

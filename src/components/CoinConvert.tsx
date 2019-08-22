import React, { Component } from 'react';
import { Quota } from '../entities/Quota';
import { Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

interface Props {
    quota: Quota;
}
interface State {
    quota: Quota;
    quantity: number;
    result: number;
    selectedRate: string;
}

export default class CoinConvert extends Component<Props, State> {
    state: State = {
        quota: this.props.quota,
        quantity: 1,
        result: 1,
        selectedRate: this.props.quota.base,
    };

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

    calculate(event: React.ChangeEvent<{ value: unknown }>): void {
        const { quota, quantity, selectedRate } = this.state;
        const coinIndex = quota.rates.findIndex(rate => rate.coin === selectedRate);

        const result: number = quota.rates[coinIndex].value * quantity;
        this.setState({
            result: result,
            selectedRate: event.target.value as string,
        });
    }

    render(): JSX.Element {
        const { quota, result, selectedRate } = this.state;
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Quota calculator
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            disabled
                            id="baseValue"
                            name="baseValue"
                            label="Base value"
                            value={quota.base}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl>
                            <InputLabel>Coin</InputLabel>
                            <Select value={selectedRate} onChange={this.calculate.bind(this)}>
                                {this.renderMenuItems()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="quantity"
                            name="quantity"
                            label="Quantity"
                            fullWidth
                            onChange={this.calculate.bind(this)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField required id="result" name="result" label="Result" value={result} fullWidth />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

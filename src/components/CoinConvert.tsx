import React, { Component } from 'react';
import { Quota } from '../entities/Quota';
import { Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

interface Props {
    quota: Quota;
}
interface State {
    quota: Quota;
    quantity: number;
    selectedRate: string;
}

export default class CoinConvert extends Component<Props, State> {
    state: State = {
        quota: this.props.quota,
        quantity: 1,
        selectedRate: this.props.quota.base,
    };

    componentDidUpdate(oldProps: Props) {
        const newProps: Props = this.props;
        if (oldProps.quota !== newProps.quota) {
            this.setState({
                quota: newProps.quota,
                selectedRate: newProps.quota.base,
            })
        }
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

    calculate = (): number => {
        const { quota, quantity, selectedRate } = this.state;
        const coinIndex = quota.rates.findIndex(rate => rate.coin === selectedRate);

        const result: number = quota.rates[coinIndex].value * quantity;
        return result
    }

    handleChange(event: React.SyntheticEvent): void {
        const regex = /^[0-9\b]+$/;
        const { name, value } = event.currentTarget as HTMLInputElement;
        if (value === '' || regex.test(value)) {
            this.setState({
                [name]: value as any
            } as Pick<State, "quota" | "quantity" | "selectedRate">);
        }
    }

    handleSelectChange(event: React.ChangeEvent<{ value: unknown }>): void {
        this.setState(
            {
                selectedRate: event.target.value as string,
            });
    }

    render(): JSX.Element {
        const { quota, selectedRate, quantity } = this.state;
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Rate calculator
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            disabled
                            id="baseValue"
                            name="baseValue"
                            label="Base value"
                            value={quota.base}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            id="quantity"
                            name="quantity"
                            label="Quantity"
                            defaultValue="1"
                            value={quantity}
                            onChange={this.handleChange.bind(this)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl>
                            <InputLabel>Coin</InputLabel>
                            <Select value={selectedRate} onChange={this.handleSelectChange.bind(this)}>
                                {this.renderMenuItems()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" color="inherit">
                            Result: {this.calculate()}
                        </Typography>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

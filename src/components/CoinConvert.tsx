import React, { Component } from 'react';
import { Quota } from "../entities/Quota";
import {
    Checkbox,
    FormControlLabel,
    Grid,
    Typography,
    TextField
} from '@material-ui/core'

interface Props {
    quota: Quota
}
interface State {
    quota: Quota
}

export default class CoinConvert extends Component<Props, State> {
    state: State = {
        quota: this.props.quota
    }

    render() {
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Shipping address
      </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            disabled
                            id="baseValue"
                            name="baseValue"
                            label="Base value"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="quantity"
                            name="quantity"
                            label="Quantity"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="result"
                            name="result"
                            label="Result"
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

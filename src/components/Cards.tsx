import React, { Component, Fragment } from 'react';
import { Card, CardContent, Typography, CardActions, Button, Paper, Grid, GridList } from '@material-ui/core';

interface Props {
    data: any;
    header: Array<Header>;
}
interface State {}

interface Header {
    id: string;
    label: string;
}

export default class Cards extends Component<Props, State> {
    state = {};

    card(element: any, i: number, header: Header[]): JSX.Element {
        return (
            <Grid item xs={12} sm={6} md={4} key={i}>
                <Card>
                    <CardContent>
                        {header.map((column, k) => (
                            <Fragment key={k}>
                                <Typography color="textSecondary" gutterBottom>
                                    {column.label}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {element[column.id.toLowerCase()]}
                                </Typography>
                            </Fragment>
                        ))}
                    </CardContent>
                </Card>
            </Grid>
        );
    }

    renderCards(): JSX.Element[] {
        const { data, header } = this.props;
        return data.map((element: any, i: number) => {
            return this.card(element, i, header);
        });
    }

    render(): JSX.Element {
        return (
            <Grid container spacing={3}>
                {this.renderCards()}
            </Grid>
        );
    }
}

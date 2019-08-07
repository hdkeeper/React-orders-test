import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getOrderItems } from 'actions';


const mstp = (state, props) => ({
    items: state.orderItems[props.id]
});

const mdtp = { getOrderItems };

@connect(mstp, mdtp)
export default class OrderCard extends Component {
    onToggle = (event, expanded) => {
        const { id, items, getOrderItems } = this.props;
        if (expanded && !items) {
            getOrderItems(id);
        }
    }

    render() {
        const { docNum, docDate, description, items } = this.props;

        return (
            <ExpansionPanel onChange={this.onToggle}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    {docNum}, {docDate}, {description}
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                    <List dense>
                        {items ?
                            items.map(item => (
                                <ListItem key={item.id}>
                                    {item.name}, {item.qty} × {item.price} = {item.sum}
                                </ListItem>
                            ))
                            :
                            <CircularProgress />
                        }
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

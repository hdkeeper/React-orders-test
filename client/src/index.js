/* eslint-env browser */
import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';

import store from './store';
import { Application } from './components';


render(
    <Provider store={store}>
        <CssBaseline />
        <Application />
    </Provider>,
    document.getElementById('root'),
);

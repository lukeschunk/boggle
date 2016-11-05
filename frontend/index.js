`use strict`;
// this is a better comment
import React from 'react';
import Luke from 'luke';
import ReactDOM from 'react-dom';
import test from 'test-dom';
import {IndexRoute, browserHistory, Router, Route} from 'react-router';
import App from './components/App';
import Boggle from './components/Boggle'

require('./resources/styles/style.scss');
require( 'bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/js/bootstrap.min');

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Boggle}/>
            <Route path="*" component={App}/>
        </Route>
    </Router>
), document.getElementById('root'));

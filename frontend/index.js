`use strict`;

import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, browserHistory, Router, Route} from 'react-router';
import App from './components/App';
import Boggle from './components/Boggle'

require('./resources/styles/style.scss');
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Boggle}/>
            <Route path="*" component={App}/>
        </Route>
    </Router>
), document.getElementById('root'));

`use strict`;

import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, browserHistory, Router, Route} from 'react-router';
import App from './components/App';

require('./resources/styles/style.scss');
import 'jquery';
import 'bootstrap/dist/js/bootstrap';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Boggle}/>
            <Route path="*" component={App}/>
        </Route>
    </Router>
), document.getElementById('root'));

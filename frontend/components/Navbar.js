`use strict`;

import React from 'react';
import {Link} from 'react-router';

class Navbar extends React.Component {
     render() {
        return (
            <nav className="navbar navbar-default">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#navbar" aria-expanded="false" aria-controls="navbar" style={{marginTop: "0"}}>
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <h1 className="nav navbar-nav"><li><Link to="/" >BOGGLE</Link></li></h1>

                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right pull-right">
                        <li><Link to='/'>Boggle</Link></li>
                        <li><Link to='/'>Boggle</Link></li>
                        <li><Link to='/'>Boggle</Link></li>

                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;
`use strict`;

import React from 'react';

class BoggleTile extends React.Component{

    render() {
        return (
            <div className="col-xs-3 tile" >
                <h2>{this.props.letter}</h2>
            </div>
        )
    }
}

export default BoggleTile;
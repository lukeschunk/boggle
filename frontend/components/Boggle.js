`use strict`;

import React from 'react';
import BoggleTile from './Boggle/BoggleTile';
import BoggleService from './Boggle/BoggleService';

class Boggle extends React.Component {


    componentWillMount() {
        this.generateBoard();
    };

    componentDidMount() {
        //add listener for enter key to check words
        let input = document.getElementById('input');
        this.setState({service: new BoggleService(this.state.tiles, input)},
            ()=> {
                this.state.service.getWordList();
                input.addEventListener('keydown', event => {
                    if (event.keyCode == 13) {
                        this.state.service.checkWord(input.value.toUpperCase())
                    }
                });
            });
    };

    componentDidUpdate(){
        // console.log(this.state.tiles);
        console.log(this.state.service.possibleWords);
        console.log();
    }

    generateBoard() {
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        let tiles = [];

        for (let i = 0; i < 4; i++) {
            tiles.push([]);
            for (let j = 0; j < 4; j++) {
                tiles[i][j] = (<BoggleTile key={[i, j]} letter={chars[Math.floor(Math.random() * chars.length)]}/>)
            }
        }
        this.setState({tiles: tiles});
    };

    newBoard(){
        this.generateBoard();
        this.state.service.getWordList(this.state.tiles);
    };

    render() {
        return (
            <div>
                <div className="board">
                    {this.state.tiles}
                </div>
                <div className="input-group input-container" id="">
                    <input id='input' type="text" className="form-control" placeholder="Word"/>
                </div>
                <div className="input-container">
                    <button className="btn btn-default" onClick={this.newBoard.bind(this)}>Boggle!</button>
                </div>
            </div>
        )
    };
}

export default Boggle;
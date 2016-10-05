`use strict`;

import React from 'react';
import BoggleTile from './Boggle/BoggleTile';

class Boggle extends React.Component {


    componentWillMount() {
        this.generateBoard();
        this.getWordList();
    }

    componentDidMount() {
        //add listener for enter key to check words
        document.getElementById('input')
            .addEventListener('keydown', event => {
                if (event.keyCode === 13) {
                    this.checkWord()
                }
            })
    }

    generateBoard() {
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        let tiles = [];

        for (let i = 0; i < 16; i++) {
            tiles.push(<BoggleTile key={i} letter={chars[Math.floor(Math.random() * chars.length)]}/>)
        }
        this.setState({tiles: tiles});
    }

    getWordList() {

        const checkAdjacent = ()=>{};

        this.state.tiles.forEach(tile=>{

        })

    }

    checkWord() {

    }

    render() {
        return (
            <div>
                <div className="board">
                    {this.state.tiles}
                </div>
                <input id='input' type="text"/>
            </div>
        )
    }
}

export default Boggle;
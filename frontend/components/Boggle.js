`use strict`;

import React from 'react';
import BoggleTile from './Boggle/BoggleTile';
import Trie from './Utils/Trie'

const dict = require('../resources/dict').dict;

class Boggle extends React.Component {


    componentWillMount() {
        this.generateBoard();
        this.generateTrie();
    };

    componentDidMount() {
        //add listener for enter key to check words
        document.getElementById('input')
            .addEventListener('keydown', event => {
                if (event.keyCode === 13) {
                    this.checkWord()
                }
            });

        this.getWordList();

    };

    generateTrie() {
        this.setState({Trie: new Trie()}, ()=> {
            this.state.Trie.addArr(dict);
        });
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

    getWordList() {
        console.log(this.state.Trie);
        this.state.tiles.forEach(row=> {
            row.forEach(tile=> {
                this.checkAdjacent(tile, 0, [tile.key[0] + tile.key[2]]);
            })
        })

    };

    checkAdjacent(tile, length, chain) {
        //1  2  3  4
        //5  6  7  8
        //9  10 11 12
        //13 14 15 16
        //pos1 has neighbors 2,5,6
        //pos2 has neighbors 1,3,5,6,7
        //pos3 has neighbors 2,4,6,7,8
        //pos4 has neighbors 3,7,8
        //pos5 has neighbors 1,2,6,9,10
        let y = Number(tile.key[0]);
        let x = Number(tile.key[2]);

        //row
        for (let i = -1; i <= 1; i++) {
            let dy = y + i;
            //if outside of array bounds
            if (dy < 0 || dy > 3) {
                continue;
            }

            //column
            for (let j = -1; j <= 1; j++) {
                let dx = x + j;
                //if outside of array bounds or we've visited this node already
                if (dx < 0 || dx > 3 || chain.indexOf(String(dy) + dx) != -1) {
                    continue;
                }

                //get letter and push node to chain
                let neighbor = this.state.tiles[dy][dx].props.letter;

                // if()

                chain.push(String(dy) + dx);
                // console.log(neighbor)

            }
        }
    };

    checkWord(word) {
        console.log(this.state.Trie);
        if (this.state.solutions.find(word)) {
            //clear input, add word to list of found words
            if (this.state.found.find(word)) {
                //already found, try again
            }
        } else {
            //not a word, don't do anything
        }
    };

    render() {
        return (
            <div>
                <div className="board">
                    {this.state.tiles}
                </div>
                <input id='input' type="text"/>
            </div>
        )
    };
}

export default Boggle;
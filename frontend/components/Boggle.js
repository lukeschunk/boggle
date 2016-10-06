`use strict`;

import React from 'react';
import BoggleTile from './Boggle/BoggleTile';
import Trie from './Utils/Trie'

const dict = require('../resources/dict').dict;

class Boggle extends React.Component {


    componentWillMount() {
        this.generateBoard();
        this.getWordList();
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

        this.setState({Trie: new Trie()}, ()=> {
            this.state.Trie.addArr(dict);
            this.setState({possibleWords: []},()=>{
                this.state.tiles.forEach(row=> {
                    row.forEach(tile=> {
                        // console.log(tile.props.letter);
                        this.checkAdjacent(tile, tile.props.letter, [tile.key[0] + tile.key[2]]);
                    })
                })
                }

            );
        });
    };

    checkAdjacent(tile, word, chain) {
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

                let neighbor = this.state.tiles[dy][dx];
                word = word += neighbor.props.letter;
                let check = this.state.Trie.search(word);
                console.log(word);
                // console.log(typeof check === 'string');
                if (typeof check === 'string') {
                    //we found a word, add to dictionary and check down path
                    this.state.possibleWords.push(check);
                    chain.push(String(dy) + dx);
                    this.checkAdjacent(neighbor, word, chain);
                    console.log('here')
                } else if (check) {
                    //keep checking adjacent paths
                    chain.push(String(dy) + dx);
                    this.checkAdjacent(neighbor, word, chain);
                    console.log('here2')

                } else {
                    //word is a deadend, quit looking at that path
                    console.log(this.state.possibleWords)

                }
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
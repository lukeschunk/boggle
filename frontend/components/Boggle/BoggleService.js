"use strict";

import Trie from '../Utils/Trie'
const dict = require('../../resources/dict').dict;

class BoggleService {

    constructor(tiles, input) {
        this.trie          = new Trie();
        this.possibleWords = {};
        this.tiles         = tiles;
        this.input         = input;
    };

    getWordList() {
        this.trie.addArr(dict);
        this.tiles.forEach(row=> {
            row.forEach(tile=> {
                this.checkAdjacent(tile, tile.props.letter, [tile.key[0] + tile.key[2]]);
            });
            console.log(this.possibleWords);
        })

    };

    checkAdjacent(tile, word, chain) {
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
                let neighbor = this.tiles[dy][dx];
                let tempWord = word + neighbor.props.letter;
                let check = this.trie.search(tempWord);
                if (typeof check === 'string') {
                    //we found a word, add to dictionary and check down path
                    this.possibleWords[check] = false;
                    let tempChain             = chain.slice(0);
                    tempChain.push(String(dy) + dx);
                    this.checkAdjacent(neighbor, tempWord, tempChain);
                } else if (check) {
                    //keep checking adjacent paths
                    let tempChain             = chain.slice(0);
                    tempChain.push(String(dy) + dx);
                    this.checkAdjacent(neighbor, tempWord, tempChain);
                }
            }
        }
    };

    checkWord(word) {
        //if the word is a possible word
        if (this.possibleWords[word] != undefined) {
            //if it's one we've found already
            if (this.possibleWords[word]) {
                //already found, try again
                this.input.classList.add('found');
                setTimeout(() => {
                    this.input.classList.remove('found');
                }, 500);

            } else {
                this.input.value         = "";
                this.possibleWords[word] = true;
                this.input.classList.add('correct');
                setTimeout(() => {
                    this.input.classList.remove('correct');
                }, 500);
            }
        } else {
            //not a word
            this.input.classList.add('incorrect');
            setTimeout(() => {
                this.input.classList.remove('incorrect');
            }, 500);
        }
    };
}

export default BoggleService;
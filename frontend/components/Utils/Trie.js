`use strict`;

class Trie {

    constructor(key){
        this.key = key;
    }

    add(name){
        let node = this;
        let length = name.length;
        let letter;

        for (let i = 0; i < length; i++) {
            letter = name[i];
            node = node[letter] || (node[letter] = new Trie(letter))
        }

        node.name = name;
    }

    addArr(arr){
        for (let i = 0; i < arr.length; i++) {
            this.add(arr[i]);
        }
    }

    search(name){
        let node = this;
        let length = name.length;
        let i;
        for (i = 0; i < length; i++) {
            if(!(node = node[name[i]])){
                break;
            }
        }
        let ret;
        if(i === length){
            if(node.name){
                return node.name
            } else {
                ret = true;
            }
        } else{
            ret = false;
        }

        return ret;
    }
}

export default Trie;
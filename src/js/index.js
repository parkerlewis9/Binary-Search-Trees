// Scroll to the bottom of this file to see the view layer code.
// All of the necessary modules needed to be copy and pasted in
// until Webpack is configured.

// Or search for Frontend JS Starts Here 


// TODO - Use Webpack or something else to allow modules.

const ALPHABET = {
    "a": 1  + 26,
    "b": 2  + 26,
    "c": 3  + 26,
    "d": 4  + 26,
    "e": 5  + 26,
    "f": 6  + 26,
    "g": 7  + 26,
    "h": 8  + 26,
    "i": 9  + 26,
    "j": 10 + 26,
    "k": 11 + 26,
    "l": 12 + 26,
    "m": 13 + 26,
    "n": 14 + 26,
    "o": 15 + 26,
    "p": 16 + 26,
    "q": 17 + 26,
    "r": 18 + 26,
    "s": 19 + 26,
    "t": 20 + 26,
    "u": 21 + 26,
    "v": 22 + 26,
    "w": 23 + 26,
    "x": 24 + 26,
    "y": 25 + 26,
    "z": 26 + 26
};


class BinarySearchTree {
    constructor(root=null) {
        this.root = root;
    }

    insert(newNode, curNode = this.root) {
        if(!this.root) {
            this.root = newNode;
            return;
        }

        if(newNode.value < curNode.value){
            if(!curNode.left) {
              curNode.left = newNode; 
              return; 
            } 
            else return this.insert(newNode, curNode.left);
        }

        if(newNode.value > curNode.value){
            if(!curNode.right) {
                curNode.right = newNode;
                return;
            }
            else return this.insert(newNode, curNode.right);
        }

        if(newNode.value === curNode.value) return;
    }

    remove(value, curNode=this.root, parentNode) {

        if(value === curNode.value) {

            // No children:
            if(!curNode.left && !curNode.right) {
                if(curNode.value < parentNode.value) parentNode.left = null;
                else if (curNode.value > parentNode.value) parentNode.right = null;
                return;
            }
            // Two children:
            else if(curNode.left && curNode.right) {

                let scout = curNode.left;
                let scoutParent = curNode;

                ///////////////////// Variable used in order to set subtrees of node that will replace the removed node
                let leftOfReplacedNode = curNode.left; 
                let rightOfReplacementNode = curNode.right;

                while(scout.right) {
                    scoutParent = scout;
                    scout = scout.right;
                }

                /////////////// Replace removed node with scout by making it parentNode's child
                    // Unless it is the root (which has no parent), then just make it the root
                if(parentNode){
                    if(curNode.value < parentNode.value) parentNode.left = scout;
                    else if(curNode.value > parentNode.value) parentNode.right = scout;
                } else {
                    this.root = scout;
                }

                //////////////// Reset replacement (scout)'s left and right

                // for h - 1 depth when you have skipped the while loop
                if(scout === leftOfReplacedNode) scout.left = null;
                else scout.left = leftOfReplacedNode;

                scout.right = rightOfReplacementNode;

                ////////////////  Remove reference to scout from its parent
                scoutParent.right = null;

            }
            // One child:
            else if(!curNode.left || !curNode.right) {
                if(curNode.value < parentNode.value) parentNode.left = curNode.left || curNode.right;
                else if (curNode.value > parentNode.value) parentNode.right = curNode.left || curNode.right;
                return;
            }
            
        }
        else if(value < curNode.value) return this.remove(value, curNode.left, curNode);
        else if (value > curNode.value) return this.remove(value, curNode.right, curNode);
    }

    depthFirstSearch(value, currentNode, fringe = (new Stack()) ) {
        var currentNode = currentNode || this.root;

        if(currentNode.value === value) return currentNode;

        if (currentNode.right) fringe.push(currentNode.right);
        if (currentNode.left) fringe.push(currentNode.left);

        while(fringe.length > 0) {
            let nodeToSearch = fringe.pop();
            let returnedFromSearch = this.depthFirstSearch(value, nodeToSearch, fringe);

            if(returnedFromSearch !== undefined ) return returnedFromSearch;
        }

        return null;

    }

    breadthFirstSearch(value, currentNode, fringe= (new Queue()) ) {
        var currentNode = currentNode || this.root;

        if(currentNode.value === value) return currentNode;

        if (currentNode.right) fringe.enqueue(currentNode.right);
        if (currentNode.left) fringe.enqueue(currentNode.left);

        while(fringe.length > 0) {
            let nodeToSearch = fringe.dequeue();
            let returnedFromSearch = this.breadthFirstSearch(value, nodeToSearch, fringe);
            
            if(returnedFromSearch !== undefined ) return returnedFromSearch;
        }

        return null;
    }
}

class Node {
    constructor(value=null, word="", left=null, right=null){
        this.value = value;
        this.word = word;
        this.left = left;
        this.right = right;
    }
}

class Stack {
    constructor(value) {
        if (!value) this.list = []
        else this.list = [value]
    }

    push(value) {
        this.list.push(value);
        return this;
    }

    pop() {
        return this.list.pop()
    }

    get length() {
        return this.list.length;
    }
}

class Queue {
    constructor(value) {
        if(!value) this.list = []
        else this.list = [value]
    }
    
    enqueue(value) {
        this.list.unshift(value);
        return this;
    }

    dequeue() {
        return this.list.pop();
    } 

    get length() {
        return this.list.length;
    }
}

function stringToInteger(string) {

    integer = 0;
    for(let p = 0, q=10000 , r = 3; p < string.length; p++, q = Math.pow(10, r), r--) {
        letter = string[p];
        integer += ALPHABET[letter] * q;
    }

    return integer;
}





// ************** Frontend JS Starts Here *******************

const alphabeticalBinarySearchTree = new BinarySearchTree()

const initialCenter = stringToInteger("mmmmm"); // add most middle value to help with initial balance
const bstRoot = new Node(initialCenter, "mmmmm")
alphabeticalBinarySearchTree.insert(bstRoot); 

document.addEventListener( "DOMContentLoaded", () => {

    let form = document.getElementById("word-form");
    let inputTag = document.getElementById("text-input-field");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let inputValue = inputTag.value;
        inputTag.value = "";
        addToTree(inputValue).then((payload) => {
            updateTable();
            // console.log(alphabeticalBinarySearchTree)
            // console.log(integerValue)
            // console.log(word)
        })

    })


});



function updateTable (){
    let alphabeticalNodes = alphabeticalBinarySearchTree.retrieveAllInOrder()
    let alphabeticalRows = buildRows(alphabeticalNodes);
    let tableBody = document.getElementById("table-body");
    alphabeticalRows.forEach((row) => tableBody.appendChild(row))
}

function builRows(arrayOfNodes) {

}



function addToTree (newWord) {
    // This use of a promise is unnecessary as nothing asynchronous is happening
    return new Promise((resolve, reject) => {
        integerValue = stringToInteger(newWord);
        newNode = new Node(integerValue, newWord);
        alphabeticalBinarySearchTree.insert(newNode);
        resolve({integerValue, word: newWord})
    })
}



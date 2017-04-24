const Stack = require("./helperDataStructures").Stack;
const Queue = require("./helperDataStructures").Queue;

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

    retrieveAllInOrder(currentNode=this.root, returnArray=[]) {
        var parentNode = currentNode;
        var currentNode = parentNode.left;

        if(!currentNode) return returnArray.push(parentNode);

        this.retrieveAllInOrder(currentNode, returnArray);

        returnArray.push(parentNode);

        currentNode = parentNode.right;
        this.retrieveAllInOrder(currentNode, returnArray);

        return returnArray;
    }
}

class Node {
    constructor(value=null, word="", left=null, right=null){
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

module.exports = {
    BinarySearchTree,
    Node
}
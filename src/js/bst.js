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
                return
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
                let leftOfReplacedNode = curNode.left; // needed in order to connect replacement node to the subtree of the removed node
                // also need rightOfReplacementNode = curNode.right;

                while(scout.right) {
                    scoutParent = scout;
                    scout = scout.right;
                }
                // scout to be parentNode's child
                if(curNode.value < parentNode.value) parentNode.left = scout;
                else if(curNode.value > parentNode.value) parentNode.right = scout

                if(scout === leftOfReplacedNode) scout.left = null;
                else {
                    scout.left = leftOfReplacedNode
                    scoutParent.right = null;
                }

            }
            // One child:
            else if(!curNode.left || !curNode.right) {
                if(curNode.value < parentNode.value) parentNode.left = curNode.left || curNode.right;
                else if (curNode.value > parentNode.value) parentNode.right = curNode.left || curNode.right;
                return
            }
            
        }
        else if(value < curNode.value) return this.remove(value, curNode.left, curNode)
        else if (value > curNode.value) return this.remove(value, curNode.right, curNode)
    }

    depthFirstSearch(value, currentNode, fringe = (new Stack()) ) {
        var currentNode = currentNode || this.root;

        if(currentNode.value === value) return currentNode;

        if (currentNode.right) fringe.push(currentNode.right)
        if (currentNode.left) fringe.push(currentNode.left)

        while(fringe.length > 0) {
            let nodeToSearch = fringe.pop();
            let returnedFromSearch = this.depthFirstSearch(value, nodeToSearch, fringe);

            if(returnedFromSearch !== undefined ) return returnedFromSearch
        }

        return null;

    }

    breadthFirstSearch(value, currentNode, fringe= (new Queue()) ) {
        var currentNode = currentNode || this.root;

        if(currentNode.value === value) return currentNode;

        if (currentNode.right) fringe.enqueue(currentNode.right)
        if (currentNode.left) fringe.enqueue(currentNode.left)

        while(fringe.length > 0) {
            let nodeToSearch = fringe.dequeue();
            let returnedFromSearch = this.breadthFirstSearch(value, nodeToSearch, fringe);
            
            if(returnedFromSearch !== undefined ) return returnedFromSearch
        }

        return null;
    }
}



class Node {
    constructor(value=null, left=null, right=null){
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

module.exports = {
    BinarySearchTree,
    Node
}
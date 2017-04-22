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

    depthFirstSearch() {

    }

    breadthFirstSeach() {

    }

    remove() {

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
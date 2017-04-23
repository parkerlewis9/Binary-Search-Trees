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
                let replacer = scout;
                while(scout.right) {
                    scoutParent = scout;
                    scout = scout.right;
                }
                // scout to be parentNode's child
                if(curNode.value < parentNode.value) parentNode.left = scout;
                else if(curNode.value > parentNode.value) parentNode.right = scout

                scout.left = replacer
                scoutParent.right = null;
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

    depthFirstSearch() {

    }

    breadthFirstSeach() {

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
const mocha = require('mocha');
const chai = require("chai");
const expect = chai.expect;
const bstModule = require('../src/js/bst');
const BinarySearchTree = bstModule.BinarySearchTree;
const Node = bstModule.Node;

describe("Binary Search Trees", () => {
    beforeEach(() => {
        bst = new BinarySearchTree();

        [50,25,75,15,35,65,85].map((value) => new Node(value))
                                .forEach((node) => bst.insert(node))
        console.log(bst);
    });
    
    describe("#insert", () => {
        it("should insert a node as the root if none is present in a tree", () => {
            expect(bst.root.value).to.equal(50);
        });

        it("should insert smaller values on the left side of the tree", () => {
            let root = bst.root;
            let expectedTwentyFive = root.left;
            let expectedFifteen = expectedTwentyFive.left;

            expect(expectedTwentyFive.value).to.equal(25);
            expect(expectedFifteen.value).to.equal(15);

        })
    })
})
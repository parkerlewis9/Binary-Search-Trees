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

                        //         50
                        //         /\
                        //     25      75
                        //     /\      /\
                        // 15   35   65   85

    });
    
    describe("#insert", () => {
        it("should insert a node as the root if none is present in a tree", () => {
            expect(bst.root.value).to.equal(50);
        });

        it("should insert smaller values on the left side of the tree and subtrees", () => {
            let root = bst.root,
                expectedTwentyFive = root.left,
                expectedFifteen = expectedTwentyFive.left;

            expect(expectedTwentyFive.value).to.equal(25);
            expect(expectedFifteen.value).to.equal(15);
        });

        it("should insert larger values on the right side of the tree and subtrees", () => {
            let root = bst.root,
                expectedSeventyFive = root.right,
                expectedEightyFive = expectedSeventyFive.right;

            expect(expectedSeventyFive.value).to.equal(75);
            expect(expectedEightyFive.value).to.equal(85);
        })

        it("should insert an arbritrary number into a tree correctly", () => {
            let fifteen = bst.root.left.left,
                thirtyFive = bst.root.left.right,
                sixtyFive = bst.root.right.left,
                eightyFive = bst.root.right.right;



            bst.insert(new Node(10))
            bst.insert(new Node(46))
            bst.insert(new Node(55))
            bst.insert(new Node(92))

            expect(fifteen.left.value).to.equal(10)
            expect(thirtyFive.right.value).to.equal(46)
            expect(sixtyFive.left.value).to.equal(55)
            expect(eightyFive.right.value).to.equal(92)
        })
    })
})
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
                              .forEach((node) => bst.insert(node));

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
        });

        it("should insert an arbritrary number into a tree correctly", () => {
            let fifteen = bst.root.left.left,
                thirtyFive = bst.root.left.right,
                sixtyFive = bst.root.right.left,
                eightyFive = bst.root.right.right;

            bst.insert(new Node(10));
            bst.insert(new Node(46));
            bst.insert(new Node(55));
            bst.insert(new Node(92));

            expect(fifteen.left.value).to.equal(10);
            expect(thirtyFive.right.value).to.equal(46);
            expect(sixtyFive.left.value).to.equal(55);
            expect(eightyFive.right.value).to.equal(92);
        });
    });

    describe("#remove", () => {

        describe("#remove node with no children", () => {

            it("should set the parent node's right property to null when removing a leaf node which is greater than its parent", () => {
                let twentyFive = bst.root.left;
                bst.remove(35);

                expect(twentyFive.right).to.be.null;
                expect(twentyFive.left.value).to.equal(15);
            });

            it("should set the parent node's left property to null when removing a leaf node which is less than its parent", () => {
                let twentyFive = bst.root.left;
                bst.remove(15);

                expect(twentyFive.left).to.be.null;
                expect(twentyFive.right.value).to.equal(35);
            });
        });



        describe("#remove node with one child", () => {

            it("should change the left property of the removed node's parent to be the one child of the removed node given that the removed node is less than its parent", () => {
                let twentyFive = bst.root.left;
                bst.insert(new Node(20));

                bst.remove(15);
                expect(twentyFive.left.value).to.equal(20);
            });

            it("should change the right property of the removed node's parent to be the one child of the removed node given that the removed node is greater than its parent", () => {
                let seventyFive = bst.root.right;
                bst.insert(new Node(80));

                bst.remove(85);
                expect(seventyFive.right.value).to.equal(80);
            });
        });

        describe("#remove node with two children", () => {

            beforeEach(() => {
                [10,20,30,40,50,60,70,80,90].map((value) => new Node(value))
                                            .forEach((node) => bst.insert(node));
            });
                                //         50
                                //         /\
                                //     25      75
                                //     /\      /\
                                // 15   35   65   85
                                // /\   /\   /\   /\
                                //1020|3040|6070|8090| 


            it("should remove node 25 from above and replace it with node 20 ",() => {
                bst.remove(25);

                let expectedTwenty = bst.root.left.value; // use dfs to find twenty and check it's left and right?

                expect(expectedTwenty).to.equal(20);

                                //         50
                                //         /\
                                //     20      75
                                //     /\      /\
                                // 15   35   65   85
                                // /\   /\   /\   /\
                                //10  |3040|6070|8090| 

            });

            it("should remove node 75 from above and replace it with node 70", () => {
                bst.remove(75);

                let expectedSeventy = bst.root.right.value;
                expect(expectedSeventy).to.equal(70);
                let expectedNull = bst.root.right.left.right; // search for 65 with BFS
                expect(expectedNull).to.be.null;

                                //         50
                                //         /\
                                //     25      70
                                //     /\      /\
                                // 15   35   65   85
                                // /\   /\   /\   /\
                                //1020|3040|60  |8090| 
            });

            it("should correctly remove a value from the height - 1 level of the tree (65 --> 60)", () => {
                bst.remove(65);

                let expectedSixty = bst.depthFirstSearch(60);
                expect(expectedSixty.value).to.equal(60);
                // let expectedSeventy = expectedSixty.right;
                // expect(expectedSeventy.value).to.equal(70);
                let expectedNull = expectedSixty.left; 
                console.log(expectedNull)
                expect(expectedNull).to.be.null;

                                //         50
                                //         /\
                                //     25      75
                                //     /\      /\
                                // 15   35   60   85
                                // /\   /\   /\   /\
                                //1020|3040|  70|8090| 
            });

            it("should correctly remove a value from the height - 1 level of the tree", () => {
                bst.remove(65);

                let expectedSixty = bst.depthFirstSearch(60);
                expect(expectedSixty.value).to.equal(60);
                let expectedNull = expectedSixty.left; // search for 65 with BFS
                console.log(expectedNull)
                expect(expectedNull).to.be.null;

                                //         50
                                //         /\
                                //     25      75
                                //     /\      /\
                                // 15   35   60   85
                                // /\   /\   /\   /\
                                //1020|3040|  70|8090| 
            });


            it("should remove the root node from above (50) and replace it with node 40 ",() => {
                bst.remove(bst.root);

                let expectedForty = bst.root.left.right.right.value; // Todo - use dfs for this

                expect(expectedForty).to.equal(40)

                                //         50
                                //         /\
                                //     20      75
                                //     /\      /\
                                // 15   35   65   85
                                // /\   /\   /\   /\
                                //1020|30  |6070|8090| 

            });
        })
    });

    describe("#depthFirstSearch", () => {
        it("should return the node with the value that was searched for at bottom of tree", () => {
            let expectedNodeFifteen = bst.depthFirstSearch(15);
            expect(expectedNodeFifteen).to.be.an.instanceof(Node);
            expect(expectedNodeFifteen.value).to.equal(15);

            let expectedNodeThirtyFive = bst.depthFirstSearch(35);
            expect(expectedNodeThirtyFive).to.be.an.instanceof(Node);
            expect(expectedNodeThirtyFive.value).to.equal(35);

            let expectedNodeSixtyFive = bst.depthFirstSearch(65);
            expect(expectedNodeSixtyFive).to.be.an.instanceof(Node);
            expect(expectedNodeSixtyFive.value).to.equal(65);

            let expectedNodeEightyFive = bst.depthFirstSearch(85);
            expect(expectedNodeEightyFive).to.be.an.instanceof(Node);
            expect(expectedNodeEightyFive.value).to.equal(85);
        });

        it("should return the node with the value that was searched for at an arbitray depth", () => {
            let expectedNodeTwentyFive = bst.depthFirstSearch(25);
            expect(expectedNodeTwentyFive).to.be.an.instanceof(Node);
            expect(expectedNodeTwentyFive.value).to.equal(25);

            let expectedNodeSeventyFive = bst.depthFirstSearch(75);
            expect(expectedNodeSeventyFive).to.be.an.instanceof(Node);
            expect(expectedNodeSeventyFive.value).to.equal(75);

            let expectedRootNode = bst.depthFirstSearch(50);
            expect(expectedRootNode).to.be.an.instanceof(Node);
            expect(expectedRootNode.value).to.equal(50);
        });

        it("should return null if a node is not present in the tere", () => {
            let expectedNull = bst.depthFirstSearch(100);
            expect(expectedNull).to.be.null;
        });
    });

    describe("#breadthFirstSearch", () => {
        it("should return the node with the value that was searched for at bottom of tree", () => {
            let expectedNodeFifteen = bst.breadthFirstSearch(15);
            expect(expectedNodeFifteen).to.be.an.instanceof(Node);
            expect(expectedNodeFifteen.value).to.equal(15);

            let expectedNodeThirtyFive = bst.breadthFirstSearch(35);
            expect(expectedNodeThirtyFive).to.be.an.instanceof(Node);
            expect(expectedNodeThirtyFive.value).to.equal(35);

            let expectedNodeSixtyFive = bst.breadthFirstSearch(65);
            expect(expectedNodeSixtyFive).to.be.an.instanceof(Node);
            expect(expectedNodeSixtyFive.value).to.equal(65);

            let expectedNodeEightyFive = bst.breadthFirstSearch(85);
            expect(expectedNodeEightyFive).to.be.an.instanceof(Node);
            expect(expectedNodeEightyFive.value).to.equal(85);
        });

        it("should return the node with the value that was searched for at an arbitray depth", () => {
            let expectedNodeTwentyFive = bst.breadthFirstSearch(25);
            expect(expectedNodeTwentyFive).to.be.an.instanceof(Node);
            expect(expectedNodeTwentyFive.value).to.equal(25);

            let expectedNodeSeventyFive = bst.breadthFirstSearch(75);
            expect(expectedNodeSeventyFive).to.be.an.instanceof(Node);
            expect(expectedNodeSeventyFive.value).to.equal(75);

            let expectedRootNode = bst.breadthFirstSearch(50);
            expect(expectedRootNode).to.be.an.instanceof(Node);
            expect(expectedRootNode.value).to.equal(50);
        });

        it("should return null if a node is not present in the tere", () => {
            let expectedNull = bst.breadthFirstSearch(100);
            expect(expectedNull).to.be.null;
        });
    });




});





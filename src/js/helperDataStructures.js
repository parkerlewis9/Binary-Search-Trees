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

module.exports = {
    Stack,
    Queue
}



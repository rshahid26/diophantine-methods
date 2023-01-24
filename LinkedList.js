class myNode {
    data = 0;
    next;

    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    head;

    constructor(data) {
        this.head = new myNode(data);
    }

    append(data) {

        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }

        current.next = new myNode(data);
    }

    prepend(data) {

        let newHead = new myNode(data);

        newHead.next = this.head;
        this.head = newHead;

    }

    remove(data) {

        if (this.head.data === data) {
            this.head = this.head.next;
        }

        let current = this.head;
        while (current.next !== null) {

            if (current.next.data === data) {
                current.next = current.next.next;
                continue;
            }
            current = current.next;

        }
    }

    print() {

        let current = this.head;
        while (current !== null) {

            console.log(current.data);
            current = current.next;

        }
    }

}

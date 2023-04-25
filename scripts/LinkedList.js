export class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

export class LinkedList {
    constructor(...data) {
        this.head = new Node(data[0]);
        if (data.length > 1)
            for (let i = 1; i < data.length; i++) this.append(data[i]);
    }

    append(data) {
        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }

        current.next = new Node(data);
    }

    prepend(data) {

        let newHead = new Node(data);

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
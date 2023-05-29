/**
 * @class Node
 * Represents a Node in a doubly linked list. Contains any
 * data type and reference to previous and next Nodes.
 */
export class Node {
    constructor(data, prev = null, next = null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

/**
 * @class LinkedList
 * Implements a doubly Linked List class containing a
 * list of Nodes connected by pointers.
 **/
export class LinkedList {

    /**
     * @method constructor
     * @param {...any} data - initial data to create
     * nodes from.
     */
    constructor(...data) {
        if (data.length === 0) this.head = null;
        else {
            this.head = new Node(data[0]);
            if (data.length > 1)
                for (let i = 1; i < data.length; i++) this.append(data[i]);
        }
    }

    append(data) {
        if (!this.head) {
            this.head = new Node(data);
            return;
        }

        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }

        current.next = new Node(data, current);
    }

    prepend(data) {
        let newHead = new Node(data, null, this.head);
        if (this.head) {
            this.head.prev = newHead;
        }
        this.head = newHead;
    }

    remove(data) {
        let current = this.head;
        while (current.next !== null) {

            if (current.next.data === data) {
                current.next = current.next.next;
                current.next.prev = current;
                continue;
            }
            current = current.next;
        }

        if (this.head.data === data) {
            this.head = this.head.next;
            this.head.prev = null;
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

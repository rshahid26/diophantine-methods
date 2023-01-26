class HashTable {

    constructor() {
        this.table = new Array(10);
        this.size = 0;
    }

    // Ideally a private method (_hash)
    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.table.length;
    }

    set(key, value) {
        const index = this.hash(key);
        this.table[index] = [key, value];
        this.size++;
    }

    get(key) {
        const target = this.hash(key);
        return this.table[target];
    }

    remove(key) {
        const index = this.hash(key);

        if (this.table[index] && this.table[index].length) {
            this.table[index] = [];
            this.size--;
            return true;
        } else {
            return false;
        }
    }
}

let map = new HashTable();
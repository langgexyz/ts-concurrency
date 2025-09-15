export class node {
    constructor(e) {
        this.isValid = true;
        this.next = null;
        this.element = e;
    }
    inValid() {
        this.isValid = false;
    }
}
export class queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.count = 0;
    }
    en(e) {
        let newNode = new node(e);
        if (this.last == null) {
            this.last = newNode;
            this.first = this.last;
            this.count += 1;
            return newNode;
        }
        this.last.next = newNode;
        this.last = this.last.next;
        this.count += 1;
        return newNode;
    }
    de() {
        while (this.first != null && !this.first.isValid) {
            this.first = this.first.next;
            this.count -= 1;
        }
        if (this.first == null) {
            return null;
        }
        let ret = this.first.element;
        this.first = this.first.next;
        if (this.first == null) {
            this.last = null;
        }
        this.count -= 1;
        return ret;
    }
}
//# sourceMappingURL=queue.js.map
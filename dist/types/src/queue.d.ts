export declare class node<E> {
    isValid: boolean;
    element: E;
    next: node<E> | null;
    constructor(e: E);
    inValid(): void;
}
export declare class queue<E> {
    first: node<E> | null;
    last: node<E> | null;
    count: number;
    en(e: E): node<E>;
    de(): E | null;
}
//# sourceMappingURL=queue.d.ts.map
import { queue } from "./queue";
export declare class Semaphore {
    acquiredSuspend: queue<() => void>;
    max: number;
    current: number;
    constructor(max: number);
    Acquire(): Promise<void>;
    Release(): void;
    ReleaseAll(): void;
}
//# sourceMappingURL=semaphore.d.ts.map
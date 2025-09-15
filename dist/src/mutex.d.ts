import { Semaphore } from "./semaphore";
export declare class Mutex {
    sem: Semaphore;
    Lock(): Promise<void>;
    Unlock(): void;
    withLock<R>(exe: () => Promise<R>): Promise<R>;
}
//# sourceMappingURL=mutex.d.ts.map
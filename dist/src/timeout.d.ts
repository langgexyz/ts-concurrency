import { Duration } from "ts-xutils";
export declare class Timeout implements Error {
    message: string;
    name: string;
    constructor(d: Duration);
}
export declare function withTimeout<R>(d: Duration, exe: (canceled: () => boolean) => Promise<R>): Promise<R | Timeout>;
//# sourceMappingURL=timeout.d.ts.map
export declare class ChannelClosed implements Error {
    message: string;
    name: string;
    constructor(m: string);
}
import { queue } from "./queue";
export interface SendChannel<E> {
    Send(e: E): Promise<ChannelClosed | null>;
    Close(reason: string): void;
    Close(): void;
}
export interface ReceiveChannel<E> {
    ReceiveOrFailed(): Promise<E | ChannelClosed>;
    Receive(): Promise<E | null>;
}
export declare class Channel<E> implements SendChannel<E>, ReceiveChannel<E> {
    data: queue<E>;
    sendSuspend: queue<[E, (ret: ChannelClosed | null) => void]>;
    receiveSuspend: queue<(value: E | ChannelClosed) => void>;
    max: number;
    closed: ChannelClosed | null;
    constructor(max?: number);
    Close(reason: string): void;
    Close(): void;
    Send(e: E): Promise<ChannelClosed | null>;
    ReceiveOrFailed(): Promise<E | ChannelClosed>;
    Receive(): Promise<E | null>;
}
//# sourceMappingURL=channel.d.ts.map
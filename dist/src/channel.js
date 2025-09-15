var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ChannelClosed {
    constructor(m) {
        this.name = "ChannelClosed";
        this.message = m;
    }
}
import { queue } from "./queue";
export class Channel {
    constructor(max = 0) {
        this.data = new queue;
        this.sendSuspend = new queue();
        this.receiveSuspend = new queue();
        this.closed = null;
        this.max = max;
    }
    Close(reason) {
        this.closed = new ChannelClosed(reason ? reason : "");
        for (let s = this.sendSuspend.de(); s != null; s = this.sendSuspend.de()) {
            s[1](this.closed);
        }
        for (let r = this.receiveSuspend.de(); r != null; r = this.receiveSuspend.de()) {
            r(this.closed);
        }
    }
    Send(e) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.closed != null) {
                return this.closed;
            }
            let rfun = this.receiveSuspend.de();
            if (this.data.count >= this.max && rfun == null) {
                return new Promise((resolve) => {
                    this.sendSuspend.en([e, resolve]);
                });
            }
            // rfun != nil: data is empty
            if (rfun != null) {
                rfun(e);
                return null;
            }
            // rfun == nil && data.count < max: max != 0
            this.data.en(e);
            return null;
        });
    }
    ReceiveOrFailed() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.closed != null) {
                return this.closed;
            }
            let value = this.data.de();
            let suspend = this.sendSuspend.de();
            if (value == null && suspend == null) {
                return new Promise((resolve) => {
                    this.receiveSuspend.en(resolve);
                });
            }
            // value != nil: max != 0
            if (value != null) {
                if (suspend != null) {
                    let [v, sfun] = suspend;
                    this.data.en(v);
                    sfun(null);
                }
                return value;
            }
            // value == nil && suspend != nil: max == 0
            let [v, sfun] = suspend;
            sfun(null);
            return v;
        });
    }
    Receive() {
        return __awaiter(this, void 0, void 0, function* () {
            let r = yield this.ReceiveOrFailed();
            if (r instanceof ChannelClosed) {
                return null;
            }
            return r;
        });
    }
}
//# sourceMappingURL=channel.js.map
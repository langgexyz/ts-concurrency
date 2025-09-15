"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Semaphore = void 0;
const queue_1 = require("./queue");
const ts_xutils_1 = require("ts-xutils");
class Semaphore {
    constructor(max) {
        this.acquiredSuspend = new queue_1.queue;
        this.current = 0;
        this.max = max > 1 ? max : 1;
    }
    Acquire() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.current < this.max) {
                this.current += 1;
                return;
            }
            return new Promise((resolve) => {
                this.acquiredSuspend.en(resolve);
            });
        });
    }
    Release() {
        let d = this.acquiredSuspend.de();
        if (d != null) {
            d();
            return;
        }
        // de() == nil
        this.current -= 1;
        (0, ts_xutils_1.assert)(this.current >= 0);
    }
    ReleaseAll() {
        for (let d = this.acquiredSuspend.de(); d != null; d = this.acquiredSuspend.de()) {
            d();
        }
        this.current = 0;
    }
}
exports.Semaphore = Semaphore;
//# sourceMappingURL=semaphore.js.map
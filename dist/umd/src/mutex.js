var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./semaphore"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Mutex = void 0;
    const semaphore_1 = require("./semaphore");
    class Mutex {
        constructor() {
            this.sem = new semaphore_1.Semaphore(1);
        }
        Lock() {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.sem.Acquire();
            });
        }
        Unlock() {
            this.sem.Release();
        }
        withLock(exe) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.Lock();
                try {
                    return yield exe();
                }
                finally {
                    this.Unlock();
                }
            });
        }
    }
    exports.Mutex = Mutex;
});
//# sourceMappingURL=mutex.js.map
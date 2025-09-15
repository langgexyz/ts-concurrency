var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Millisecond } from "ts-xutils";
export class Timeout {
    constructor(d) {
        this.name = "Timeout";
        this.message = `timeout: ${d / Millisecond}ms`;
    }
}
export function withTimeout(d, exe) {
    return __awaiter(this, void 0, void 0, function* () {
        let timer;
        let canceled = false;
        let timePro = new Promise((resolve) => {
            timer = setTimeout(() => {
                canceled = true;
                resolve(new Timeout(d));
            }, d / Millisecond);
        });
        let ret = yield Promise.race([exe(() => canceled), timePro]);
        clearTimeout(timer);
        return ret;
    });
}
//# sourceMappingURL=timeout.js.map
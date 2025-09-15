(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./src/channel", "./src/semaphore", "./src/mutex", "./src/timeout", "./src/asyncexe"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.asyncExe = exports.Timeout = exports.withTimeout = exports.Mutex = exports.Semaphore = exports.ChannelClosed = exports.Channel = void 0;
    var channel_1 = require("./src/channel");
    Object.defineProperty(exports, "Channel", { enumerable: true, get: function () { return channel_1.Channel; } });
    Object.defineProperty(exports, "ChannelClosed", { enumerable: true, get: function () { return channel_1.ChannelClosed; } });
    var semaphore_1 = require("./src/semaphore");
    Object.defineProperty(exports, "Semaphore", { enumerable: true, get: function () { return semaphore_1.Semaphore; } });
    var mutex_1 = require("./src/mutex");
    Object.defineProperty(exports, "Mutex", { enumerable: true, get: function () { return mutex_1.Mutex; } });
    var timeout_1 = require("./src/timeout");
    Object.defineProperty(exports, "withTimeout", { enumerable: true, get: function () { return timeout_1.withTimeout; } });
    Object.defineProperty(exports, "Timeout", { enumerable: true, get: function () { return timeout_1.Timeout; } });
    var asyncexe_1 = require("./src/asyncexe");
    Object.defineProperty(exports, "asyncExe", { enumerable: true, get: function () { return asyncexe_1.asyncExe; } });
});
//# sourceMappingURL=index.js.map
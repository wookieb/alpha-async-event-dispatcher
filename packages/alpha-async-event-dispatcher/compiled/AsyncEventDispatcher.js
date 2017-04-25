"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
__export(require("./Event"));
class AsyncEventDispatcher {
    constructor() {
        this.subscribers = new Map();
    }
    registerSubscriber(subscriber) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const eventListeners = subscriber.getListeners();
            const multiListeners = Array.isArray(eventListeners) ? eventListeners : [eventListeners];
            for (const eventListener of multiListeners) {
                yield this.on(eventListener.listenerName, eventListener.listener, eventListener.events);
            }
            this.subscribers.set(subscriber, multiListeners.map(l => l.listenerName));
        });
    }
    unregisterSubscriber(subscriber) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.subscribers.has(subscriber)) {
                throw new Error('Provided subscriber is not registered');
            }
            const multiListeners = this.subscribers.get(subscriber);
            for (const listenerName of multiListeners) {
                yield this.off(listenerName);
            }
            this.subscribers.delete(subscriber);
        });
    }
}
exports.AsyncEventDispatcher = AsyncEventDispatcher;
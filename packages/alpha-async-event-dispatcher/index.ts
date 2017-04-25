export * from "./Event";
import {EventInterface} from "Event";

export type Listener = (event: EventInterface) => Promise<any>;

export interface AsyncEventDispatcherInterface {
    dispatch(event: EventInterface): Promise<void>;

    start(): Promise<void>;

    /**
     * Stops dispatcher.
     *
     * Allows to finish current calls of listeners.
     */
    stop(): Promise<void>;

    /**
     * Registers listener with given name that listen on provided eventNames.
     * Not providing eventName means that listener will be called for every event.
     *
     * @param listenerName
     * @param listener
     * @param eventName
     */
    on(listenerName: string, listener: Listener, eventName?: string | string[]): Promise<void>

    /**
     * Unregisters listener with given name
     *
     * @param listenerName
     */
    off(listenerName: string): Promise<void>
}



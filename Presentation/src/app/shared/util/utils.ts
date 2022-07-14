import { Subscription } from "rxjs";

type NullUndefined = null | undefined;
type NonEmptyArray<T> = [T, ...T[]];

const isNotNullNorUndefined = <T>(value: T | NullUndefined): value is T => value !== null && value !== undefined;
const isArrayNotEmpty = <T>(arr: T[] | NullUndefined): arr is NonEmptyArray<T> => isNotNullNorUndefined(arr) && arr.length > 0;
const unsubscribe = (subscriptions: Subscription[]) => {
    subscriptions.forEach(s => s.unsubscribe())
};

export const utils = {
    isNotNullNorUndefined,
    isArrayNotEmpty,
    unsubscribe
}

import { Subscription } from "rxjs";
import { ROUND_OUTCOME } from '../enums/round-outcome.enum';
import { RestResponse } from '../interfaces/rest-response.interface';

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
    unsubscribe,
    isResponseWithData: (response: RestResponse<any>) => isNotNullNorUndefined(response) && isNotNullNorUndefined(response.data),
    mapResponseData: <T>(response: RestResponse<T>): T => response.data as T,
    outcomeToString: (result: ROUND_OUTCOME) => result === ROUND_OUTCOME.Tie ? 'Tie' : result === ROUND_OUTCOME.Victory ? 'Victory' : 'Loss'

}

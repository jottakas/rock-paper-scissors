import { Subscription } from "rxjs";
import { DD_OUTCOME } from '../enums/dd-outcome.enum';
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
    outcomeToString: (result: DD_OUTCOME) => result === DD_OUTCOME.Tie ? 'Tie' : result === DD_OUTCOME.Victory ? 'Victory' : 'Loss'

}

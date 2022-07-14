import { HttpErrorResponse } from "@angular/common/http";

export interface RestResponse<T> {
    /** Correlation id */
    requestId: string;
    /** Response data */
    data?: T
    /** Possible errors */
    error?: HttpErrorResponse;
}
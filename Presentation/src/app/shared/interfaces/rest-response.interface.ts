import { HttpErrorResponse } from "@angular/common/http";

export interface RestResponse<T> {
    /** Correlation id */
    requestId: string;
    /** Action made by the service to listen to events */
    action: string;
    /** Response data */
    data?: T
    /** Possible errors */
    error?: HttpErrorResponse;
}
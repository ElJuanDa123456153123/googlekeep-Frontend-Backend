import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable( {providedIn: 'root' } )
export class BasicService {
    private serviceHttp = inject(HttpClient);
    private baseUrl = 'http://localhost:3000/api/v1';

    basePost(endpoint: string, data: any = {}): Observable<any> {
        return this.serviceHttp.post(`${this.baseUrl}/${endpoint}`, data);
    }
}
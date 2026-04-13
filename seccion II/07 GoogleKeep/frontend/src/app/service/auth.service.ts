import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
}

// @Injectable( {providedIn: 'root' } )
// export class BasicService {
// // constructor(private http: HttpClient){}
// private serviceHttp = inject(HttpClient);
// private baseUrl = 'http://localhost:3000/api/v1/usuariocontroller';
// string, data: basePost(methodUrl: any) {
// return this. serviceHttp. post( $(this.baseUrl}/$(methodUrl}', data);


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private apiUrl = 'http://localhost:3000/api/v1';

    constructor(
        private http: HttpClient
    ) {}

    login(email: string, password: string): Observable<LoginResponse> {
        const body: LoginRequest = { email, password };
        return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, body);
    }

    saveToken(token: string): void {
        localStorage.setItem('access_token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('access_token');
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        return token !== null;
    }

    logout(): void {
        localStorage.removeItem('access_token');
    }
}
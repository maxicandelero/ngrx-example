import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, AuthSession } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      environment.urlAPI + '/auth/Authenticate',
      { email: username, password , validacion: '861202'}
    );
  }

  formatSession(data: AuthResponse): AuthSession {
    const session = new AuthSession(
      data.id,
      data.email,
      data.nombre,
      data.token
    );
    return session;
  }

  getErrorMessage(message: string): string {
    switch(message) {
      case 'Error_WrongCredentials':
        return 'Your credentials are wrong.';
      default:
        return 'We have some problems. Please try again.';
    }
  }

  setSessionInLocalStorage(session: AuthSession): void {
    localStorage.setItem('userSession', JSON.stringify(session));
  }

  getSessionFromLocalStorage(): AuthSession | null {
    const sessionString = localStorage.getItem('userSession');
    if (sessionString) {
      const sessionData = JSON.parse(sessionString);
      const session = new AuthSession(
        sessionData.id,
        sessionData.email,
        sessionData.nombre,
        sessionData.token
      );
      return session;
    }
    return null;
  }
}

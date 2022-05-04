export interface AuthResponse {
  id: number;
  email: string;
  nombre: string;
  token: string;
}

export class AuthSession {
  constructor(
    private id: number,
    private email: string,
    private name: string,
    private token: string
  ) {}

  get sessionToken() {
    return this.token;
  }
}

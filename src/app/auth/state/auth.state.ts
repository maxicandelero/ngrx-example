import { AuthSession } from "src/app/models/auth.model";

export interface AuthState {
  session: AuthSession | null
}

export const initialAuthState: AuthState = {
  session: null
};

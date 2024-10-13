// types/auth.d.ts

export interface AuthData {
  email: string;
  password: string;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

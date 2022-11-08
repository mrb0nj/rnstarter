export interface AuthError {
  code: string,
  message: string,
}

export interface AuthErrors {
  username: AuthError | null,
  email: AuthError | null,
  password: AuthError | null,
  passwordConfirm: AuthError | null,
};

export interface AuthErrorPayload {
  data: AuthErrors,
}

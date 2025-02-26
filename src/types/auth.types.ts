export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData extends LoginFormData {
  userName: string;
  firstName: string;
  lastName: string;
}

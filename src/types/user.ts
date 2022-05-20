export interface IUser {
  email: string;
  password: string;
  animes: string[];
  validatePassword: (pass: string) => Promise<boolean>;
}

export interface UserPostRequest {
  email: string;
  password: string;
}



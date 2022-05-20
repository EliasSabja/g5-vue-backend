import { User } from "../schemas/user";

export interface UserData {
  email: string;
}

export interface LoginResponse {
  user?: UserData;
  message: string;
}

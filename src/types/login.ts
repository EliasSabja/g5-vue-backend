import { User } from "../schemas/user";

export interface UserData {
  email: string;
  animeId?: number;
}

export interface LoginResponse {
  user?: UserData;
  message: string;
}

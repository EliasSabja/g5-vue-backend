export interface IUser {
    email: string;
    password: string;
    animes: number[];
    validatePassword: (pass: string) => Promise<boolean>;
}
export interface UserPostRequest {
    email: string;
    password: string;
}

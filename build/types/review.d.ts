export interface IReview {
    key: ReviewKey;
    text: string;
}
export interface ReviewPostRequest {
    email: string;
    text: string;
    animeId: number;
}
export interface ReviewKey {
    email: string;
    animeId: number;
}

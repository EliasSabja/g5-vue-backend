export interface IReview {
  key: ReviewKey;
  text: string;
}

export interface ReviewPostRequest {
  email: string;
  text: string;
  animeId: string;
}

export interface ReviewKey {
  email: string;
  animeId: string;
}


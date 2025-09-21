export type TrackStatus = "Published" | "Draft" | "Submitted";

export type Track = {
  id: number;
  title: string;
  artist: string;
  releaseDate: string;
  genre: string;
  status: TrackStatus;
};

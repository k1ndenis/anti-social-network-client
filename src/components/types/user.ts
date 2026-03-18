export type User = {
  id: string;
  username: string;
  email: string;
  likedPicturesIds: string[];
  listening: string | null;
  avatar: string;
  bio: string;
  followers: string[];
  following: string[]
}
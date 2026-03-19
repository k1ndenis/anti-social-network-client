export type User = {
  id: string;
  username: string;
  email: string;
  likedPicturesIds: string[];
  listening: string | null;
  avatar: string | null;
  bio: string;
  followers: string[];
  following: string[]
}
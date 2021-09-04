import { FriendlyUser, UnfamiliarUser } from "src/app/core/models/user.model";

export interface UsersRes {
  offset: number;
  limit: number;
  search: string;
  users: Array<FriendlyUser | UnfamiliarUser>
}

export interface FriendsRes {
  offset: number;
  limit: number;
  search: string;
  users: FriendlyUser[]
}

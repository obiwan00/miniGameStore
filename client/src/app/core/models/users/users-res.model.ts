import { FriendlyUser, UnfamiliarUser } from "./user.model";

export interface UsersRes {
  count: number
  offset: number
  limit: number
  search: string
  users: Array<FriendlyUser | UnfamiliarUser>
}

export interface FriendsRes {
  count: number
  offset: number
  limit: number
  search: string
  users: FriendlyUser[]
}

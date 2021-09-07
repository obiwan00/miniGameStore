export interface User {
  _id: string
  username: string
  email: string
  birthday: string | null
  createdAt: string
}

export interface UnfamiliarUser {
  _id: string
  username: string
  status?: FriendshipStatus
}

export interface FriendlyUser {
  _id: string
  username: string
  email: string
  birthday: string | null
  status?: FriendshipStatus
}

export enum FriendshipStatus {
  APPLIED = 'applied',
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  DELETED = 'deleted',
}

import {
  FriendRequestById,
  FriendByIdType,
  FriendRequest,
  FriendType,
} from "./friends";

export type CreateUserBody = {
  name: string;
  password: string;
};
export type LoginUserBody = CreateUserBody;

export type UserType = {
  id?: number;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserPrivateTypeJson = {
  id: number;
  friendships: string;
};

export type UserFriendships = {
  requests: FriendRequestById[];
  friends: FriendByIdType[];
};

export type UserPrivateType = {
  id: number;
  friendships: UserFriendships;
};

export type UserFriendsInfo = {
  requests: FriendRequest[];
  friends: FriendType[];
};

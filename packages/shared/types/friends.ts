import { UserType } from "./user";

export type FriendRequestById = {
  fromUserId: number;
  requestedDate: Date;
};

export type FriendByIdType = {
  userId: number;
};

export type FriendRequest = {
  user: UserType;
  requestedDate: Date;
};

export type FriendType = {
  user: UserType;
  requestedDate: Date;
};

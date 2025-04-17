import {
  ERROR_MESSAGES,
  UserFriendships,
  UserFriendsInfo,
  UserPrivateType,
  UserPrivateTypeJson,
  UserType,
  WEB_SOCKET_MESSAGES,
} from "../../../../packages/shared";

import { FRIEND_USER_COLUMNS, TABLES_NAMES } from "../constants";
import { queryDatabase } from "../database";
import { WS_ONLINE_USERS } from "../ws";

export const friendService = {
  fetchFriends: async (userId: number) => {
    const foundUserPrivateInfo = await queryDatabase<UserPrivateTypeJson>({
      method: "get",
      table: TABLES_NAMES.USERS_PRIVATE,
      eq: ["id", userId],
      limit: 1,
    });

    const { data: privateData, error } = foundUserPrivateInfo!;

    if (error) throw new Error(error.message);

    if (!privateData.length)
      throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);

    const privateDataJson = privateData[0];

    const userPrivateData: UserPrivateType = {
      id: privateDataJson.id,
      friendships: JSON.parse(privateDataJson.friendships),
    };

    const friendsIds = userPrivateData.friendships.friends.map(
      ({ userId }) => userId
    );

    const friendRequestsIds = userPrivateData.friendships.requests.map(
      ({ fromUserId }) => fromUserId
    );

    const friendsData = await queryDatabase<UserType>({
      method: "find",
      table: TABLES_NAMES.USERS,
      column: FRIEND_USER_COLUMNS,
      search: { column: "id", values: friendsIds },
    });

    const friendRequestsData = await queryDatabase<UserType>({
      method: "find",
      table: TABLES_NAMES.USERS,
      column: FRIEND_USER_COLUMNS,
      search: { column: "id", values: friendRequestsIds },
    });

    const friends = userPrivateData.friendships.friends.map(({ userId }) => ({
      user: friendsData?.data?.find(({ _id }) => _id === String(userId)),
    }));
    const requests = userPrivateData.friendships.requests.map(
      ({ fromUserId, requestedDate }) => ({
        requestedDate,
        user: friendRequestsData?.data?.find(
          ({ _id }) => _id === String(fromUserId)
        ),
      })
    );

    return {
      friends,
      requests,
    };
  },

  sendFriendRequest: async (currentUserId: number, requestedUserId: number) => {
    const foundUsersPrivate = await queryDatabase<UserPrivateTypeJson>({
      method: "find",
      table: TABLES_NAMES.USERS_PRIVATE,
      column: "*",
      search: { column: "id", values: [currentUserId, requestedUserId] },
    });

    const { data: privateData, error } = foundUsersPrivate!;

    if (error) throw new Error(error.message);

    if (privateData.length !== 2)
      throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);

    const requestedDate = new Date();

    const [_, requestedUserPrivate]: UserPrivateType[] = privateData.map(
      (user) => ({
        id: user.id,
        friendships: JSON.parse(user.friendships),
      })
    );
    const { friends, requests } = requestedUserPrivate.friendships;

    if (friends.some(({ userId }) => userId === currentUserId)) {
      throw new Error(ERROR_MESSAGES.THIS_USER_IS_YOUR_FRIEND);
    }

    if (requests.some(({ fromUserId }) => fromUserId === currentUserId)) {
      throw new Error(ERROR_MESSAGES.YOU_HAVE_ALREADY_SENT_FRIEND_REQUEST);
    }

    const newRequestedUserPrivate: UserPrivateType = {
      ...requestedUserPrivate,
      friendships: {
        ...requestedUserPrivate.friendships,
        requests: [
          ...requestedUserPrivate.friendships.requests,
          { fromUserId: currentUserId, requestedDate },
        ],
      },
    };

    const newRequestedUserPrivateJson: UserPrivateTypeJson = {
      id: newRequestedUserPrivate.id,
      friendships: JSON.stringify(newRequestedUserPrivate.friendships),
    };

    await queryDatabase<UserPrivateTypeJson>({
      method: "update",
      table: TABLES_NAMES.USERS_PRIVATE,
      items: [newRequestedUserPrivateJson],
    });

    const activeConnection = WS_ONLINE_USERS.get(String(requestedUserId));

    if (activeConnection) {
      activeConnection.send(
        JSON.stringify({
          type: WEB_SOCKET_MESSAGES.FRIEND_REQUEST,
        })
      );
    }
  },

  handleFriendRequest: async (
    currentUserId: number,
    requestedUserId: number,
    action: "approve" | "reject"
  ) => {
    const friendsDataJson = await queryDatabase<UserPrivateTypeJson>({
      method: "find",
      table: TABLES_NAMES.USERS_PRIVATE,
      column: "*",
      search: { column: "id", values: [currentUserId, requestedUserId] },
    });
    if (!friendsDataJson?.data?.length)
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);

    const [currentUserFriendsInfo, requestedUserFriendsInfo] =
      friendsDataJson.data.map((friendJson) => ({
        id: friendJson.id,
        friendships: JSON.parse(friendJson.friendships) as UserFriendships,
      }));

    const updatedCurrentUserFriendsInfo = {
      ...currentUserFriendsInfo,
      friendships: {
        ...currentUserFriendsInfo.friendships,
        friends: [
          ...currentUserFriendsInfo.friendships.friends,
          ...(action === "approve" ? [{ userId: requestedUserId }] : []),
        ],
        requests: currentUserFriendsInfo.friendships.requests.filter(
          ({ fromUserId }) => fromUserId !== requestedUserId
        ),
      },
    };

    const updatedRequestedUserFriendsInfo = {
      ...requestedUserFriendsInfo,
      friendships: {
        ...requestedUserFriendsInfo.friendships,
        friends: [
          ...requestedUserFriendsInfo.friendships.friends,
          ...(action === "approve" ? [{ userId: currentUserId }] : []),
        ],
      },
    };

    const currentUpdatedUser: UserPrivateTypeJson = {
      id: updatedCurrentUserFriendsInfo.id,
      friendships: JSON.stringify(updatedCurrentUserFriendsInfo.friendships),
    };
    const requestedUpdatedUser: UserPrivateTypeJson = {
      id: updatedRequestedUserFriendsInfo.id,
      friendships: JSON.stringify(updatedRequestedUserFriendsInfo.friendships),
    };

    await queryDatabase<UserPrivateTypeJson>({
      method: "update",
      table: TABLES_NAMES.USERS_PRIVATE,
      items: [currentUpdatedUser, requestedUpdatedUser],
    });
  },
};

import { Request, Response } from "express";
import { authService, friendService, userService } from "../services";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../../../packages/shared";

export const fetchFriendsInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    const currentUser = await authService.whoami(token);
    // if (!currentUser.id) {
    //   res.status(401).json({ message: ERROR_MESSAGES.UNAUTHORIZED });
    //   return;
    // }
    // const friendsRes = await friendService.fetchFriends(currentUser.id);
    // res.status(201).json(friendsRes);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const sendFriendRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.body;
    if (!userId) {
      res.status(400).json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
      return;
    }
    console.log(userId);

    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    const currentUser = await authService.whoami(token);
    // if (!currentUser.id) {
    //   res.status(401).json({ message: ERROR_MESSAGES.UNAUTHORIZED });
    //   return;
    // }
    // await friendService.sendFriendRequest(currentUser.id, userId);
    // res.status(201).json({
    //   message: SUCCESS_MESSAGES.FRIEND_REQUEST_SUCCESSFULLY_SENDED,
    // });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const handleFriendRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { requestedUserId, action } = req.body;
    if (!requestedUserId) {
      res.status(400).json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
      return;
    }
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    const currentUser = await authService.whoami(token);
    // if (!currentUser.id) {
    //   res.status(401).json({ message: ERROR_MESSAGES.UNAUTHORIZED });
    //   return;
    // }
    // await friendService.handleFriendRequest(
    //   currentUser.id,
    //   requestedUserId,
    //   action
    // );

    res.status(201).json({
      message: SUCCESS_MESSAGES.FRIEND_REQUEST_SUCCESSFULLY_SENDED,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

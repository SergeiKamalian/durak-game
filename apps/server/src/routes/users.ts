import express from "express";
import { authenticateToken } from "../middlewares";
import {
  createUser,
  loginUser,
  logoutUser,
  refreshToken,
  whoami,
} from "../controllers";

const usersRoute = express.Router();

usersRoute.post("/create", createUser);
usersRoute.post("/login", loginUser);
usersRoute.post("/refresh", refreshToken);
usersRoute.post("/logout", logoutUser);
usersRoute.post("/whoami", authenticateToken, whoami);

// router.post("/friend-request", authenticateToken, sendFriendRequest);
// router.get("/friends", authenticateToken, fetchFriendsInfo);
// router.post("/friends/request-handle", authenticateToken, handleFriendRequest);

// router.get(
//   "/",
//   authenticateToken,
//   asyncHandler(async (req: Request, res: Response): Promise<void> => {
//     const usersData = await queryDatabase<UserType>({
//       method: "get",
//       table: TABLES_NAMES.USERS,
//     });
//     const { data, error } = usersData!;
//     if (error) {
//       throw new Error(error.message);
//     }

//     res.json({ users: data });
//   })
// );

export { usersRoute };

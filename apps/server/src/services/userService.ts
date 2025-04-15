import bcrypt from "bcryptjs";
import { queryDatabase } from "../database";
import { ERROR_MESSAGES, UserType } from "../../../../packages/shared";
import { TABLES_NAMES, USER_DEFAULT_PRIVATE_INFO } from "../constants";
import { UserModel } from "../database/model";

export const userService = {
  createUser: async (name: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, password: hashedPassword });
    const res = await newUser.save();
    console.log(res);
    return newUser;
  },
};

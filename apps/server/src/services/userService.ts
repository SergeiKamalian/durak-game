import bcrypt from "bcryptjs";
import { queryDatabase } from "../database";
import { ERROR_MESSAGES, UserType } from "../../../../packages/shared";
import { TABLES_NAMES, USER_DEFAULT_PRIVATE_INFO } from "../constants";

export const userService = {
  createUser: async (name: string, password: string) => {
    const foundUser = await queryDatabase<UserType[]>({
      method: "get",
      table: TABLES_NAMES.USERS,
      eq: ["name", name],
      limit: 1,
    });

    const { data, error } = foundUser!;
    console.log({ data, error });
    if (error) throw new Error(error.message);

    if (data.length > 0) {
      throw new Error(ERROR_MESSAGES.COLUMN_CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: UserType = {
      name,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const res = await queryDatabase<UserType>({
      method: "add",
      table: TABLES_NAMES.USERS,
      item: newUser,
    });
    if (res?.error) {
      throw new Error(res.error.message);
    }
    const userRes = res?.data[0];

    await queryDatabase({
      method: "add",
      table: TABLES_NAMES.USERS_PRIVATE,
      item: {
        id: userRes?.id,
        ...USER_DEFAULT_PRIVATE_INFO,
      },
    });
    return newUser;
  },
};

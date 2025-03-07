import bcrypt from "bcryptjs";
import { queryDatabase } from "../database";
import { ERROR_MESSAGES, UserType } from "../../../../packages/shared";

export const userService = {
  createUser: async (name: string, password: string) => {
    const foundUser = await queryDatabase<UserType>({
      method: "get",
      table: "users",
      eq: ["name", name],
      limit: 1,
    });

    const { data, error } = foundUser!;
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
    await queryDatabase({ method: "add", table: "users", item: newUser });
    return newUser;
  },
};

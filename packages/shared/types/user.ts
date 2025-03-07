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

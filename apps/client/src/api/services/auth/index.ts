import { axiosInstance } from "../..";
import {
  CreateUserBody,
  LoginUserBody,
  CreateUserResponse,
  UserType,
  LoginUserResponse,
} from "../../../../../../packages/shared";

export const AuthService = new (class {
  async whoami(): Promise<UserType> {
    return axiosInstance.post("/users/whoami").then((res) => res.data);
  }
  async createUser(data: CreateUserBody): Promise<CreateUserResponse> {
    return axiosInstance.post("/users/create", data).then((res) => res.data);
  }
  async loginUser(data: LoginUserBody): Promise<LoginUserResponse> {
    return axiosInstance.post("/users/login", data).then((res) => res.data);
  }
})();

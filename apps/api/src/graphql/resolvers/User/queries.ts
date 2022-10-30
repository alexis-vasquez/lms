import { UserService } from "../../../services/UserService";

export const userQueryResolver = {
  getAllusers: () => UserService.getAllUsers(),
};

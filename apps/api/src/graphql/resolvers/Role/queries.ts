import { Role } from "../../../database/models";

export const roleQueryResolver: any = {
  roles: () => Role.findAll(),
};

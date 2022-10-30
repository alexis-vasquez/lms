import { Role } from "@romalms/database/models";

export const roleQueryResolver: any = {
  roles: () => Role.findAll(),
};

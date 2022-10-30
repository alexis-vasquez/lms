import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CONFIG } from "../config";
import { UserService } from "../services/UserService";
import { RoleService } from "../services/RoleService";
import { PrivilegeModel } from "@romalms/database/models/Privilege";

const saltRounds = 9;

export class AuthController {
  static authenticate: RequestHandler = async (req, res) => {
    const token = req.headers.authorization;
    res.json({ token });
  };

  static login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserService.getUserByEmail(email);
    if (!user) return res.status(401).json({ error: "User not found" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).json({ error: "Invalid password" });

    const roleWithPrivileges = await RoleService.getPrivilegesByRoleId(
      user.roleId
    );

    if (!roleWithPrivileges) {
      return res.status(401).json({ error: "Invalid user role" });
    }

    const userWithPrivileges = {
      ...user,
      privileges: (roleWithPrivileges as any).Privileges.map(
        (privilege: PrivilegeModel) => privilege.name
      ),
      role: roleWithPrivileges?.name,
    };

    // Remove the password from the response
    const { password: removedPassword, ...userWithoutPassword } =
      userWithPrivileges;
    const token = jwt.sign(userWithoutPassword, CONFIG.JWT_SECRET, {
      expiresIn: 300,
    });
    return res.json({ token });
  };

  static register: RequestHandler = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    const user = await UserService.getUserByEmail(email);
    if (user)
      return res
        .status(409)
        .json({ error: "An user with this email already exists" });
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await UserService.createNewUser({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      roleId: 2,
    });

    const createdUser = await UserService.getUserByEmail(email);

    if (!createdUser)
      return res.status(500).json({ error: "User could not be created" });

    const roleWithPrivileges = await RoleService.getPrivilegesByRoleId(
      createdUser.roleId
    );

    if (!roleWithPrivileges) {
      return res.status(401).json({ error: "Invalid user role" });
    }

    const userWithPrivileges = {
      ...createdUser,
      privileges: (roleWithPrivileges as any).Privileges.map(
        (privilege: PrivilegeModel) => privilege.name
      ),
      role: roleWithPrivileges?.name,
    };

    // Remove the password from the response
    const { password: removedPassword, ...userWithoutPassword } =
      userWithPrivileges;

    const token = jwt.sign(userWithoutPassword, CONFIG.JWT_SECRET, {
      expiresIn: 300,
    });
    return res.json({ token });
  };
}

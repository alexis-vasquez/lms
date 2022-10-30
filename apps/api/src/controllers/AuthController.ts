import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CONFIG } from "../config";
import { UserService } from "../services/UserService";

const saltRounds = 9;

export class AuthController {
  static authenticate: RequestHandler = async (req, res) => {
    const token = req.headers.authorization;
    res.json({ token });
  };

  static login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserService.getUserWithRoleByEmail(email);
    if (!user) return res.status(401).json({ error: "User not found" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).json({ error: "Invalid password" });

    // Remove the password from the response
    const { password: removedPassword, ...userWithoutPassword } = user;
    const token = jwt.sign(userWithoutPassword, CONFIG.JWT_SECRET, {
      expiresIn: 300,
    });
    return res.json({ token });
  };

  static register: RequestHandler = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    const user = await UserService.getUserWithRoleByEmail(email);
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

    const createdUser = await UserService.getUserWithRoleByEmail(email);

    if (!createdUser)
      return res.status(500).json({ error: "User could not be created" });

    // Remove the password from the response
    const { password: removedPassword, ...userWithoutPassword } = createdUser;

    const token = jwt.sign(userWithoutPassword, CONFIG.JWT_SECRET, {
      expiresIn: 300,
    });
    return res.json({ token });
  };
}

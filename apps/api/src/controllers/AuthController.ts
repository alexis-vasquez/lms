import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import { Sequelize } from 'sequelize';
import jwt from 'jsonwebtoken';
import { Role, User } from '../database/models';
import { CONFIG } from '../config';

const saltRounds = 9;

export class AuthController {
  static authenticate: RequestHandler = async (req, res) => {
    const token = req.headers.authorization;
    res.json({ token });
  };

  static login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [{ model: Role, attributes: [] }],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'role'],
        // Rename the column name from 'role.name' to 'role'
        include: [[Sequelize.col('"Role"."name"'), 'role']],
      },
      raw: true,
    });
    if (!user) return res.status(401).json({ error: 'User not found' });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).json({ error: 'Invalid password' });

    // Remove the password from the response
    const { password: removedPassword, ...userWithoutPassword } = user;
    const token = jwt.sign(userWithoutPassword, CONFIG.JWT_SECRET, {
      expiresIn: 300,
    });
    return res.json({ token });
  };

  static register: RequestHandler = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    const user = await User.findOne({ where: { email } });
    if (user)
      return res
        .status(409)
        .json({ error: 'An user with this email already exists' });
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await User.create(
      {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: 2,
      },
    );

    const createdUser = await User.findOne({
      where: { email },
      include: [{ model: Role, attributes: [] }],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'role', 'password'],
        // Rename the column name from 'role.name' to 'role'
        include: [[Sequelize.col('"Role"."name"'), 'role']],
      },
      raw: true,
    });

    if (!createdUser) return res.status(500).json({ error: 'User could not be created' });

    const token = jwt.sign(createdUser, CONFIG.JWT_SECRET, { expiresIn: 300 });
    return res.json({ token });
  };
}

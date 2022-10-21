import { Response } from "express";
import { validateFields, validateToken } from "./validation";

const res: {
  status: jest.Mock;
  json: jest.Mock;
} = {
  status: jest.fn(() => res),
  json: jest.fn(() => res),
};

const next: any = jest.fn();

jest.mock("jsonwebtoken", () => ({
  verify: (token: string) => {
    if (token !== "correct token") throw new Error("Invalid token");
  },
}));

describe("Validation utils", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("validateFields", () => {
    it("should validate all fields", () => {
      const req: any = {
        body: {},
      };
      validateFields(["email", "password"])(
        req,
        res as unknown as Response,
        next
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Missing fields: email, password",
      });
    });

    it("should return missing fields", () => {
      const req: any = {
        body: {},
      };
      validateFields(["name", "email", "password"])(
        req,
        res as unknown as Response,
        next
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Missing fields: name, email, password",
      });
    });

    it("should call next function if all fields are present", () => {
      const req: any = {
        body: {
          name: "test",
          email: "test@email.com",
          password: "test",
        },
      };
      validateFields(["name", "email", "password"])(
        req,
        res as unknown as Response,
        next
      );
      expect(next).toHaveBeenCalled();
    });
  });

  describe("validateToken", () => {
    it("should require token", () => {
      const req: any = {
        headers: {},
      };
      validateToken(req, res as unknown as Response, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: "Missing token",
      });
    });

    it("should validate token", () => {
      const req: any = {
        headers: {
          authorization: "wrong token",
        },
      };
      validateToken(req, res as unknown as Response, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: "Invalid token",
      });
    });

    it("should pass correct token", () => {
      const req: any = {
        headers: {
          authorization: "correct token",
        },
      };
      validateToken(req, res as unknown as Response, next);
      expect(res.status).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});

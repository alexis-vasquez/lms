import request from "supertest";
import { app } from "../app";

jest.mock("jsonwebtoken", () => ({
  verify: (token: string) => {
    if (token !== "correct token") throw new Error("Invalid token");
  },
  sign: jest.fn().mockReturnValue("correct token"),
}));

jest.mock("@/database/models", () => {
  let createdUser = false;
  return {
    User: {
      findOne: jest.fn((query) => {
        if (query.where.email === "validuser@lms.com" && !createdUser) {
          createdUser = true;
          return undefined;
        }
        if (query.where.email === "unknownuser@lms.com") return undefined;
        return {
          id: 1,
          email: "test@lms.com",
          password: "12345678",
          role: "admin",
        };
      }),
      create: jest.fn(),
    },
  };
});

jest.mock("bcryptjs", () => ({
  compare: jest.fn((password: string) => {
    if (password !== "correct") return false;
    return true;
  }),
  hash: jest.fn((password: string) => password),
}));

describe("Auth Router", () => {
  describe("Authentication", () => {
    test("It should require token", async () => {
      const response = await request(app).get("/api/auth/");
      expect(response.headers["content-type"]).toMatch(/application\/json/);
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe("Missing token");
    });

    test("It should validate wrong token", async () => {
      const response = await request(app)
        .get("/api/auth/")
        .set({ Authorization: "wrong token" });
      expect(response.headers["content-type"]).toMatch(/application\/json/);
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe("Invalid token");
    });

    test("It should validate correct token", async () => {
      const response = await request(app)
        .get("/api/auth/")
        .set({ Authorization: "correct token" });
      expect(response.headers["content-type"]).toMatch(/application\/json/);
      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBe("correct token");
    });
  });

  describe("Login", () => {
    test("It should require all fields when login", async () => {
      const response = await request(app).post("/api/auth/login").send({});
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe("Missing fields: email, password");
    });

    test("It should require missing fields when login", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@test.com" });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe("Missing fields: password");
    });

    test("It should return invalid email message", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "unknownuser@lms.com", password: "correct" });
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe("User not found");
    });

    test("It should return invalid password message", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@lms.com", password: "wrong" });
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe("Invalid password");
    });

    test("It should login with correct credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@lms.com", password: "correct" });
      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBe("correct token");
    });
  });

  describe("Register", () => {
    test("It should require all fields when register", async () => {
      const response = await request(app).post("/api/auth/register").send({});
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe(
        "Missing fields: email, password, firstName, lastName"
      );
    });

    test("It should require missing fields when register", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({ email: "test@test.com", password: "any" });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe("Missing fields: firstName, lastName");
    });

    test("It should return an error when user already exist", async () => {
      const response = await request(app).post("/api/auth/register").send({
        email: "existinguser@test.com",
        password: "any",
        firstName: "test",
        lastName: "test",
      });
      expect(response.statusCode).toBe(409);
      expect(response.body.error).toBe(
        "An user with this email already exists"
      );
    });

    test("It should register with correct credentials", async () => {
      const response = await request(app).post("/api/auth/register").send({
        email: "validuser@lms.com",
        password: "any",
        firstName: "test",
        lastName: "test",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBe("correct token");
    });
  });
});

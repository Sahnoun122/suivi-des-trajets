import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js";
import userModel from "../models/user.model.js";
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await userModel.deleteMany();
});

describe("Auth Tests", () => {
  test("POST /api/auth/register → doit créer un utilisateur", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@gmail.com",
      phone: "0600000000",
      role: "driver",
      password: "123456",
      licenseNumber: "ABC123",
      status: "active",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe("test@gmail.com");
  });

  test("POST /api/auth/login → doit connecter un utilisateur", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Login User",
      email: "login@gmail.com",
      phone: "0600000000",
      role: "driver",
      password: "123456",
      licenseNumber: "XYZ999",
      status: "active",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "login@gmail.com",
      password: "123456",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe("login@gmail.com");
  });

  test("POST /api/auth/login → refuse mauvais mot de passe", async () => {
    await request(app).post("/api/auth/register").send({
      name: "BadPass User",
      email: "badpass@gmail.com",
      phone: "0600000000",
      role: "driver",
      password: "correctpassword",
      licenseNumber: "L000",
      status: "active",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "badpass@gmail.com",
      password: "wrongpassword",
    });

    expect(res.status).toBe(401);
  });
});

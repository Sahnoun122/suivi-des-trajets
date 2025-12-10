import { jest } from "@jest/globals";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

jest.unstable_mockModule("../config/jwt.js", () => ({
  verifyToken: (token) => {
    if (token === "admin-token") return { id: "1", role: "admin" };
    if (token === "user-token") return { id: "2", role: "user" };
    throw new Error("Invalid token");
  },
}));

const { default: app } = await import("../app.js");

describe("Truck API Tests", () => {
  let mongoServer;
  let createdTruckId;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  const truckData = {
    matricule: "TRK-2025",
    marque: "Volvo",
    model: "FH16",
    year: 2021,
    kilometrage: 150000,
  };

  it("Admin peut créer un camion", async () => {
    const res = await request(app)
      .post("/api/trucks")
      .set("Authorization", "Bearer admin-token")
      .send(truckData);

    expect(res.statusCode).toBe(201);
    expect(res.body.matricule).toBe("TRK-2025");
    createdTruckId = res.body._id;
  });

  it("User peut consulter la liste", async () => {
    const res = await request(app)
      .get("/api/trucks")
      .set("Authorization", "Bearer user-token");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Admin peut modifier un camion", async () => {
    const res = await request(app)
      .put(`/api/trucks/${createdTruckId}`)
      .set("Authorization", "Bearer admin-token")
      .send({ kilometrage: 200000 });

    expect(res.statusCode).toBe(200);
    expect(res.body.kilometrage).toBe(200000);
  });

  it("Admin peut supprimer un camion", async () => {
    const res = await request(app)
      .delete(`/api/trucks/${createdTruckId}`)
      .set("Authorization", "Bearer admin-token");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Camion supprimé");
  });

  it("User non-admin ne peut pas créer un camion", async () => {
    const res = await request(app)
      .post("/api/trucks")
      .set("Authorization", "Bearer user-token")
      .send(truckData);

    expect(res.statusCode).toBe(403);
  });
});

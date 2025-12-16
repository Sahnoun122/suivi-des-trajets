import { jest } from "@jest/globals";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

process.env.JWT_SECRET = "testsecret";
process.env.NODE_ENV = "test";

jest.unstable_mockModule("../config/jwt.js", () => ({
  generateToken: (payload) => "mocked-token",
  verifyToken: (token) => {
    if (token === "driver-token") return { id: "507f1f77bcf86cd799439013", role: "driver" };
    if (token === "admin-token") return { id: "507f1f77bcf86cd799439011", role: "admin" };
    throw new Error("Invalid token");
  },
}));

jest.unstable_mockModule("../models/user.model.js", () => ({
  default: {
    findById: jest.fn().mockImplementation((id) => ({
      select: jest.fn().mockResolvedValue({
        _id: id,
        name: id === "507f1f77bcf86cd799439011" ? "Admin User" : "Driver User",
        role: id === "507f1f77bcf86cd799439011" ? "admin" : "driver",
        status: "active"
      })
    }))
  }
}));

const { default: app } = await import("../app.js");

const { default: Trip } = await import("../models/Trajets.model.js");

describe("Driver API Tests", () => {
  let mongoServer;
  let tripId = "507f1f77bcf86cd799439014";

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  const driverId = "507f1f77bcf86cd799439013"; 

  const tripData = {
    reference: "TRP-001",
    origine: "Casablanca",
    destination: "Agadir",
    chauffeurId: new mongoose.Types.ObjectId(driverId),
    camionId: new mongoose.Types.ObjectId(),
    creePar: new mongoose.Types.ObjectId(),
    statut: "planifie",
  };

  it("Driver peut consulter ses trajets", async () => {
    const createdTrip = await Trip.create(tripData);
    tripId = createdTrip._id.toString();
    const res = await request(app)
      .get("/api/driver/my-trips")
      .set("Authorization", "Bearer driver-token");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    
    if (res.body.length > 0) {
      expect(res.body[0].reference).toBe("TRP-001");
      tripId = res.body[0]._id;
    }
  });

  it("Driver peut mettre à jour le statut du trajet", async () => {
    const res = await request(app)
      .put(`/api/driver/${tripId}/status`)
      .set("Authorization", "Bearer driver-token")
      .send({ statut: "en_cours" });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.statut).toBe("en_cours");
  });

  it("Driver peut saisir les détails du trajet", async () => {
    const res = await request(app)
      .put(`/api/driver/${tripId}/details`)
      .set("Authorization", "Bearer driver-token")
      .send({
        odometreDebut: 10000,
        odometreFin: 10500,
        carburantDepart: 60,
        carburantFin: 40,
        remarques: "Tout va bien",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.odometreFin).toBe(10500);
    expect(res.body.remarques).toBe("Tout va bien");
  });

  it("Driver peut demander un PDF d’un trajet", async () => {
    const res = await request(app)
      .get(`/api/driver/${tripId}/pdf`)
      .set("Authorization", "Bearer driver-token");

    
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("PDF generated (mock)");
  });
});

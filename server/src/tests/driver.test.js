import { jest } from "@jest/globals";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

process.env.JWT_SECRET = "testsecret";

jest.unstable_mockModule("../config/jwt.js", () => ({
  verifyToken: (token) => {
    if (token === "driver-token") return { id: "driver123", role: "driver" };
    if (token === "admin-token") return { id: "admin123", role: "admin" };
    throw new Error("Invalid token");
  },
}));

const { default: app } = await import("../app.js");

const { default: Trip } = await import("../models/Trip.model.js");

describe("Driver API Tests", () => {
  let mongoServer;
  let tripId;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  const driverId = new mongoose.Types.ObjectId();

  const tripData = {
    reference: "TRP-001",
    origine: "Casablanca",
    destination: "Agadir",
    chauffeurId: driverId,
    camionId: new mongoose.Types.ObjectId(),
    creePar: new mongoose.Types.ObjectId(),
  };

  it("Driver peut consulter ses trajets", async () => {
    await Trip.create(tripData);

    const res = await request(app)
      .get("/api/driver/my-trips")
      .set("Authorization", "Bearer driver-token");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].reference).toBe("TRP-001");

    tripId = res.body[0]._id;
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

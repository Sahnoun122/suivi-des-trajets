import { jest } from "@jest/globals";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

process.env.JWT_SECRET = "testsecret";

jest.unstable_mockModule("../config/jwt.js", () => ({
  verifyToken: (token) => {
    if (token === "admin-token") return { id: "1", role: "admin" };
    if (token === "user-token") return { id: "2", role: "user" };
    throw new Error("Invalid token");
  },
}));

const { default: app } = await import("../app.js");

describe("Tests Pneu & Remorque API", () => {
  let mongoServer;
  let createdPneuId;
  let createdRemorqueId;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  // --- Données de test ---
  const pneuData = {
    numeroSerie: "PNEU-001",
    marque: "Michelin",
    type: "été",
    kilometrage: 12000,
    installeLe: "2025-01-10T00:00:00.000Z",
    statut: "bon",
    monteSur: {
      typeMateriel: "Camion",
      materielId: new mongoose.Types.ObjectId(),
    },
  };

  const remorqueData = {
    matricule: "REM-001",
    type: "benne",
    poidsVide: 3000,
    poidsMax: 10000,
    statut: "active",
  };

  it("Admin peut créer un pneu", async () => {
    const res = await request(app)
      .post("/api/pneus")
      .set("Authorization", "Bearer admin-token")
      .send(pneuData);

    expect(res.statusCode).toBe(201);
    expect(res.body.numeroSerie).toBe("PNEU-001");
    createdPneuId = res.body._id;
  });

  it("User peut consulter la liste des pneus", async () => {
    const res = await request(app)
      .get("/api/pneus")
      .set("Authorization", "Bearer user-token");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Admin peut modifier un pneu", async () => {
    const res = await request(app)
      .put(`/api/pneus/${createdPneuId}`)
      .set("Authorization", "Bearer admin-token")
      .send({ kilometrage: 15000 });

    expect(res.statusCode).toBe(200);
    expect(res.body.kilometrage).toBe(15000);
  });

  it("Admin peut supprimer un pneu", async () => {
    const res = await request(app)
      .delete(`/api/pneus/${createdPneuId}`)
      .set("Authorization", "Bearer admin-token");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Pneu supprimé");
  });

  // ====== REMORQUE TESTS ======
  it("Admin peut créer une remorque", async () => {
    const res = await request(app)
      .post("/api/remorques")
      .set("Authorization", "Bearer admin-token")
      .send(remorqueData);

    expect(res.statusCode).toBe(201);
    expect(res.body.matricule).toBe("REM-001");
    createdRemorqueId = res.body._id;
  });

  it("User peut consulter la liste des remorques", async () => {
    const res = await request(app)
      .get("/api/remorques")
      .set("Authorization", "Bearer user-token");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Admin peut modifier une remorque", async () => {
    const res = await request(app)
      .put(`/api/remorques/${createdRemorqueId}`)
      .set("Authorization", "Bearer admin-token")
      .send({ poidsMax: 12000 });

    expect(res.statusCode).toBe(200);
    expect(res.body.poidsMax).toBe(12000);
  });

  it("Admin peut supprimer une remorque", async () => {
    const res = await request(app)
      .delete(`/api/remorques/${createdRemorqueId}`)
      .set("Authorization", "Bearer admin-token");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Remorque supprimée");
  });
});

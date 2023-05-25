const request = require("supertest");
const app = require("../app");
const { getAllPokemons } = require("../controllers");

describe("GET /pokemons/:id", () => {
  it("responds with 200 when given a valid id", async () => {
    const pokemonsTotal = await getAllPokemons();
    const id = pokemonsTotal[0].id;
    const response = await request(app).get(`/pokemons/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("responds with 404 when given an invalid id", async () => {
    const response = await request(app).get("/pokemons/999");
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe("That pokemon was not found");
  });
});

import supertest from "supertest";
import app from './index';

const fastify = app;
describe("App", () => {
  beforeAll(async () => {
    await fastify.ready();
  });

  afterAll(() => {
    fastify.close();
  });

  it('should return a successful response for GET /', async () => {
    const response = await supertest(fastify.server).get("/").expect(200).expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body).toMatchObject({ hello: 'world' })
  });
});
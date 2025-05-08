const request = require("supertest");
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma =  new PrismaClient({errorFormat: "minimal"});
const app = express();
const eventosRouter = require('../routes/eventosRouter');

app.use(express.json());
app.use("/", eventosRouter);

describe('Testa endpoints /eventos', () => {

    beforeAll( async () => {
        await prisma.evento.deleteMany({});
    });

    afterAll( async () => {
        await prisma.evento.deleteMany({});
    });

    let evento = {
        "nome": "Semana de Ciência",
        "data": "2025-05-19",
        "local": "Centro de Exposições de Caraguatatuba"
    };
    let eventoId;

    it('POST /eventos', async () => {
        let response = await request(app).post('/eventos').send(evento);

        eventoId = response.body.id;

        expect(response.statusCode).toBe(201);

        evento.data = "AAA";
        response = await request(app).post('/eventos').send(evento);

        expect(response.statusCode).toBe(500);

    });

    it('GET /eventos', async () => {
        let response = await request(app).get('/eventos');

        expect(response.statusCode).toBe(200);
        expect(response.body[0].id).toBe(eventoId);

        response = await request(app).get(`/eventos/${eventoId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(eventoId);

        response = await request(app).get(`/eventos/${eventoId + 1}`);
        expect(response.statusCode).toBe(404);

    });

    it('PUT /eventos/:id', async () => {
        evento.data = "2025-05-19";
        let response = await request(app).put(`/eventos/${eventoId}`).send(evento);
        
        expect(response.statusCode).toBe(200);


        response = await request(app).put(`/eventos/${eventoId + 1}`).send(evento);
        
        expect(response.statusCode).toBe(404);

        delete evento.data;
        response = await request(app).put(`/eventos/${eventoId}`).send(evento);

        expect(response.statusCode).toBe(500);

    });

    it('DELETE /eventos/:id', async () => {
        let response = await request(app).delete(`/eventos/${eventoId}`);

        expect(response.statusCode).toBe(204);

        response = await request(app).delete(`/eventos/${eventoId}`);

        expect(response.statusCode).toBe(404);

    });
});
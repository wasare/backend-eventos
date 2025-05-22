const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Listar todos os eventos
router.get('/eventos', async (req, res) => {
    try {
      const eventos = await prisma.evento.findMany();
      res.json(eventos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os eventos.' });
    }
  });
  
// Buscar um evento por ID
router.get('/eventos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const evento = await prisma.evento.findUnique({
            where: { id },
        });
        if (!evento) {
            return res.status(404).json({ error: 'Evento não encontrado.' });
        }
        res.json(evento);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o evento.' });
    }
});

// Criar um novo evento
router.post('/eventos', async (req, res) => {
    const { nome, data, local } = req.body;
    try {
        const novoEvento = await prisma.evento.create({
        data: {
            nome,
            data: new Date(data),
            local,
        },
        });
        res.status(201).json(novoEvento);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o evento.' });
    }
});

// Atualizar um evento existente
router.put('/eventos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, data, local } = req.body;
    try {
        const eventoExistente = await prisma.evento.findUnique({ where: { id } });
        if (!eventoExistente) {
        return res.status(404).json({ error: 'Evento não encontrado.' });
        }

        const eventoAtualizado = await prisma.evento.update({
        where: { id },
        data: {
            nome,
            data: new Date(data),
            local,
        },
        });
        res.json(eventoAtualizado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o evento.' });
    }
});

// Deletar um evento
router.delete('/eventos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const eventoExistente = await prisma.evento.findUnique({ where: { id } });
        if (!eventoExistente) {
            return res.status(404).json({ error: 'Evento não encontrado.' });
        }

        await prisma.evento.delete({
        where: { id },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o evento.' });
    }
});

module.exports = router;

// TESTE DE COMMIT E PUSH
import express from 'express';
import { getAllMessages, createMessage, deleteMessage } from '../controllers/messageController.js';

const router = express.Router();

// Obtener todos los mensajes
router.get('/', getAllMessages);

// Crear un nuevo mensaje
router.post('/', createMessage);

// Eliminar un mensaje específico
router.delete('/:id', deleteMessage);

export default router;

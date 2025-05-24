import db from '../models/index.js';

const { Message } = db;

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      order: [['date', 'DESC']]
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createMessage = async (req, res) => {
  const { name, message } = req.body;
  try {
    // Validar que se proporcionen los campos requeridos
    if (!name || !message) {
      return res.status(400).json({ 
        message: 'Se requieren los campos name y message'
      });
    }

    const newMessage = await Message.create({
      name,
      message,
      date: new Date()
    });
    
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findByPk(id);
    
    if (!message) {
      return res.status(404).json({ message: 'Mensaje no encontrado' });
    }
    
    await message.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

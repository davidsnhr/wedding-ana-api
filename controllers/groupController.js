import db from '../models/index.js';

const { Group, Guest } = db;

export const createGroup = async (req, res) => {
  const { name, guests } = req.body;
  try {
    const newGroup = await Group.create(
      {
        name,
        confirmedGuests: 0,
        guests,
      },
      {
        include: [
          {
            model: Guest,
            as: 'guests',
          },
        ],
      }
    );
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.findAll({
      include: {
        model: Guest,
        as: 'guests',
      },
    });
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGroupById = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.findByPk(id, {
      include: {
        model: Guest,
        as: 'guests',
      },
    });
    if (!group) return res.status(404).json({ message: 'Grupo no existe' });
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateGroup = async (req, res) => {
  const { id } = req.params;
  const { name, confirmedGuests, guests } = req.body;

  try {
    // Buscar el grupo existente
    const group = await Group.findByPk(id, {
      include: {
        model: Guest,
        as: 'guests',
      },
    });

    if (!group) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }

    // Actualizar las propiedades del grupo
    await group.update({ name, confirmedGuests });

    // Obtener los IDs de los invitados actuales y los nuevos
    const currentGuestIds = group.guests.map((guest) => guest.id);
    const newGuestIds = guests.map((guest) => guest.id).filter((id) => id); // IDs de los nuevos invitados

    // Eliminar invitados que ya no están en la lista
    const guestsToRemove = group.guests.filter(
      (guest) => !newGuestIds.includes(guest.id)
    );
    await Promise.all(guestsToRemove.map((guest) => guest.destroy()));

    // Añadir nuevos invitados
    const guestsToAdd = guests.filter((guest) => !guest.id); // Invitados sin ID son nuevos
    await Promise.all(
      guestsToAdd.map((guest) =>
        Guest.create({ ...guest, groupId: group.id })
      )
    );

    // Actualizar invitados existentes
    const guestsToUpdate = guests.filter((guest) =>
      currentGuestIds.includes(guest.id)
    );
    await Promise.all(
      guestsToUpdate.map((guest) =>
        Guest.update(guest, { where: { id: guest.id } })
      )
    );

    // Retornar el grupo actualizado con los invitados
    const updatedGroup = await Group.findByPk(id, {
      include: {
        model: Guest,
        as: 'guests',
      },
    });

    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteGroup = async (req, res) => {
  const { id } = req.params;

  try {
    const group = await Group.findByPk(id);

    if (!group) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }

    await group.destroy();

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

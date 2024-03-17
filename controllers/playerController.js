import User from '../models/playerModel.js';

// Crear un nuevo jugador para un usuario
export const addPlayer = async (req, res) => {
    const { userId } = req.params;
    const { playerName, playerAge } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        user.players.push({ playerName, playerAge });
        await user.save();
        res.status(201).json({ message: 'Jugador añadido correctamente.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los jugadores de un usuario
export const getAllPlayers = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.status(200).json({ players: user.players });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un jugador específico de un usuario
export const getPlayerById = async (req, res) => {
    const { userId, playerId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        const player = user.players.id(playerId);
        if (!player) {
            return res.status(404).json({ message: 'Jugador no encontrado.' });
        }
        res.status(200).json({ player });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un jugador específico de un usuario
export const updatePlayer = async (req, res) => {
    const { userId, playerId } = req.params;
    const { playerName, playerAge } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        const player = user.players.id(playerId);
        if (!player) {
            return res.status(404).json({ message: 'Jugador no encontrado.' });
        }
        player.playerName = playerName;
        player.playerAge = playerAge;
        await user.save();
        res.status(200).json({ message: 'Jugador actualizado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un jugador específico de un usuario
export const deletePlayer = async (req, res) => {
    const { userId, playerId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        const player = user.players.id(playerId);
        if (!player) {
            return res.status(404).json({ message: 'Jugador no encontrado.' });
        }
        player.remove();
        await user.save();
        res.status(200).json({ message: 'Jugador eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

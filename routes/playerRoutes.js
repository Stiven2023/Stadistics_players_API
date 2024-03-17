import express from 'express';
import verifyToken from '../middlewares/authMiddleware.js';
import { addPlayer, getAllPlayers, getPlayerById, updatePlayer, deletePlayer } from '../controllers/playerController.js';

const router = express.Router();

// Rutas protegidas por token
router.post('/:userId/players', verifyToken, addPlayer);
router.get('/:userId/players', verifyToken, getAllPlayers);
router.get('/:userId/players/:playerId', verifyToken, getPlayerById);
router.put('/:userId/players/:playerId', verifyToken, updatePlayer);
router.delete('/:userId/players/:playerId', verifyToken, deletePlayer);

export default router;

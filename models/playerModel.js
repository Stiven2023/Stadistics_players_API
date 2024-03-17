import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const playerSchema = new Schema({
    playerName: { type: String, required: true },
    playerAge: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 }
});

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    players: [playerSchema]
});

const User = model('User', userSchema);

export default User;

const { Session, User, Role, Book } = require("../models");

// Create a new borrowing session
const createNewSession = async (body) => {
    return Session.create({ ...body});
}

// Find all sessions with optional filters
const findManySessions = async (searchParam = {}) => {
    return Session.findAll({ 
        where: { ...searchParam },
        include: [
            { model: User, include: [Role] },
            { model: Book }
        ]
    });
}

// Find session by ID
const findSessionById = async (id) => {
    const session = await Session.findByPk(id, {
        include: [
            { model: User, include: [Role] },
            { model: Book }
        ]
    });
    if (!session) throw new Error('Session with specified id does not exist');
    return session;
}

// Update session (e.g., mark as returned)
const findSessionByIdAndUpdate = async (id, body) => {
    const session = await findSessionById(id);
    for (const key of Object.keys(body)) {
        session[key] = body[key] ?? session[key];
    }
    await session.save();
    return session;
}

// Delete session
const findSessionByIdAndDelete = async (id) => {
    const session = await findSessionById(id);
    await session.destroy();
    return session;
}

module.exports = { 
    createNewSession,
    findManySessions,
    findSessionById,
    findSessionByIdAndUpdate,
    findSessionByIdAndDelete 
}
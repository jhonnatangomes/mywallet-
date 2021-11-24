import jwt from 'jsonwebtoken';
import * as financialRepository from '../repositories/financialRepository.js';

function verifyUser(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return null;
    }
}

function postEvent({ userId, value, type }) {
    return financialRepository.postEvent({ userId, value, type });
}

function getEvents(userId) {
    return financialRepository.getEvents(userId);
}

async function getSum(userId) {
    const events = await financialRepository.getEvents(userId);

    const sum = events.rows.reduce(
        (total, event) =>
            event.type === 'INCOME' ? total + event.value : total - event.value,
        0
    );
    return sum;
}

export { verifyUser, postEvent, getEvents, getSum };

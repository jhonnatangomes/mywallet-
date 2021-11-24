import * as financialServices from '../services/financialServices.js';

async function postEvent(req, res) {
    try {
        const { user } = res.locals;

        const { value, type } = req.body;

        if (!value || !type) {
            return res.sendStatus(400);
        }

        if (!['INCOME', 'OUTCOME'].includes(type)) {
            return res.sendStatus(400);
        }

        if (value < 0) {
            return res.sendStatus(400);
        }

        await financialServices.postEvent({ userId: user.id, value, type });

        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function getEvents(req, res) {
    try {
        const { user } = res.locals;

        const events = await financialServices.getEvents(user.id);

        res.send(events.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function getSum(req, res) {
    try {
        const { user } = res.locals;

        const sum = await financialServices.getSum(user.id);

        res.send({ sum });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export { postEvent, getEvents, getSum };

import * as userServices from '../services/userServices.js';

async function signUp(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.sendStatus(400);
        }

        const user = await userServices.createUser(req.body);
        if (!user) {
            return res.sendStatus(409);
        }

        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function signIn(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const token = await userServices.createSession(req.body);
        if (!token) {
            return res.sendStatus(401);
        }

        res.send({
            token,
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export { signUp, signIn };

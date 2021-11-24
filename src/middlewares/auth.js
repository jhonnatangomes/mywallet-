import * as financialServices from '../services/financialServices.js';

export default async function auth(req, res, next) {
    const authorization = req.headers.authorization || '';
    const token = authorization.split('Bearer ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    const user = financialServices.verifyUser(token);
    if (!user) {
        return res.sendStatus(401);
    }
    res.locals.user = user;
    return next();
}

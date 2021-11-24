import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/userRepository.js';

async function createUser({ name, email, password }) {
    const existingUserWithGivenEmail = await userRepository.getUserByEmail(
        email
    );

    if (existingUserWithGivenEmail.rows[0]) {
        return null;
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    return userRepository.createUser({ name, email, password: hashedPassword });
}

async function createSession({ email, password }) {
    const user = await userRepository.getUserByEmail(email);

    if (!user.rows[0] || !bcrypt.compareSync(password, user.rows[0].password)) {
        return null;
    }

    const token = jwt.sign(
        {
            id: user.rows[0].id,
        },
        process.env.JWT_SECRET
    );

    return token;
}

export { createUser, createSession };

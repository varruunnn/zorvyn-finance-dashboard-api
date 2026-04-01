import { type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from '../utils/prisma.js';
import { loginSchema, registerSchema } from "../utils/validation.js";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const parsedData = registerSchema.parse(req.body)
        const existingUser = await prisma.user.findUnique({ where: { email: parsedData.email } })
        if (existingUser) {
            res.status(400).json({ error: 'Email exists' })
            return;
        }

        const passwordHash = await bcrypt.hash(parsedData.password, 10);
        const role = parsedData.role || 'VIEWER'
        const user = await prisma.user.create({
            data: {
                email: parsedData.email,
                passwordHash,
                role
            }
        })
        res.status(201).json({ id: user.id, email: user.email, role: user.role })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Validation failed' })
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const parsedData = loginSchema.parse(req.body)
        const user = await prisma.user.findUnique({ where: { email: parsedData.email } });

        if (!user || !user.isActive) {
            res.status(401).json({ error: 'Invalid credentials or inactive account' })
            return;
        }

        const isMatch = await bcrypt.compare(parsedData.password, user.passwordHash);

        if (!isMatch) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: 'Validation failed or invalid input' });
    }
}
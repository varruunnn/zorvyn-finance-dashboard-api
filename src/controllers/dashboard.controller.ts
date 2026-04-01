import { type Response } from 'express';
import { prisma } from '../utils/prisma.js';
import { type AuthRequest } from '../middlewares/auth.middleware.js';

export const getDashboardSummary = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const incomeAgg = await prisma.financialRecord.aggregate({
            _sum: { amount: true },
            where: { type: 'INCOME' }
        });

        const expenseAgg = await prisma.financialRecord.aggregate({
            _sum: { amount: true },
            where: { type: 'EXPENSE' }
        });

        const totalIncome = incomeAgg._sum.amount || 0;
        const totalExpenses = expenseAgg._sum.amount || 0;
        const netBalance = totalIncome - totalExpenses;

        const categoryGroups = await prisma.financialRecord.groupBy({
            by: ['category'],
            _sum: { amount: true }
        });

        const categoryTotals = categoryGroups.map(group => ({
            category: group.category,
            total: group._sum.amount || 0
        }));

        const recentActivity = await prisma.financialRecord.findMany({
            orderBy: { transactionDate: 'desc' },
            take: 5
        });

        res.status(200).json({
            totalIncome,
            totalExpenses,
            netBalance,
            categoryTotals,
            recentActivity
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dashboard summary' });
    }
};
import { prisma } from '../utils/prisma.js';

export const getSummaryData = async () => {
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

    return {
        totalIncome,
        totalExpenses,
        netBalance,
        categoryTotals,
        recentActivity
    };
};
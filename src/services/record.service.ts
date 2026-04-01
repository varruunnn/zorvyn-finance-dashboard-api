import { prisma } from '../utils/prisma.js';

export const createFinancialRecord = async (data: any, userId: string) => {
    return prisma.financialRecord.create({
        data: {
            ...data,
            userId
        }
    });
};

export const getFinancialRecords = async (filter: any) => {
    return prisma.financialRecord.findMany({
        where: filter,
        orderBy: { transactionDate: 'desc' }
    });
};

export const getFinancialRecordById = async (id: string) => {
    return prisma.financialRecord.findUnique({ where: { id } });
};

export const updateFinancialRecord = async (id: string, data: any) => {
    return prisma.financialRecord.update({
        where: { id },
        data
    });
};

export const deleteFinancialRecord = async (id: string) => {
    return prisma.financialRecord.delete({ where: { id } });
};
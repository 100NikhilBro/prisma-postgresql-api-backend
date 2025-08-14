const { PrismaClient } = require('../generated/prisma');

const isDev = process.env.NODE_ENV === 'development';

exports.prisma = new PrismaClient({
    log: isDev ? ['query', 'info', 'warn', 'error'] : ['error']
});

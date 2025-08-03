const { PrismaClient } = require('../generated/prisma');

exports.prisma = new PrismaClient({
    log: ['query']
});
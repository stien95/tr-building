import { PrismaClient } from '@prisma/client';

// Inicializar una única instancia de PrismaClient
const prisma = new PrismaClient();

// Exportar la instancia de Prisma para que pueda ser utilizada en otras partes de tu aplicación
export { prisma };

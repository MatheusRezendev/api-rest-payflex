import { PrismaClient } from '@prisma/client';
import { CarteiraRepository } from '../carteira.repositories';

export class CarteiraRepositoryPrisma implements CarteiraRepository {
  private constructor(readonly prisma: PrismaClient) {}
  public build(prisma: PrismaClient) {
    return new CarteiraRepositoryPrisma(prisma);
  }

  public async getSaldo(userId: string): Promise<number> {
    const carteira = await this.prisma.carteira.findUnique({
      where: { userId },
    });

    if (!carteira) {
      throw new Error('Carteira não encontrada para o usuário');
    }

    return carteira.saldo;
  }

  public async atualizarSaldo(userId: string, novoSaldo: number): Promise<void> {
    const carteira = await this.prisma.carteira.findUnique({
      where: { userId },
    });

    if (!carteira) {
      throw new Error('Carteira não encontrada para o usuário');
    }

    await this.prisma.carteira.update({
      where: { userId },
      data: { saldo: novoSaldo },
    });
  }

  public async criarCarteira(userId: string, saldoInicial: number): Promise<void> {
    const existingCarteira = await this.prisma.carteira.findUnique({
      where: { userId },
    });

    if (existingCarteira) {
      throw new Error('Carteira já existe para o usuário');
    }

    await this.prisma.carteira.create({
      data: {
        userId,
        saldo: saldoInicial,
      },
    });
  }
}

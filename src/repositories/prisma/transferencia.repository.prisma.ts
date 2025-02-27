import { PrismaClient } from '@prisma/client';
import { Transferencia } from '../../entities/transferencia';
import { TransferenciaRepository } from '../../repositories/transferencia.repositories';
import { StatusTranferencia } from '../../entities/transferencia';

export class TransferenciaRepositoryPrisma implements TransferenciaRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new TransferenciaRepositoryPrisma(prisma);
  }

  public async save(transferencia: Transferencia): Promise<void> {
    await this.prisma.transferencia.create({
      data: {
        id: transferencia.id,
        idUserEnvia: transferencia.idUserEnvia,
        idUserRecebe: transferencia.idUserRecebe,
        valor: transferencia.valor,
        status: transferencia.status,
        dataCriacao: transferencia.dataCriacao,
      },
    });
  }

  public async findById(id: string): Promise<Transferencia | null> {
    const transferencia = await this.prisma.transferencia.findUnique({
      where: { id },
    });

    if (!transferencia) return null;

    return Transferencia.build(
      transferencia.idUserEnvia,
      transferencia.idUserRecebe,
      transferencia.valor,
      transferencia.status as StatusTranferencia,
      transferencia.dataCriacao
    );
  }

  public async listByUserId(userId: string): Promise<Transferencia[]> {
    const transferencias = await this.prisma.transferencia.findMany({
      where: {
        OR: [
          { idUserEnvia: userId },
          { idUserRecebe: userId },
        ],
      },
    });

    return transferencias.map(transferencia => {
      return Transferencia.build(
        transferencia.idUserEnvia,
        transferencia.idUserRecebe,
        transferencia.valor,
        transferencia.status as StatusTranferencia,
        transferencia.dataCriacao
      );
    });
  }

  public async updateStatus(id: string, status: StatusTranferencia): Promise<void> {
    await this.prisma.transferencia.update({
      where: { id },
      data: { status },
    });
  }
}

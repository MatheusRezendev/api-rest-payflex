import { PrismaClient } from '@prisma/client';
import { User } from '../../entities/user';
import { UserRepository } from '../user.repositories';
import { UserType } from '../../entities/userType';

export class UserRepositoryPrisma implements UserRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public build(prisma: PrismaClient) {
    return new UserRepositoryPrisma(prisma);
  }

  private convertToPrismaUserType(tipo: UserType): string {
    return tipo;
  }

  private convertFromPrismaUserType(tipo: string): UserType {
    if (tipo === 'usuario') {
      return UserType.usuario;
    } else if (tipo === 'lojista') {
      return UserType.lojista;
    }

    throw new Error('Tipo de usuário inválido');
  }

  public async save(user: User): Promise<void> {
    const data = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      senha: user.senha,
      tipo: this.convertToPrismaUserType(user.tipo),
      cpf: user.cpf ?? undefined,
      cnpj: user.cnpj ?? undefined
    };

    await this.prisma.user.create({ data });
  }

  public async list(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user) => {
      return User.build(
        user.nome,
        user.email,
        user.senha,
        this.convertFromPrismaUserType(user.tipo),
        user.cpf ?? "",
        user.cnpj ?? "",
      );
    });
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return User.build(
      user.nome,
      user.email,
      user.senha,
      this.convertFromPrismaUserType(user.tipo),
      user.cpf ?? "",
      user.cnpj ?? "",
    );
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return User.build(
      user.nome,
      user.email,
      user.senha,
      this.convertFromPrismaUserType(user.tipo),
      user.cpf ?? "",
      user.cnpj ?? "",
    );
  }

  public async findByCpf(cpf: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { cpf },
    });

    if (!user) return null;

    return User.build(
      user.nome,
      user.email,
      user.senha,
      this.convertFromPrismaUserType(user.tipo),
      user.cpf ?? "",
      user.cnpj ?? "",
    );
  }

  public async findByCnpj(cnpj: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { cnpj },
    });

    if (!user) return null;

    return User.build(
      user.nome,
      user.email,
      user.senha,
      this.convertFromPrismaUserType(user.tipo),
      user.cpf ?? "",
      user.cnpj ?? "",
    );
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}

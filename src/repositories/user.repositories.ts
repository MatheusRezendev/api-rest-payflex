import { User } from "../entities/user";
export interface UserRepository {
    save(user: User): Promise<void>;
    list(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByCpf(cpf: string): Promise<User | null>;
    findByCnpj(cnpj: string): Promise<User | null>;
    delete(id: string): Promise<void>;
}
export interface CarteiraRepository {
    getSaldo(userId: string): Promise<number>;
    alterarSaldo(userId: string, novoSaldo: number): Promise<void>;
}
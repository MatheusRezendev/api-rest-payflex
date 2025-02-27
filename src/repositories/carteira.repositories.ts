export interface CarteiraRepository {
    getSaldo(userId: string): Promise<number>;
    atualizarSaldo(userId: string, novoSaldo: number): Promise<void>;
    criarCarteira(userId: string, saldoInicial: number): Promise<void>;
}
export type CriarCarteiraDTO = {
    saldoInicial?: number;
    userId: string;
}

export type AtualizarCarteiraDTO = {
    saldo?: number;
}

export type CarteiraResponseDTO = {
    id: string;
    saldo: number;
    userId: string;
}

export interface CarteiraService {
    getSaldo(userId: string): Promise<number>;
    adicionarSaldo(userId: string, valor: number): Promise<void>;
    removerSaldo(userId: string, valor: number): Promise<void>;
}

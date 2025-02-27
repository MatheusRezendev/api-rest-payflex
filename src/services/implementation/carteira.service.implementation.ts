import { CarteiraRepository } from "../../repositories/carteira.repositories";
import { CarteiraService } from "../carteira.service";

export class CarteiraServiceImplementation implements CarteiraService{
    constructor(readonly repository: CarteiraRepository){}
    public async criarCarteira(userId: string, saldoInicial: number = 0): Promise<void> {
        await this.repository.criarCarteira(userId, saldoInicial);
    }

    public async getSaldo(userId: string): Promise<number> {
        const saldo =  await this.repository.getSaldo(userId);

        return saldo;
    }

    public async adicionarSaldo(userId: string, valor: number): Promise<void> {
        if(valor <= 0){
            throw new Error("O valor e invalido!");
        }

        const saldoAtual = await this.getSaldo(userId);
        const novoSaldo = saldoAtual + valor;

        await this.repository.atualizarSaldo(userId,novoSaldo);
    }

    public async removerSaldo(userId: string, valor: number): Promise<void> {
        const saldoAtual = await this.getSaldo(userId);
        
        if(saldoAtual < valor){
            throw new Error("Saldo Insuficiente");
        }

        const novoSaldo = saldoAtual - valor;
        await this.repository.atualizarSaldo(userId,novoSaldo);
    }

    public async atualizarSaldo(userId: string, novoSaldo: number): Promise<void> {
        await this.repository.atualizarSaldo(userId, novoSaldo);
    }
    
}
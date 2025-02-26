import { CarteiraRepository } from "../../repositories/carteira.repositories";
import { CarteiraService } from "../carteira.service";

export class CarteiraServiceImplementation implements CarteiraService{
    constructor(readonly repository: CarteiraRepository){}

    public async getSaldo(userId: string): Promise<number> {
        throw new Error("Method not implemented.");
    }

    public async adicionarSaldo(userId: string, valor: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async removerSaldo(userId: string, valor: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    public async atualizarSaldo(userId: string, novoSaldo: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}
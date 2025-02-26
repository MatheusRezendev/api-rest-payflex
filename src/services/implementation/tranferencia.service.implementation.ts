import { StatusTranferencia, Transferencia } from "../../entities/transferencia";
import { CarteiraRepository } from "../../repositories/carteira.repositories";
import { TransferenciaRepository } from "../../repositories/transferencia.repositories";
import { CriarTransferenciaDTO, TransferenciaResponseDTO, TransferenciaService } from "../transferencia.service";

export class TranferenciaServiceImplementation implements TransferenciaService{
    private constructor(readonly repository: TransferenciaRepository,
                        readonly carteiraRepository: CarteiraRepository
    ){}

    public static build(repository: TransferenciaRepository, carteiraRepository: CarteiraRepository){
        return new TranferenciaServiceImplementation(repository, carteiraRepository)
    }    
    
    public async save(dto: CriarTransferenciaDTO): Promise<TransferenciaResponseDTO> {
        const saldoAtual = await this.carteiraRepository.getSaldo(dto.idUserEnvia);

        if(saldoAtual < dto.valor){
            throw new Error("Saldo insuficiente para realizar a transferencia");
        }

        const transferencia = Transferencia.build(dto.idUserEnvia, dto.idUserRecebe, dto.valor);

        await this.repository.save(transferencia);

        await this.carteiraRepository.alterarSaldo(dto.idUserEnvia,saldoAtual - dto.valor);
        const saldoRecebedor = await this.carteiraRepository.getSaldo(dto.idUserRecebe);
        await this.carteiraRepository.alterarSaldo(dto.idUserRecebe, saldoRecebedor + dto.valor);

        return {
            id: transferencia.id,
            idUserEnvia: transferencia.idUserEnvia,
            idUserRecebe: transferencia.idUserRecebe,
            valor: transferencia.valor,
            dataCriacao: transferencia.dataCriacao

        }
    }

    public async findById(id: string): Promise<TransferenciaResponseDTO | null> {
        const transferencia = await  this.repository.findById(id);
        if (!transferencia) return null;

        return {
            id: transferencia.id,
            idUserEnvia: transferencia.idUserEnvia,
            idUserRecebe: transferencia.idUserRecebe,
            valor: transferencia.valor,
            dataCriacao: transferencia.dataCriacao
        }
    }

    public async listByUserId(userId: string): Promise<TransferenciaResponseDTO[]> {
        const transferencias = await this.repository.listByUserId(userId);
        
        return transferencias.map(transferencia => ({
            id: transferencia.id,
            idUserEnvia: transferencia.idUserEnvia,
            idUserRecebe: transferencia.idUserRecebe,
            valor: transferencia.valor,
            dataCriacao: transferencia.dataCriacao
        }))
    }

    public async updateStatus(id: string, status: StatusTranferencia): Promise<void> {
        const transferencia = await this.repository.findById(id);
        
        if(!transferencia){
            throw new Error("Transferencia nao encontrada.")
        }

        transferencia.setStatus(status);
        await this.repository.updateStatus(id,status);
    }

}
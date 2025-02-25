import { Transferencia } from "../entities/transferencia";

export interface TransferenciaRepository {
    save(transferencia: Transferencia): Promise<void>;
    findById(id: string): Promise<Transferencia | null>;
    listByUserId(userId: string): Promise<Transferencia[]>;
    updateStatus(id: string, status: string): Promise<void>;
}
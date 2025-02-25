export type CriarTransferenciaDTO = {
    idUserEnvia: string;
    idUserRecebe: string;
    valor: number;
};

export type TransferenciaResponseDTO = {
    id: string;
    idUserEnvia: string;
    idUserRecebe: string;
    valor: number;
    dataCriacao: Date;
};

export interface TransferenciaService {
    save(dto: CriarTransferenciaDTO): Promise<TransferenciaResponseDTO>;
    findById(id: string): Promise<TransferenciaResponseDTO | null>;
    listByUserId(userId: string): Promise<TransferenciaResponseDTO[]>;
    updateStatus(id: string, status: string): Promise<void>;
}

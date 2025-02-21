export enum StatusTranferencia {
    pendente = "pendente",
    concluida = "concluida",
    cancelada = "cancelada"
}

export type TransferenciaProps = {
    id: string,
    idUserEnvia: string,
    idUserRecebe: string,
    valor: number,
    status: StatusTranferencia,
    dataCriacao: Date
}


export class Transferencia {
    private constructor(readonly props: TransferenciaProps) {}

    public static build(idUserEnvia: string, idUserRecebe: string, valor: number) {
        return new Transferencia({
            id: crypto.randomUUID().toString(),
            idUserEnvia,
            idUserRecebe,
            valor,
            status: StatusTranferencia.pendente,
            dataCriacao: new Date()
        })
    }

    public get id() {
        return this.props.id;
    }

    public get idUserEnvia() {
        return this.props.idUserEnvia;
    }

    public get idUserRecebe() {
        return this.props.idUserRecebe;
    }

    public get valor() {
        return this.props.valor;
    }

    public get status() {
        return this.props.status;
    }       

    public get dataCriacao() {
        return this.props.dataCriacao;
    }

    public setStatus(status: StatusTranferencia) {
        this.props.status = status;
    }
}
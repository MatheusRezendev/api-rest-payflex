export type CarteiraProps = {
    id: string;
    saldo: number;
    userId: string;
}

export class Carteira {
    private constructor(readonly props: CarteiraProps){}
    
    public static build(saldoInicial: number = 0, userId: string) {
        return new Carteira({
            id: crypto.randomUUID().toString(),
            saldo: saldoInicial,
            userId,
        });
    }
    public get id() {
        return this.props.id;
    }

    public get saldo() {
        return this.props.saldo;
    }

    public get userId() {
        return this.props.userId;
    }

    public adicionarSaldo(valor: number) {
        if(valor <= 0) throw new Error("Valor a adicionar deve ser maior que 0");
        this.props.saldo += valor;
    }

    public removerSaldo(valor: number) {
        if(valor <= 0)throw new Error("Valor inserido deve ser maior que 0");
        if(this.props.saldo < valor) throw new Error("Saldo insuficiente");
        this.props.saldo -= valor;
    }

    public atualizarSaldo(novoSaldo: number) {
        if (novoSaldo < 0) throw new Error("O saldo não pode ser negativo.");
        this.props.saldo = novoSaldo;
    }
}
